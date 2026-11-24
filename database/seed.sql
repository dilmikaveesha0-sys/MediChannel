-- =========================================
-- MEDICHANNEL SAMPLE DATA
-- Run this script once on an empty database.
-- =========================================

BEGIN;

-- 1. USERS
INSERT INTO users
(email_hash, password_hash, role, status)
VALUES
('admin_email_hash_demo', 'demo_password_hash', 'ADMIN', 'ACTIVE'),
('patient_email_hash_demo', 'demo_password_hash', 'PATIENT', 'ACTIVE'),
('doctor_email_hash_demo', 'demo_password_hash', 'DOCTOR', 'ACTIVE');

-- 2. SPECIALISATIONS
INSERT INTO specialisations (name, description)
VALUES
('Cardiology', 'Heart and cardiovascular specialist'),
('Dermatology', 'Skin specialist');

-- 3. ROOMS
INSERT INTO rooms (room_number, room_name, location_description, is_active)
VALUES
('R001', 'Consultation Room 1', 'First floor', TRUE),
('R002', 'Consultation Room 2', 'First floor', TRUE);

-- 4. PATIENTS
INSERT INTO patients
(user_id, full_name, nic_hash, date_of_birth, phone, address)
VALUES
(
    (SELECT id FROM users WHERE email_hash = 'patient_email_hash_demo'),
    'Demo Patient',
    'patient_nic_hash_demo',
    '1995-05-15',
    '0771234567',
    'Colombo, Sri Lanka'
);

-- 5. DOCTORS
INSERT INTO doctors
(user_id, specialisation_id, slmc_number, qualifications, display_name)
VALUES
(
    (SELECT id FROM users WHERE email_hash = 'doctor_email_hash_demo'),
    (SELECT id FROM specialisations WHERE name = 'Cardiology'),
    'SLMC-DEMO-001',
    'MBBS, MD',
    'Dr. Demo Doctor'
);

-- 6. SESSIONS
INSERT INTO sessions
(doctor_id, room_id, session_date, start_time, end_time,
 session_type, capacity, consultation_fee, status)
VALUES
(
    (SELECT id FROM doctors WHERE slmc_number = 'SLMC-DEMO-001'),
    (SELECT id FROM rooms WHERE room_number = 'R001'),
    '2026-12-01',
    '09:00',
    '12:00',
    'IN_PERSON',
    20,
    1500.00,
    'SCHEDULED'
);

-- 7. APPOINTMENTS
INSERT INTO appointments
(patient_id, session_id, appointment_number, status, payment_status, amount)
VALUES
(
    (SELECT id FROM patients WHERE nic_hash = 'patient_nic_hash_demo'),
    (
        SELECT s.id
        FROM sessions s
        JOIN doctors d ON d.id = s.doctor_id
        WHERE d.slmc_number = 'SLMC-DEMO-001'
          AND s.session_date = '2026-12-01'
          AND s.start_time = '09:00'
    ),
    1,
    'BOOKED',
    'PENDING',
    1500.00
);

-- 8. CONSULTATIONS
INSERT INTO consultations
(appointment_id, diagnosis, advice, prescription, consultation_notes)
VALUES
(
    (
        SELECT a.id
        FROM appointments a
        JOIN sessions s ON s.id = a.session_id
        WHERE a.appointment_number = 1
          AND s.session_date = '2026-12-01'
    ),
    'Sample diagnosis',
    'Follow the doctor''s advice.',
    'Sample prescription',
    'Demonstration consultation record'
);

-- 9. CHAT MESSAGES
-- Demonstration bytes only; this is NOT real encrypted patient data.
INSERT INTO chat_messages
(appointment_id, sender_id, encrypted_message)
VALUES
(
    (
        SELECT a.id
        FROM appointments a
        JOIN sessions s ON s.id = a.session_id
        WHERE a.appointment_number = 1
          AND s.session_date = '2026-12-01'
    ),
    (SELECT id FROM users WHERE email_hash = 'patient_email_hash_demo'),
    decode('48656C6C6F', 'hex')
);

-- 10. NOTIFICATIONS
INSERT INTO notifications
(user_id, message, notification_type, is_read)
VALUES
(
    (SELECT id FROM users WHERE email_hash = 'patient_email_hash_demo'),
    'Your appointment has been booked.',
    'APPOINTMENT',
    FALSE
),
(
    (SELECT id FROM users WHERE email_hash = 'doctor_email_hash_demo'),
    'A new appointment has been booked.',
    'APPOINTMENT',
    FALSE
);

-- 11. FEEDBACK
INSERT INTO feedback
(appointment_id, rating, comment, status)
VALUES
(
    (
        SELECT a.id
        FROM appointments a
        JOIN sessions s ON s.id = a.session_id
        WHERE a.appointment_number = 1
          AND s.session_date = '2026-12-01'
    ),
    5,
    'Good service.',
    'PENDING'
);

-- 12. NOTICES
INSERT INTO notices
(title, content, expires_at, is_published)
VALUES
(
    'Welcome to MediChannel',
    'This is a demonstration notice for the MediChannel system.',
    '2027-12-31 23:59:59+05:30',
    TRUE
);

-- 13. AUDIT LOGS
INSERT INTO audit_logs
(user_id, action, event_timestamp, ip_address, details)
VALUES
(
    (SELECT id FROM users WHERE email_hash = 'admin_email_hash_demo'),
    'DEMO_SEED_DATA_CREATED',
    CURRENT_TIMESTAMP,
    '127.0.0.1',
    '{"source":"seed.sql","purpose":"demonstration"}'::jsonb
);

COMMIT;