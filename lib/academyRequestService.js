import { supabase } from './supabaseClient';

/**
 * Submit a "Request to Create My Academy" lead. Table: academy_requests
 * (see supabase_academy_requests_migration.sql — must be run once before
 * this will succeed).
 */
export async function submitAcademyRequest(form) {
  const payload = {
    full_name: form.fullName.trim(),
    academy_name: form.academyName.trim(),
    mobile: form.mobile.trim(),
    whatsapp: (form.whatsapp || form.mobile).trim(),
    email: form.email.trim().toLowerCase(),
    city: form.city.trim(),

    sports: form.sports,
    other_sport: form.otherSport || null,
    student_count: form.studentCount || null,
    branch_count: form.branchCount || null,

    current_management: form.currentManagement || null,
    current_management_other: form.currentManagementOther || null,

    required_features: form.requiredFeatures || [],
    required_features_other: form.requiredFeaturesOther || null,

    interested_plan_code: form.interestedPlanCode || null,
    not_sure_plan: !!form.notSurePlan,
    preferred_contact_method: form.preferredContactMethod || null,
    preferred_contact_time: form.preferredContactTime || null,
    message: form.message || null,
  };

  const { data, error } = await supabase
    .from('academy_requests')
    .insert(payload)
    .select()
    .single();

  return { data, error };
}
