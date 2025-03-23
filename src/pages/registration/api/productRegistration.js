const API_URL = "https://panda-market-api.vercel.app";

const baseUrl = "https://panda-market-server-postgresql.onrender.com";

export const productRegistration = async ({
  name = "",
  description = "",
  price = 0,
  tags = [],
}) => {
  const response = await fetch(`${baseUrl}/products/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      price,
      tags,
    }),
  });
  return await response.json();
};
