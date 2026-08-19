// ── HARDCODED SPORTS LIST ──
// There is no `sports` table in Supabase — sports are fixed, editorial
// content for the public landing page (hero carousel, "One Platform Every
// Sport" section, Request Academy form). Update this single array to add,
// remove, or reorder sports anywhere on the landing page.
//
// Do NOT fetch this from Supabase. Do NOT duplicate this list elsewhere.

export const SPORTS = [
  'Silambam',
  'Martial Arts',
  'Karate',
  'Boxing',
  'Taekwondo',
  'Kung Fu',
  'Wrestling',
  'Badminton',
  'Cricket',
  'Football',
  'Basketball',
  'Tennis',
  'Swimming',
  'Athletics',
  'Volleyball',
  'Gymnastics',
  'Chess',
  'Dance',
  'Fitness',
  'Multi-Sport',
];

// The three sports the landing page's messaging is primarily tuned for
// (used to decide hero framing, testimonial angle, etc.) — still just a
// view into SPORTS, not a separate data source.
export const FLAGSHIP_SPORTS = ['Silambam', 'Martial Arts', 'Karate'];

// Simple per-sport icon (Tabler icon font classes already loaded globally
// via index.html — ti-ti-*). Falls back to a generic trophy icon for any
// sport without a specific glyph.
export const SPORT_ICONS = {
  'Silambam': 'ti-sword',
  'Martial Arts': 'ti-yin-yang',
  'Karate': 'ti-hand-stop',
  'Boxing': 'ti-hand-sanitizer',
  'Taekwondo': 'ti-shoe',
  'Kung Fu': 'ti-yin-yang',
  'Wrestling': 'ti-users',
  'Badminton': 'ti-feather',
  'Cricket': 'ti-ball-tennis',
  'Football': 'ti-ball-football',
  'Basketball': 'ti-ball-basketball',
  'Tennis': 'ti-ball-tennis',
  'Swimming': 'ti-swimming',
  'Athletics': 'ti-run',
  'Volleyball': 'ti-ball-volleyball',
  'Gymnastics': 'ti-stretching',
  'Chess': 'ti-chess-knight',
  'Dance': 'ti-music',
  'Fitness': 'ti-barbell',
  'Multi-Sport': 'ti-apps',
};
