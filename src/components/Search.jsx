import { useCallback, useContext, useRef, useState } from "react";
import { SearchContext } from "../App.tsx";
import debounce from "lodash.debounce";

function Search() {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("SearchContext is undefined");
  }
  const { setSearchValue } = searchContext;
  const [localValue, setLocalValue] = useState("");
  function clearClick() {
    setSearchValue("");
    setLocalValue("");
    inputRef.current && inputRef.current.focus();
  }
  const inputRef = useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateSearch = useCallback(
    debounce((searchValue) => {
      setSearchValue(searchValue);
    }, 300),
    []
  );
  const onChangeInput = (str) => {
    setLocalValue(str);
    onUpdateSearch(str);
  };
  return (
    <div className="search-block">
      <input
        ref={inputRef}
        value={localValue}
        onChange={(e) => {
          onChangeInput(e.target.value);
        }}
        className="search-input"
        type="text"
        placeholder="Поиск..."
      />
      <button
        onClick={() => {
          clearClick();
        }}
        className="search-input--clearBtn"
      >
        X
      </button>
    </div>
  );
}

export default Search;
