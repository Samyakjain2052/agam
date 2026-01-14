-- 1. Add the new status column if it doesn't exist
ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- 2. Update existing listings to be active (since they were created before moderation)
UPDATE listings 
SET status = 'active' 
WHERE status IS NULL OR status = 'pending';

-- 3. Create a policy to allow public to view ONLY active listings
DROP POLICY IF EXISTS "Public listings are viewable by everyone" ON listings;

CREATE POLICY "Public listings are viewable by everyone" 
ON listings FOR SELECT 
USING ( status = 'active' );

-- 4. Create a policy to allow anyone to insert (but they default to pending)
-- (We keep the existing insert policy, but the default value 'pending' handles the rest)
