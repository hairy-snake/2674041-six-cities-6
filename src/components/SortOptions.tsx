import { useEffect, useRef, useState } from 'react';

const OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

type SortOptionsProps = {
  sort: string;
  onChange: (sort: string) => void;
};

const SortOptions = ({ sort, onChange }: SortOptionsProps) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <form ref={formRef} className="places__sorting" action="#" method="get" onSubmit={(e) => e.preventDefault()}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        {sort}
        <svg className="places__sorting-arrow" width="7" height="4" aria-hidden>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom${open ? ' places__options--opened' : ''}`}
        role="listbox"
        style={open ? undefined : { display: 'none' }}
      >
        {OPTIONS.map((label) => (
          <li
            key={label}
            className={`places__option ${label === sort ? 'places__option--active' : ''}`}
            tabIndex={0}
            role="option"
            aria-selected={label === sort}
            onClick={() => {
              onChange(label);
              setOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(label);
                setOpen(false);
              }
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;
