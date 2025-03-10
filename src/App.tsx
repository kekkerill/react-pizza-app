import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";
import { createContext, useState } from "react";
import MainLayout from "./components/layout/mainLayout.tsx";
import FullPizza from "./pages/FullPizza.tsx";
import React from "react";

interface SearchContextType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);
function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
