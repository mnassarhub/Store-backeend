type OrderType = {
  id?: string;
  user_id: string;
  quantity: number;
  product_id: string;
  status: 'active' | 'complete';
};

export default OrderType;
