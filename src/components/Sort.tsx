import React, { memo, useEffect, useRef, useState } from "react";

interface SortProps {
  sortList: { name: string }[];
  sortIndex: number;
  setSortIndex: (index: number) => void;
}

const Sort: React.FC<SortProps> = memo(
  ({ sortList, sortIndex, setSortIndex }) => {
    const sortRef = useRef<HTMLDivElement>(null);
    const [popUp, setPopUp] = useState(false);

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
          setPopUp(false);
        }
      };
      document.body.addEventListener("click", handleOutsideClick);
      return () => {
        document.body.removeEventListener("click", handleOutsideClick);
      };
    }, []);

    return (
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <b>Сортировка по:</b>
          <span
            onClick={() => {
              setPopUp(!popUp);
            }}
          >
            {sortList[sortIndex].name}
          </span>
        </div>
        {popUp && (
          <div className="sort__popup">
            <ul>
              {sortList.map((categoryObj, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSortIndex(i);
                    setPopUp(false);
                  }}
                  className={sortIndex === i ? "active" : ""}
                >
                  {categoryObj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export default Sort;
