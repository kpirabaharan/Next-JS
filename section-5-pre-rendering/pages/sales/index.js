import { sendStatusCode } from 'next/dist/server/api-utils';
import React, { useEffect, useState } from 'react';

const LastSalesPage = () => {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3007/sales')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: data[key]['id'],
            username: data[key]['username'],
            volume: data[key]['volume'],
          });
        }

        setSales(transformedSales);
        return setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet!</p>;
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

export default LastSalesPage;
