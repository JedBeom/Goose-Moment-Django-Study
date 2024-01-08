function FilterButton(props) {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed="true">
      <span className="visually-hidden">작업 </span>
      <span>모두 </span>
      <span className="visually-hidden"> 보이기</span>
    </button>
  );
}

export default FilterButton;
