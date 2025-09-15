import { $host } from ".";   

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const fetchProducts = async (typeId) => {
    const {data} = await $host.get('api/product', {params: {
        typeId
    }})
    return data
}

export const addToCart = async (cartId, productId, quantity = 1) => {
  const { data } = await $host.post('api/cart/add', { cartId, productId, quantity });
  return data;
};

// получить корзину
export const fetchCart = async (cartId) => {
  const { data } = await $host.get(`api/cart/${cartId}`);
  return data;
};

// удалить товар
export const removeFromCart = async (cartId, productId) => {
  const { data } = await $host.delete(`api/cart/${cartId}/${productId}`);
  return data;
};

export const getCart = async (cartId) => {
  const { data } = await $host.get(`api/cart/${cartId}`);
  return data;
}

export const updateCartProductQuantity = async (cartId, productId, quantity) => {
  const { data } = await $host.put(`/api/cart/${cartId}/product/${productId}`, { quantity });
  return data;
};

export const updateUser = async (id, data) => {
  const { data: response } = await $host.put(`/api/user/${id}`, data);
  return response;
};

export const fetchUser = async (userId) => {
  const { data } = await $host.get(`api/user/${userId}`);
  return data;
};