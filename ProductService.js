import axios from 'axios';

export { getProductList, getProduct, createProduct, patchProduct, deleteProduct };

const product_URL = 'https://sprint-mission-api.vercel.app/products';

// Get product list
async function getProductList({ page, pageSize, keyword }) {
  try {
    const response = await axios.get(product_URL, { params: {page, pageSize, keyword} });
    console.log(`Status: ${response.status} - Product list fetched successfully.`);
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// Get a product
async function getProduct(productId) {
  try {
    const response = await axios.get(`${product_URL}/${productId}`);
    console.log(`Status: ${response.status} - Product fetched successfully.`);
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// Create
async function createProduct({ name, description, price, tags, images }) {
  try {
    const response = await axios.post(product_URL, { name, description, price, tags, images });
    console.log(`Status: ${response.status} - Product created successfully.`);
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// Patch
async function patchProduct(productId, data) {
  try {
    const response = await axios.patch(`${product_URL}/${productId}`, data);
    console.log(`Status: ${response.status} - Product updated successfully.`);
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// Delete
async function deleteProduct(productId, password) {
  try {
    const response = await axios.delete(`${product_URL}/${productId}`, { data:{password }});
    console.log(`Status: ${response.status} - Product deleted successfully.`);
    return response.data;
  } catch (e) {
    handleError(e);
  }
}

// Error handler function
function handleError(e) {
  if (e.response) {
    console.log(`Error: ${e.response.status}`);
    console.log(e.response.data);
  } else {
    console.log('Request failed');
  }
}
