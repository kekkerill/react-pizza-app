import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FullPizza() {
  const { id } = useParams<{ id: string }>();
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number,
  }>({
    imageUrl: '',
    title: '',
    price: 0,
  });
  useEffect(() => {
    const getPizza = async (id: string) => {
      const pizza = await axios.get(`http://localhost:3001/pizzas/${id}`);
      setPizza(pizza.data);
    };
    if (id) {
      getPizza(id);
    }
  }, [id]);

  console.log(pizza);
  return (
    <div className="fullPizza">
      <img className="fullPizza--img" src={pizza.imageUrl} alt="pizza" />
      <h2 className="fullPizza--title">{pizza.title}</h2>
      <p className="fullPizza--price">{pizza.price} Руб.</p>
    </div>
  );
}

export default FullPizza;
