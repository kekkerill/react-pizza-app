import React, { useCallback, useContext, useEffect, useState } from "react";
import PizzaBlock from "../components/PizzaBlock/index.tsx";
import Skeleton from "../components/PizzaBlock/Skeleton.tsx";
import Categories from "../components/Categories.tsx";
import Sort from "../components/Sort.tsx";
import Pagination from "../components/Pagination.tsx";
import { SearchContext } from "../App.tsx";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import {
  setCategoryIndex,
  setSortIndex,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setPizzas } from "../redux/slices/pizzasSlice.ts";

const sortList = [
  { name: "популярности", sortName: "rating" },
  { name: "цене", sortName: "price" },
  { name: "алфавиту", sortName: "title" },
];

function Home() {
  const navigate = useNavigate();
  const CategoryIndex = useSelector(
    (state: { filter: { CategoryIndex: number } }) => state.filter.CategoryIndex
  );
  const sortIndex = useSelector(
    (state: { filter: { SortIndex: number } }) => state.filter.SortIndex
  );
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: { filter: { CurrentPage: number } }) => state.filter.CurrentPage
  );
  const searchContext = useContext(SearchContext);
  const searchValue = searchContext ? searchContext.searchValue : "";
  interface Pizza {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
  }

  const pizzas = useSelector(
    (state: { pizza: { pizzas: Pizza[] } }) => state.pizza.pizzas
  );
  const [isLoading, setIsLoading] = useState(true);
  const [PagesAmount, setPagesAmount] = useState(0);
  const onChangeCategory = useCallback((i: number) => {
    dispatch(setCategoryIndex(i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchPizzas = async () => {
      setIsLoading(true);
      try {
        const pizzas = await axios.get(
          `http://localhost:3001/pizzas?_page=${currentPage}&_per_page=4&${
            CategoryIndex ? "category=" + CategoryIndex : ""
          }&_sort=${sortList[sortIndex].sortName}&_order=desc`
        );
        dispatch(setPizzas(pizzas.data.data));
        setPagesAmount(pizzas.data.pages);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchPizzas();
  }, [CategoryIndex, sortIndex, currentPage, searchValue, dispatch]);

  useEffect(() => {
    const queryString = qs.stringify({
      _page: currentPage,
      _limit: 4,
      category: CategoryIndex,
      _sort: sortList[sortIndex].sortName,
      _order: "desc",
    });
    navigate(`?${queryString}`);
  }, [CategoryIndex, sortIndex, currentPage, navigate]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [CategoryIndex, dispatch]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            activeIndex={CategoryIndex ? CategoryIndex : 0}
            setActiveIndex={onChangeCategory}
          />
          <Sort
            sortList={sortList}
            sortIndex={sortIndex}
            setSortIndex={(i) => {
              dispatch(setSortIndex(i));
            }}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : pizzas
                .filter((pizza) =>
                  pizza.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((pizza, i) => <PizzaBlock key={i} {...pizza} />)}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={(i: number) => dispatch(setCurrentPage(i))}
        pagesAmount={PagesAmount}
      />
    </div>
  );
}

export default Home;
