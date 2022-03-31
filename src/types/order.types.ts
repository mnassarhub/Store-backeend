type OrderType = {
  id?: string;
  user_id: string;
  quantity: number;
  product_id: string;
  product_price: number;
  status: 'active' | 'complete';
};

export default OrderType;
