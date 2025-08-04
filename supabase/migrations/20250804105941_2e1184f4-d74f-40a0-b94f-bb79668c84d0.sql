-- Fix critical security vulnerability: Replace overly permissive profile access policy
-- Currently "Profiles are viewable by everyone" exposes all personal data

-- Drop the current overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create more secure, granular policies for profile access
-- Users can view their own full profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Authenticated users can view limited public profile information of others
-- Note: Application layer should filter sensitive fields for non-self access
CREATE POLICY "Authenticated users can view public profiles" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  auth.uid() != user_id AND
  status = 'active'
);

-- Enhanced security for anonymous support requests
-- Add rate limiting table for anonymous requests
CREATE TABLE IF NOT EXISTS public.anonymous_request_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_identifier text NOT NULL UNIQUE,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on the rate limiting table
ALTER TABLE public.anonymous_request_limits ENABLE ROW LEVEL SECURITY;

-- Only allow system/application to manage rate limiting data
CREATE POLICY "System manages rate limiting" 
ON public.anonymous_request_limits 
FOR ALL 
USING (false) 
WITH CHECK (false);

-- Add function to check anonymous rate limits
CREATE OR REPLACE FUNCTION public.check_anonymous_rate_limit(
  client_id text,
  max_requests integer DEFAULT 3,
  window_minutes integer DEFAULT 60
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count integer;
  window_start_time timestamp with time zone;
BEGIN
  window_start_time := now() - (window_minutes || ' minutes')::interval;
  
  -- Clean up old entries
  DELETE FROM public.anonymous_request_limits 
  WHERE window_start < window_start_time;
  
  -- Get current count for this client
  SELECT COALESCE(request_count, 0) 
  INTO current_count
  FROM public.anonymous_request_limits 
  WHERE client_identifier = client_id 
    AND window_start >= window_start_time;
  
  -- Check if limit exceeded
  IF current_count >= max_requests THEN
    RETURN false;
  END IF;
  
  -- Record this request
  INSERT INTO public.anonymous_request_limits (client_identifier, window_start)
  VALUES (client_id, now())
  ON CONFLICT (client_identifier) 
  DO UPDATE SET 
    request_count = anonymous_request_limits.request_count + 1,
    window_start = CASE 
      WHEN anonymous_request_limits.window_start < window_start_time 
      THEN now() 
      ELSE anonymous_request_limits.window_start 
    END;
  
  RETURN true;
END;
$$;