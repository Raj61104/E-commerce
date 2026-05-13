type PriceRangeProps = {
  minPrice: number;
  highestPrice: number;
  maxPrice: number;
  setMaxPrice: React.Dispatch<
    React.SetStateAction<number>
  >;
};

export default function PriceRange({
  minPrice,
  highestPrice,
  maxPrice,
  setMaxPrice,
}: PriceRangeProps) {

  return (

    <div className="price-range-container">

      <label>
        Max Price: $
        {maxPrice.toFixed(2)}
      </label>

      <input
        type="range"
        min={minPrice}
        max={highestPrice}
        step={0.01}
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(
            Number(e.target.value)
          )
        }
      />

    </div>
  );
}