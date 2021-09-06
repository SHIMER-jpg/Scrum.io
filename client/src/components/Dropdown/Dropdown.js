import './styles.css';

const Dropdown = ({
  isVisible,
  setIsVisible,
  name,
  filterName,
  handler,
  values,
  theme,
}) => {
  return (
    <div className="Dropdown-container">
      {filterName && <p className="Dropdown-name">{filterName}</p>}
      <div
        className={`Dropdown unstyled-btn ${theme}`}
        onClick={() => setIsVisible(!isVisible)}
      >
        {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${isVisible ? 'rotate' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <div className={`Dropdown-box ${isVisible && 'visible'}`}>
          {values.map((value) => (
            <p
              onClick={handler}
              key={value}
              data-value={value}
              className="Dropdown-option"
            >
              {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
