/*
  # Initial Dok-Wood Database Setup

  1. User Roles
    - Creates an enum for user roles
    - Sets up profiles table with role management
  
  2. Materials Table
    - Creates materials table with all required attributes
    - Enables RLS policies for proper access control
    - Adds validation triggers for quality assurance
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM (
  'admin',
  'project_manager',
  'architect',
  'fire_protection',
  'sound_protection'
);

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'architect',
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create materials table
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designation TEXT NOT NULL,
  manufacturer TEXT,
  spatial_load DECIMAL,
  area_load DECIMAL,
  density_source TEXT,
  lambda_value DECIMAL,
  sd_value DECIMAL,
  mu_dry DECIMAL,
  mu_wet DECIMAL,
  lambda_mu_source TEXT,
  vkf_classification TEXT,
  unit TEXT,
  price DECIMAL,
  datasheet_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Add constraints for quality assurance
  CONSTRAINT positive_lambda CHECK (lambda_value > 0),
  CONSTRAINT positive_price CHECK (price >= 0),
  CONSTRAINT valid_loads CHECK (spatial_load >= 0 AND area_load >= 0)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage all profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Materials policies
CREATE POLICY "Users can view all materials"
  ON materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin and Project Manager can manage materials"
  ON materials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'project_manager')
    )
  );

-- Function to handle profile creation on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (new.id, new.email, 'architect');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();