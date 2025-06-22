export type SignUpInput = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  nickname: string;
  image?: string;
};

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
  description: string;
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  updatedAt: string;
  writer: User;
}

export type NewProduct = Omit<ProductItem, 'id' | 'favoriteCount'>;
