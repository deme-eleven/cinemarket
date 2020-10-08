import React from "react";
import Button from "./components/button/button";
import Modal from "./components/modal/modal";
import api from "./helpers/api";
import { useInput } from "./components/input/input";

function App() {
  const [modal, setModal] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState<string | null>(null);

  const getData = async (seller: string, movie: string) => {
    const json = await api.getRights(seller, movie);
    // the parsing of the data is done in 3 parts
    // this can be optimized and moved to a single helper function
    if (json.message) {
      setError(json.message);
    } else {
      const headers = [];
      const unsorted = [];
      for (let i = 0; i < Object.keys(json).length; i++) {
        let baseIndex = Object.keys(json)[i];
        headers.push(baseIndex);
        // @ts-ignore
        for (const country of Object.keys(json[baseIndex])) {
          // @ts-ignore
          unsorted.push(json[baseIndex][country]);
        }
      }

      const mapped = new Map();
      for (const unsortedCountry of unsorted) {
        const uniqueCountry = unsortedCountry.territory;
        if (mapped.has(uniqueCountry)) {
          let value = mapped.get(uniqueCountry);
          value[unsortedCountry.typeOfRight] = unsortedCountry.isExclusive
            ? "exclusive"
            : "non-exclusive";
          mapped.set(uniqueCountry, value);
        } else {
          let obj: any = {};
          obj.country = unsortedCountry.territory;
          obj[unsortedCountry.typeOfRight] = unsortedCountry.isExclusive
            ? "exclusive"
            : "non-exclusive";
          mapped.set(uniqueCountry, obj);
        }
      }

      // the sorted array at the moment has headers and countries in the original format
      // this can be fixed by iterating over the array once again and replacing the strings
      // or by doing it in the component

      const sorted: any = [];

      for (const iterator of Array.from(mapped)) {
        sorted.push(iterator[1]);
      }
      setError(null);
      // @ts-ignore
      setData({ headers: headers, data: sorted.reverse() });
    }
  };

  const handleClick = async () => {
    await getData(seller.value, movie.value);
    setModal(true);
  };

  const seller = useInput({
    label: "Seller ID",
  });

  const movie = useInput({
    label: "Movie ID",
  });

  return (
    <div className="home">
      <div className="container">
        {seller.element}
        {movie.element}
        {error ? <p className="error">{error}</p> : null}
        <Button text="Search" onClick={handleClick} />
      </div>
      {modal && data ? (
        <Modal
          heading="Choose the territory and rights you want to buy (Maximum 10 choices per deal)"
          data={data}
          close={() => {
            setModal(false);
          }}
        />
      ) : null}
    </div>
  );
}

export default App;
