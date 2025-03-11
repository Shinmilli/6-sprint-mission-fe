import axios from 'axios';

export { getArticleList, getArticle, createArticle, patchArticle, deleteArticle };

const ArticleService_URL = 'https://sprint-mission-api.vercel.app/articles';

// Get article list
function getArticleList({ page, pageSize, keyword }) {
  const url = new URL(ArticleService_URL);
  return axios.get(url, { params: { page, pageSize, keyword }})
    .then(res => {
      console.log(`Status: ${res.status} - Article list fetched successfully.`);
      return res.data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Get a single article
function getArticle(articleId) {
  return axios.get(`${ArticleService_URL}/${articleId}`)
    .then(res => {
      console.log(`Status: ${res.status} - Article fetched successfully.`);
      return res.data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Create an article
function createArticle({ title, content, tags }) {
  return axios.post(ArticleService_URL, { title, content, tags })
    .then(res => {
      console.log(`Status: ${res.status} - Article created successfully.`);
      return res.data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Update an article
function patchArticle(articleId, data) {
  return axios.patch(`${ArticleService_URL}/${articleId}`)
    .then(res => {
      console.log(`Status: ${res.status} - Article updated successfully.`);
      return res.data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Delete an article
function deleteArticle(articleId, password) {
  return axios.delete(`${ArticleService_URL}/${articleId}`, { data:{password} })
    .then(res => {
      console.log(`Status: ${res.status} - Article deleted successfully.`);
      return res.data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Error handler function
function handleError(error) {
  console.error('Request failed', error);
}
