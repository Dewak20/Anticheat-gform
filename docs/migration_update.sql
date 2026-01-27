-- RUN THIS IN SUPABASE SQL EDITOR TO UPDATE YOUR DATABASE

-- 1. Update 'exams' table for Class & Session Management
ALTER TABLE public.exams 
ADD COLUMN IF NOT EXISTS target_class text default 'ALL',
ADD COLUMN IF NOT EXISTS session_type text default 'ALL';

-- 2. Update 'cheat_logs' table for Student Identity metadata
ALTER TABLE public.cheat_logs 
ADD COLUMN IF NOT EXISTS student_class text,
ADD COLUMN IF NOT EXISTS student_absen text;

-- 3. (Optional) Force refresh schema cache in Supabase Dashboard 
-- NOTIFY pgrst, 'reload config';
