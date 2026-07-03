-- ==========================
-- Portfolio Status
-- ==========================

CREATE TYPE portfolio_status AS ENUM (
    'available',
    'open_to_work',
    'open_to_internship',
    'freelancing',
    'busy'
);

-- ==========================
-- Theme
-- ==========================

CREATE TYPE portfolio_theme AS ENUM (
    'light',
    'dark',
    'system'
);

-- ==========================
-- Employment Type
-- ==========================

CREATE TYPE employment_type AS ENUM (
    'internship',
    'full_time',
    'part_time',
    'contract',
    'freelance'
);

-- ==========================
-- Notification Type
-- ==========================

CREATE TYPE notification_type AS ENUM (
    'message',
    'system',
    'certificate',
    'project'
);