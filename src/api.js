const BASE_URL = "https://panda-market-server-postgresql.onrender.com/products";

const getProducts = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/?${queryString}`);
  return res.json();
};

const getProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

const postProduct = async (body) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};

const patchProduct = async (id, body) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};

const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export { getProducts, getProduct, postProduct, patchProduct, deleteProduct };
