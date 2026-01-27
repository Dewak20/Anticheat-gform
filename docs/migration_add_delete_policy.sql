-- RUN THIS IN SUPABASE SQL EDITOR
-- Fix: Allow Teachers (Authenticated) to DELETE cheat logs

-- Policy for deleting logs
CREATE POLICY "Teachers can delete logs" 
ON public.cheat_logs 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- (Optional) If the above gives "already exists" error, you can also try:
-- DROP POLICY IF EXISTS "Teachers can delete logs" ON public.cheat_logs;
-- Then run the CREATE again.
