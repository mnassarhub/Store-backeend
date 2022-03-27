CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    productname VARCHAR(100) UNIQUE NOT NULL,
    price NUMERIC NOT NULL CHECK (price > 0)
);