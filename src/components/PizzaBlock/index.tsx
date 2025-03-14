import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice.ts";
import { Link } from "react-router-dom";
const typeList = ["Традиционное", "Тонкое"];
type pizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  count?: number;
};
function PizzaBlock({
  id,
  imageUrl,
  title,
  price,
  sizes,
  types,
}: pizzaBlockProps) {
  const count = useSelector(
    (state: { cart: { CartItems: [pizzaBlockProps] } }) =>
      state.cart.CartItems.find((item: { id: number }) => item.id === id)?.count
  );
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const dispatch = useDispatch();
  const onAddPizza = () => {
    const obj = {
      id,
      imageUrl,
      title,
      price,
      size: sizes[activeSize],
      type: typeList[activeType],
    };
    dispatch(addItem(obj));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              className={activeType === i ? "active" : ""}
              onClick={() => setActiveType(i)}
            >
              {typeList[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              className={activeSize === i ? "active" : ""}
              onClick={() => {
                setActiveSize(i);
              }}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={() => {
            onAddPizza();
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count && count > 0 && <i>{count}</i>}
        </div>
      </div>
    </div>
  );
}
export default PizzaBlock;
