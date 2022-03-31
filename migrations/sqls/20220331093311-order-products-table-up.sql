CREATE TABLE order_products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id uuid REFERENCES orders(id),
    quantity integer NOT NULL,
    product_id uuid REFERENCES products(id)
);
