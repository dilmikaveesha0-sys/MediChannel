-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    email_hash character varying(128) COLLATE pg_catalog."default" NOT NULL,
    password_hash text COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'ACTIVE'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_hash_key UNIQUE (email_hash),
    CONSTRAINT users_role_check CHECK (role::text = ANY (ARRAY['PATIENT'::character varying, 'DOCTOR'::character varying, 'ADMIN'::character varying, 'STAFF'::character varying]::text[])),
    CONSTRAINT users_status_check CHECK (status::text = ANY (ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying, 'SUSPENDED'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


    -- Table: public.patients

-- DROP TABLE IF EXISTS public.patients;

CREATE TABLE IF NOT EXISTS public.patients
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    full_name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    nic_hash character varying(128) COLLATE pg_catalog."default" NOT NULL,
    date_of_birth date NOT NULL,
    phone character varying(25) COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default",
    CONSTRAINT patients_pkey PRIMARY KEY (id),
    CONSTRAINT patients_nic_hash_key UNIQUE (nic_hash),
    CONSTRAINT patients_user_id_key UNIQUE (user_id),
    CONSTRAINT fk_patient_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.patients
    OWNER to postgres;


    -- Table: public.specialisations

-- DROP TABLE IF EXISTS public.specialisations;

CREATE TABLE IF NOT EXISTS public.specialisations
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT specialisations_pkey PRIMARY KEY (id),
    CONSTRAINT specialisations_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.specialisations
    OWNER to postgres;


    -- Table: public.rooms

-- DROP TABLE IF EXISTS public.rooms;

CREATE TABLE IF NOT EXISTS public.rooms
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    room_number character varying(30) COLLATE pg_catalog."default" NOT NULL,
    room_name character varying(100) COLLATE pg_catalog."default",
    location_description text COLLATE pg_catalog."default",
    is_active boolean DEFAULT true,
    CONSTRAINT rooms_pkey PRIMARY KEY (id),
    CONSTRAINT rooms_room_number_key UNIQUE (room_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rooms
    OWNER to postgres;


    -- Table: public.doctors

-- DROP TABLE IF EXISTS public.doctors;

CREATE TABLE IF NOT EXISTS public.doctors
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    specialisation_id bigint NOT NULL,
    slmc_number character varying(50) COLLATE pg_catalog."default" NOT NULL,
    qualifications text COLLATE pg_catalog."default" NOT NULL,
    display_name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT doctors_pkey PRIMARY KEY (id),
    CONSTRAINT doctors_slmc_number_key UNIQUE (slmc_number),
    CONSTRAINT doctors_user_id_key UNIQUE (user_id),
    CONSTRAINT fk_doctor_specialisation FOREIGN KEY (specialisation_id)
        REFERENCES public.specialisations (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT fk_doctor_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.doctors
    OWNER to postgres;


    -- Table: public.sessions

-- DROP TABLE IF EXISTS public.sessions;

CREATE TABLE IF NOT EXISTS public.sessions
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    doctor_id bigint NOT NULL,
    room_id bigint NOT NULL,
    session_date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    session_type character varying(20) COLLATE pg_catalog."default" NOT NULL,
    capacity integer NOT NULL,
    consultation_fee numeric(10,2) NOT NULL DEFAULT 0,
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'SCHEDULED'::character varying,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT uq_doctor_room_session UNIQUE (doctor_id, room_id, session_date, start_time),
    CONSTRAINT fk_session_doctor FOREIGN KEY (doctor_id)
        REFERENCES public.doctors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT fk_session_room FOREIGN KEY (room_id)
        REFERENCES public.rooms (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT sessions_session_type_check CHECK (session_type::text = ANY (ARRAY['IN_PERSON'::character varying, 'ONLINE'::character varying]::text[])),
    CONSTRAINT sessions_capacity_check CHECK (capacity >= 1 AND capacity <= 60),
    CONSTRAINT sessions_consultation_fee_check CHECK (consultation_fee >= 0::numeric),
    CONSTRAINT sessions_status_check CHECK (status::text = ANY (ARRAY['SCHEDULED'::character varying, 'CANCELLED'::character varying, 'COMPLETED'::character varying]::text[])),
    CONSTRAINT chk_session_time CHECK (end_time > start_time)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sessions
    OWNER to postgres;


    -- Table: public.appointments

-- DROP TABLE IF EXISTS public.appointments;

CREATE TABLE IF NOT EXISTS public.appointments
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    patient_id bigint NOT NULL,
    session_id bigint NOT NULL,
    appointment_number integer NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'BOOKED'::character varying,
    payment_status character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'PENDING'::character varying,
    amount numeric(10,2) NOT NULL DEFAULT 0,
    booked_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT appointments_pkey PRIMARY KEY (id),
    CONSTRAINT uq_appointment_number UNIQUE (session_id, appointment_number),
    CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id)
        REFERENCES public.patients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT fk_appointment_session FOREIGN KEY (session_id)
        REFERENCES public.sessions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT appointments_appointment_number_check CHECK (appointment_number > 0),
    CONSTRAINT appointments_status_check CHECK (status::text = ANY (ARRAY['BOOKED'::character varying, 'CONFIRMED'::character varying, 'CANCELLED'::character varying, 'COMPLETED'::character varying, 'NO_SHOW'::character varying]::text[])),
    CONSTRAINT appointments_payment_status_check CHECK (payment_status::text = ANY (ARRAY['PENDING'::character varying, 'PAID'::character varying, 'FAILED'::character varying, 'REFUNDED'::character varying]::text[])),
    CONSTRAINT appointments_amount_check CHECK (amount >= 0::numeric)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.appointments
    OWNER to postgres;


    -- Table: public.consultations

-- DROP TABLE IF EXISTS public.consultations;

CREATE TABLE IF NOT EXISTS public.consultations
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    appointment_id bigint NOT NULL,
    diagnosis text COLLATE pg_catalog."default",
    advice text COLLATE pg_catalog."default",
    prescription text COLLATE pg_catalog."default",
    consultation_notes text COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT consultations_pkey PRIMARY KEY (id),
    CONSTRAINT consultations_appointment_id_key UNIQUE (appointment_id),
    CONSTRAINT fk_consultation_appointment FOREIGN KEY (appointment_id)
        REFERENCES public.appointments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.consultations
    OWNER to postgres;


    -- Table: public.chat_messages

-- DROP TABLE IF EXISTS public.chat_messages;

CREATE TABLE IF NOT EXISTS public.chat_messages
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    appointment_id bigint NOT NULL,
    sender_id bigint NOT NULL,
    encrypted_message bytea NOT NULL,
    sent_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chat_messages_pkey PRIMARY KEY (id),
    CONSTRAINT fk_chat_appointment FOREIGN KEY (appointment_id)
        REFERENCES public.appointments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT fk_chat_sender FOREIGN KEY (sender_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chat_messages
    OWNER to postgres;
-- Index: idx_chat_messages_appointment

-- DROP INDEX IF EXISTS public.idx_chat_messages_appointment;

CREATE INDEX IF NOT EXISTS idx_chat_messages_appointment
    ON public.chat_messages USING btree
    (appointment_id ASC NULLS LAST)
;


-- Table: public.notifications

-- DROP TABLE IF EXISTS public.notifications;

CREATE TABLE IF NOT EXISTS public.notifications
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    message text COLLATE pg_catalog."default" NOT NULL,
    notification_type character varying(30) COLLATE pg_catalog."default" NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notifications_pkey PRIMARY KEY (id),
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT notifications_notification_type_check CHECK (notification_type::text = ANY (ARRAY['APPOINTMENT'::character varying, 'PAYMENT'::character varying, 'GENERAL'::character varying, 'REMINDER'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.notifications
    OWNER to postgres;


    -- Table: public.feedback

-- DROP TABLE IF EXISTS public.feedback;

CREATE TABLE IF NOT EXISTS public.feedback
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    appointment_id bigint NOT NULL,
    rating smallint NOT NULL,
    comment text COLLATE pg_catalog."default",
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'PENDING'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT feedback_pkey PRIMARY KEY (id),
    CONSTRAINT feedback_appointment_id_key UNIQUE (appointment_id),
    CONSTRAINT fk_feedback_appointment FOREIGN KEY (appointment_id)
        REFERENCES public.appointments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT,
    CONSTRAINT feedback_rating_check CHECK (rating >= 1 AND rating <= 5),
    CONSTRAINT feedback_status_check CHECK (status::text = ANY (ARRAY['PENDING'::character varying, 'APPROVED'::character varying, 'HIDDEN'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.feedback
    OWNER to postgres;


    -- Table: public.notices

-- DROP TABLE IF EXISTS public.notices;

CREATE TABLE IF NOT EXISTS public.notices
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    title character varying(200) COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    expires_at timestamp with time zone,
    is_published boolean DEFAULT true,
    CONSTRAINT notices_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.notices
    OWNER to postgres;


    -- Table: public.audit_logs

-- DROP TABLE IF EXISTS public.audit_logs;

CREATE TABLE IF NOT EXISTS public.audit_logs
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint,
    action character varying(150) COLLATE pg_catalog."default" NOT NULL,
    event_timestamp timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    ip_address inet,
    details jsonb,
    CONSTRAINT audit_logs_pkey PRIMARY KEY (id),
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.audit_logs
    OWNER to postgres;


    -- =========================================
-- INDEXES
-- =========================================

CREATE INDEX idx_sessions_date
ON sessions(session_date);

CREATE INDEX idx_sessions_doctor
ON sessions(doctor_id);

CREATE INDEX idx_appointments_patient
ON appointments(patient_id);

CREATE INDEX idx_appointments_session
ON appointments(session_id);

CREATE INDEX idx_notifications_user
ON notifications(user_id);

CREATE INDEX idx_chat_messages_appointment
ON chat_messages(appointment_id);