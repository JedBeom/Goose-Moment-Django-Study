function FilterButton(props) {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed}
	  	onClick={() => props.setFilter(props.name)}>
      <span>{props.displayName} </span>
      <span className="visually-hidden"> 보이기</span>
    </button>
  );
}

export default FilterButton;
