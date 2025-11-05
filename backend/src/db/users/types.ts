export interface UserAddress {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: UserAddress | null;
}

export interface UserWithAddressRow {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address_id: string | null;
  user_id: string | null;
  street: string | null;
  state: string | null;
  city: string | null;
  zipcode: string | null;
}
