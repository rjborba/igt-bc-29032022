import ListComponent, { ExchangesItem } from "@/components/ListComponent";
import { useState } from "react";
import useSWR from "swr";
import { MockData } from "../MockData";

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [pageIndex, setPageIndex] = useState(1);

  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/exchanges/?per_page=100&page=${pageIndex}`,
    fetcher
  );

  if (error) {
    return <div>error</div>;
  }

  return (
    <ListComponent
      data={data as ExchangesItem[]}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
    />
  );
}
