import { supabase } from './supabaseClient';

// ── PLANS — SINGLE SOURCE OF TRUTH IS SUPABASE `plans` ──
// No plan name, price, or feature is ever hardcoded in React. If a price
// changes in Supabase, the landing page reflects it on next load with zero
// code changes.
//
// NOTE ON PRIMARY KEY: the `plans` table export we inspected only exposes a
// text `code` column (e.g. "basic", "pro", "premium") — no separate UUID
// `id` was present. We use `code` as the identifier everywhere (including
// as the FK stored on academy_requests.interested_plan_code). If your table
// actually has a UUID `id` primary key, tell me and this is a one-line swap
// in getActivePlans()/normalizePlan() below (rename `code` -> `id`).

/**
 * Fetch all active plans, ordered the way they should be displayed.
 * Returns [] (never throws) on failure — callers must handle the
 * "pricing unavailable" state themselves, per spec.
 */
export async function getActivePlans() {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getActivePlans failed:', error.message);
    return { plans: [], error };
  }
  return { plans: (data || []).map(normalizePlan), error: null };
}

function safeJsonArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Human-readable labels for the boolean has_* feature flags actually
// present on the plans table — used to render feature checklists without
// inventing anything not backed by a real column.
const FEATURE_FLAG_LABELS = {
  has_enquiry: 'Enquiry management',
  has_activity: 'Activity log',
  has_performance: 'Performance & leaderboard',
  has_schedules: 'Staff schedules & leave',
  has_reports: 'PDF / Excel reports',
  has_bulk_import: 'Bulk import & export',
  has_whatsapp: 'WhatsApp & SMS notifications',
};

function normalizePlan(row) {
  const highlights = safeJsonArray(row.highlights);
  const features = safeJsonArray(row.features);
  const flagFeatures = Object.keys(FEATURE_FLAG_LABELS)
    .filter((key) => row[key])
    .map((key) => FEATURE_FLAG_LABELS[key]);

  return {
    id: row.code, // used as the stable identifier / FK value
    code: row.code,
    name: row.name,
    tagline: row.tagline || '',
    description: row.description || '',
    priceMonthly: row.price_monthly != null ? Number(row.price_monthly) : null,
    priceAnnual: row.price_annual != null ? Number(row.price_annual) : null,
    currency: row.currency || 'INR',
    maxStudents: row.student_limit ?? row.max_students ?? null,
    maxStaff: row.staff_limit ?? row.max_staff ?? null,
    maxSports: row.sport_limit ?? row.max_sports ?? null,
    maxBatches: row.batch_limit ?? row.max_batches ?? null,
    isRecommended: !!row.is_recommended,
    sortOrder: row.sort_order ?? 0,
    highlights,
    rawFeatures: features,
    flagFeatures,
    raw: row,
  };
}

/**
 * Given monthly + annual price, compute the effective annual saving as a
 * percentage — only when both values are valid numbers. Never a hardcoded
 * "20% off" style claim.
 */
export function computeAnnualSavingsPercent(plan) {
  if (!plan || plan.priceMonthly == null || plan.priceAnnual == null) return null;
  const monthlyCostPerYear = plan.priceMonthly * 12;
  if (monthlyCostPerYear <= 0) return null;
  const savings = monthlyCostPerYear - plan.priceAnnual;
  if (savings <= 0) return null;
  return Math.round((savings / monthlyCostPerYear) * 100);
}

export function formatPrice(amount, currency = 'INR') {
  if (amount == null) return 'Custom';
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}
