import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

const ID = 4;
const ARTICLE_ID = 40;

// Article operations
console.log('Fetching article list...');
const articles = await getArticleList({ page: 1, pageSize: 5, keyword: '테스트' });
console.log(articles);

console.log('Fetching a single article...');
const article = await getArticle(ARTICLE_ID);
console.log(article);

console.log('Creating a new article...');
const newArticle = await createArticle({
  title: 'New Article',
  content: 'This is a test article.',
  tags: ['tag1', 'tag2']
});
console.log(newArticle);

console.log('Updating an article...');
const updatedArticle = await patchArticle(ARTICLE_ID, { content: 'Updated content' });
console.log(updatedArticle);

console.log('Deleting an article...');
const deleteResponseArticle = await deleteArticle(ARTICLE_ID, 'your-password'); // Renamed variable
console.log(deleteResponseArticle);

// Product operations
console.log('Fetching product list...');
const products = await getProductList({ page: 1, pageSize: 5, keyword: 'test' });
console.log(products);

console.log('Fetching a single product...');
const product = await getProduct(ID);
console.log(product);

console.log('Creating a new product...');
const newProduct = await createProduct({
  name: 'New Product',
  description: 'This is a test product.',
  price: 100,
  tags: ['tag1', 'tag2'],
  images: ['https://example.com/image.jpg']
});
console.log(newProduct);

console.log('Updating a product...');
const updatedProduct = await patchProduct(ID, { price: 120 });
console.log(updatedProduct);

console.log('Deleting a product...');
const deleteResponseProduct = await deleteProduct(ID); // Renamed variable
console.log(deleteResponseProduct);
