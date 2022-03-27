CREATE TYPE status AS ENUM ('active', 'complete');
CREATE TABLE orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    quantity integer NOT NULL,
    product_id uuid REFERENCES products(id),
    status status NOT NULL,
    CONSTRAINT check_types CHECK (status = 'active' OR status = 'complete')
);