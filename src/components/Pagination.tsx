type PaginationProps = {
  pagesAmount: number;
  currentPage: number;
  setCurrentPage: (i: number) => void
};

function Pagination({ pagesAmount, currentPage, setCurrentPage }: PaginationProps) {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li
          onClick={() => {
            currentPage !== 1 && setCurrentPage(currentPage - 1);
          }}
          className="pagination__list__btn"
        >
          ←
        </li>
        {new Array(pagesAmount).fill(null).map((_, i) => (
          <li
            key={i}
            className={
              currentPage === i + 1
                ? "pagination__list__btn__active"
                : "pagination__list__btn"
            }
            onClick={() => {
              setCurrentPage(i + 1);
            }}
          >
            {i + 1}
          </li>
        ))}
        <li
          onClick={() => {
            currentPage + 1 <= pagesAmount && setCurrentPage(currentPage + 1);
          }}
          className="pagination__list__btn"
        >
          →
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
