export const GetDataFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = items.reduce(
    (sum: number, obj: { price: number; count: number }) => {
      return obj.price * obj.count + sum;
    },
    0
  );
  return { items, totalPrice };
};
