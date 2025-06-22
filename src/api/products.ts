import axios from './axios';
import type { ProductItem, NewProduct } from '../types';

interface GetProductsParams {
  orderBy?: string;
  page?: number;
  pageSize?: number;
  keyword?: string;  // 이 부분 추가
}

// interface Product {
//   id: string;
//   name?: string;
//   price?: number;
//   // 필요한 필드 추가
// }

interface GetCommentsParams {
  limit?: number;
  cursor?: string;
}

export async function getProducts({
  orderBy = 'recent',
  page = 1,
  pageSize = 10,
  keyword,
}: GetProductsParams = {}) {
  const response = await axios.get('/products', {
    params: {
      orderBy,
      page,
      pageSize,
      keyword,
    },
  });
  const { totalCount, list } = response.data;
  return { totalCount, list };
}

export async function addProduct(product: NewProduct): Promise<ProductItem> {
  const response = await axios.post('/products', product);
  return response.data;
}

export async function getProduct(productId: string) {
  const response = await axios.get(`/products/${productId}`);
  const product = response.data;
  return product;
}

export async function patchProduct(productId: string, partialProduct: Partial<ProductItem>) {
  const response = await axios.patch(`/products/${productId}`, partialProduct);
  const product = response.data;
  return product;
}

export async function deleteProduct(productId: string) {
  await axios.delete(`/products/${productId}`);
}

export async function addProductFavorite(productId: string) {
  const response = await axios.post(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function deleteProductFavorite(productId: string) {
  const response = await axios.delete(`/products/${productId}/favorite`);
  const product = await response.data;
  return product;
}

export async function getProductComments({
  productId,
  params: { limit, cursor },
}: {
  productId: string;
  params: GetCommentsParams;
}) {
  const response = await axios.get(`/products/${productId}/comments`, {
    params: { limit, cursor },
  });
  const { totalCount, list: comments } = response.data;
  return comments;
}

export async function addProductComment(productId: string, { content }: { content: string }) {
  const response = await axios.post(`/products/${productId}/comments`, {
    content,
  });
  const comment = response.data;
  return comment;
}
