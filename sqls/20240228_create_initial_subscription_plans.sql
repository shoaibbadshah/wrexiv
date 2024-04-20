CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO
  subscription_plans (
    id,
    name,
    description,
    credit_amount,
    price,
    currency,
    stripe_plan_id,
    created_at,
    updated_at
  )
VALUES
  (
    uuid_generate_v4(),
    'Basic Plan',
    'This is the basic subscription plan.',
    100,
    299.00,
    'USD',
    'price_1Ood0eCMJPRiu1rAo7Z7Vna8',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    uuid_generate_v4(),
    'Free Plan',
    'This is the free subscription plan.',
    5,
    0.00,
    'USD',
    'price_1OocySCMJPRiu1rAbbWiHfdP',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );
