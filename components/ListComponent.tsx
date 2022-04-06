// : name, image, year_established, country, trust_score,
// trade_volume_24h_btc

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface ExchangesItem {
  id: string;
  name: string;
  image: string;
  year_established: number;
  country: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

interface ListComponentProps {
  data: ExchangesItem[];
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
}
const ListComponent = ({
  data,
  pageIndex,
  setPageIndex,
}: ListComponentProps) => {
  const [filterText, setFilterText] = useState("");
  const [filteredList, setFilteredList] = useState<ExchangesItem[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredList(
        data.filter((item: ExchangesItem) =>
          item.name
            .toLocaleLowerCase()
            .includes(filterText.toLowerCase().trim())
        )
      );
    } else {
      setFilteredList([]);
    }
  }, [data, filterText]);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>Sem Resultados</div>;
  }

  return (
    <div>
      <input
        placeholder="Filtre por nome"
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
      />

      <button>pagina anterior</button>
      <button onClick={() => setPageIndex((oldValue) => oldValue + 1)}>
        proxima pagina
      </button>
      <ul>
        {filteredList.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <div>{item.country}</div>
            <div>{item.year_established}</div>
            <div>{item.trust_score}</div>
            <div>{item.trade_volume_24h_btc}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
