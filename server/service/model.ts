export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  profile_pic: string;
  mobile_number: string;
  is_admin: boolean;
  is_active: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  price: string;
  address: string;
  phone_number: string;
  description: string;
  business_hours: string;
  mtr_station: string;
  rest_image: string;
  tag: string;
  view_number: number;
  is_active: boolean;
}

export interface Food_image {
  id: number;
  food_image: string;
  restaurant_id: number;
  is_active: boolean;
}

export interface Restaurant_like {
  id: number;
  user_id: number;
  restaurant_id: number;
  is_active: boolean;
}

export interface Review {
  id: number;
  food_rating: number;
  environment_rating: number;
  content: string;
  review_image: string;
  view_number: number;
  user_id: number;
  restaurant_id: number;
  is_active: boolean;
}
