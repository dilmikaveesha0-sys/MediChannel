
-- =========================================
-- MEDICHANNEL DATABASE SCHEMA
-- PostgreSQL
-- =========================================

-- 1. USERS
CREATE TABLE IF NOT EXISTS public.users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email_hash VARCHAR(128) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_check
        CHECK (role IN ('PATIENT', 'DOCTOR', 'ADMIN', 'STAFF')),

    CONSTRAINT users_status_check
        CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED'))
);


-- 2. PATIENTS
CREATE TABLE IF NOT EXISTS public.patients (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    nic_hash VARCHAR(128) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    phone VARCHAR(25) NOT NULL,
    address TEXT,

    CONSTRAINT fk_patient_user
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE RESTRICT
);


-- 3. SPECIALISATIONS
CREATE TABLE IF NOT EXISTS public.specialisations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);


-- 4. ROOMS
CREATE TABLE IF NOT EXISTS public.rooms (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    room_number VARCHAR(30) NOT NULL UNIQUE,
    room_name VARCHAR(100),
    location_description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);


-- 5. DOCTORS
CREATE TABLE IF NOT EXISTS public.doctors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    specialisation_id BIGINT NOT NULL,
    slmc_number VARCHAR(50) NOT NULL UNIQUE,
    qualifications TEXT NOT NULL,
    display_name VARCHAR(150) NOT NULL,

    CONSTRAINT fk_doctor_specialisation
        FOREIGN KEY (specialisation_id)
        REFERENCES public.specialisations(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_doctor_user
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE RESTRICT
);


-- 6. SESSIONS
CREATE TABLE IF NOT EXISTS public.sessions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    session_type VARCHAR(20) NOT NULL,
    capacity INTEGER NOT NULL,
    consultation_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) DEFAULT 'SCHEDULED',

    CONSTRAINT uq_doctor_room_session
        UNIQUE (doctor_id, room_id, session_date, start_time),

    CONSTRAINT fk_session_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES public.doctors(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_session_room
        FOREIGN KEY (room_id)
        REFERENCES public.rooms(id)
        ON DELETE RESTRICT,

    CONSTRAINT sessions_session_type_check
        CHECK (session_type IN ('IN_PERSON', 'ONLINE')),

    CONSTRAINT sessions_capacity_check
        CHECK (capacity >= 1 AND capacity <= 60),

    CONSTRAINT sessions_consultation_fee_check
        CHECK (consultation_fee >= 0),

    CONSTRAINT sessions_status_check
        CHECK (status IN ('SCHEDULED', 'CANCELLED', 'COMPLETED')),

    CONSTRAINT chk_session_time
        CHECK (end_time > start_time)
);


-- 7. APPOINTMENTS
CREATE TABLE IF NOT EXISTS public.appointments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    appointment_number INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'BOOKED',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    booked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_appointment_number
        UNIQUE (session_id, appointment_number),

    CONSTRAINT fk_appointment_patient
        FOREIGN KEY (patient_id)
        REFERENCES public.patients(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_appointment_session
        FOREIGN KEY (session_id)
        REFERENCES public.sessions(id)
        ON DELETE RESTRICT,

    CONSTRAINT appointments_appointment_number_check
        CHECK (appointment_number > 0),

    CONSTRAINT appointments_status_check
        CHECK (status IN (
            'BOOKED', 'CONFIRMED', 'CANCELLED',
            'COMPLETED', 'NO_SHOW'
        )),

    CONSTRAINT appointments_payment_status_check
        CHECK (payment_status IN (
            'PENDING', 'PAID', 'FAILED', 'REFUNDED'
        )),

    CONSTRAINT appointments_amount_check
        CHECK (amount >= 0)
);


-- 8. CONSULTATIONS
CREATE TABLE IF NOT EXISTS public.consultations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    appointment_id BIGINT NOT NULL UNIQUE,
    diagnosis TEXT,
    advice TEXT,
    prescription TEXT,
    consultation_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_consultation_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES public.appointments(id)
        ON DELETE RESTRICT
);


-- 9. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    appointment_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    encrypted_message BYTEA NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chat_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES public.appointments(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_chat_sender
        FOREIGN KEY (sender_id)
        REFERENCES public.users(id)
        ON DELETE RESTRICT
);


-- 10. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(30) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE RESTRICT,

    CONSTRAINT notifications_notification_type_check
        CHECK (notification_type IN (
            'APPOINTMENT', 'PAYMENT', 'GENERAL', 'REMINDER'
        ))
);


-- 11. FEEDBACK
CREATE TABLE IF NOT EXISTS public.feedback (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    appointment_id BIGINT NOT NULL UNIQUE,
    rating SMALLINT NOT NULL,
    comment TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_feedback_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES public.appointments(id)
        ON DELETE RESTRICT,

    CONSTRAINT feedback_rating_check
        CHECK (rating >= 1 AND rating <= 5),

    CONSTRAINT feedback_status_check
        CHECK (status IN ('PENDING', 'APPROVED', 'HIDDEN'))
);


-- 12. NOTICES
CREATE TABLE IF NOT EXISTS public.notices (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ,
    is_published BOOLEAN DEFAULT TRUE
);


-- 13. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(150) NOT NULL,
    event_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    details JSONB,

    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE RESTRICT
);


-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX IF NOT EXISTS idx_sessions_date
ON public.sessions(session_date);

CREATE INDEX IF NOT EXISTS idx_sessions_doctor
ON public.sessions(doctor_id);

CREATE INDEX IF NOT EXISTS idx_appointments_patient
ON public.appointments(patient_id);

CREATE INDEX IF NOT EXISTS idx_appointments_session
ON public.appointments(session_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user
ON public.notifications(user_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_appointment
ON public.chat_messages(appointment_id);


-- =========================================
-- END OF MEDICHANNEL DATABASE SCHEMA
-- =========================================
