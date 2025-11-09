-- Migration Script: Add Asset Tokenization Support
-- Run this in your Supabase SQL Editor if you already have the tables created

-- Step 1: Add new columns to assets table
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS customer_wallet TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Step 2: Add new column to token_mints table
ALTER TABLE token_mints 
ADD COLUMN IF NOT EXISTS asset_id TEXT;

-- Step 3: Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_assets_customer_wallet ON assets(customer_wallet);
CREATE INDEX IF NOT EXISTS idx_assets_asset_id ON assets(asset_id);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_token_mints_asset_id ON token_mints(asset_id);

-- Step 4: Update existing assets to have default status
UPDATE assets SET status = 'verified' WHERE status IS NULL;

-- Step 5: Verify changes
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'assets'
ORDER BY ordinal_position;

SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'token_mints'
ORDER BY ordinal_position;

-- Success message
SELECT 'Migration completed successfully! Asset tokenization is now enabled.' as status;
