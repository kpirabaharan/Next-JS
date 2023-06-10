import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((prod) => (
        <li key={prod.id}>
          <Link href={`/products/${prod.id}`}>
            <h1>{prod.title}</h1>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log('Re-generate');

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // If data could not be obtained from backend, we can redirect to another page.
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  // If data arr is empty we can show error page.
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
