import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR('http://localhost:3007/sales', (url) =>
    fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: data[key]['id'],
          username: data[key]['username'],
          volume: data[key]['volume'],
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('http://localhost:3007/sales')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: data[key]['id'],
  //           username: data[key]['username'],
  //           volume: data[key]['volume'],
  //         });
  //       }

  //       setSales(transformedSales);
  //       return setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to Load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch('http://localhost:3007/sales');

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: data[key]['id'],
      username: data[key]['username'],
      volume: data[key]['volume'],
    });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
}

export default LastSalesPage;
