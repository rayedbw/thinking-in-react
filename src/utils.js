export const sortProductByCategory = (firstProduct, secondProduct) => {
  const firstCategory = firstProduct.category.toLowerCase();
  const secondCategory = secondProduct.category.toLowerCase();

  if (firstCategory < secondCategory) return -1;
  else if (firstCategory > secondCategory) return 1;
  else return 0;
};
