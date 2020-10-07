import React from "react";
import Button from "./components/button/button";
import Modal from "./components/modal/modal";
import json from "./data.json";
import api from "./helpers/api";

function App() {
  const [modal, setModal] = React.useState(false);
  const [data, setData] = React.useState(null);

  const handleClick = () => {
    setModal(true);
  };

  React.useEffect(() => {
    // api.getRights();
    const getData = async () => {
      let response = await api.getRights();

      console.log(response);

      // @ts-ignore
      setData(response);
    };
    getData();
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
      // sorted.set(uniqueCountry, {});
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

    const sorted: any = [];

    for (const iterator of Array.from(mapped)) {
      sorted.push(iterator[1]);
    }
    // @ts-ignore
    setData({ headers: headers, data: sorted.reverse() });
  }, []);

  return (
    <div className="home">
      <Button text="Make an offer" onClick={handleClick} />
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
