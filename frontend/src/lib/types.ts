export interface Product {
  id: number;
  name: string;
  desc: string;
  category: number;
  category_name: string;
  sub_category: number;
  rating: number;
  quant: number;
  quantvend: number;
  unit: string;
  image: string;
  price: number;
  parc: boolean;
  parc_quant: number;
  price_unit: number;
  free_shipping: boolean;
  offer: boolean;
  porc_offer: number;
  offer_price: number;
  old_price: number;
}
