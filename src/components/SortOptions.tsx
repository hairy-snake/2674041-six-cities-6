const OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

type SortOptionsProps = {
  sort: string;
  onChange: (sort: string) => void;
};

const SortOptions = ({ sort, onChange }: SortOptionsProps) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex={0}>
      {sort}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className="places__options places__options--custom places__options--opened">
      {OPTIONS.map((label) => (
        <li
          key={label}
          className={`places__option ${label === sort ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => onChange(label)}
        >
          {label}
        </li>
      ))}
    </ul>
  </form>
);

export default SortOptions;
