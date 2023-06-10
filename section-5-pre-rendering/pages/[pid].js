import path from 'path';
import fs from 'fs/promises';
import { Fragment } from 'react';

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  // If page is not pre-rendered, we still have something to show and it doesnt break
  // Or we can set fallback to 'blocking'
  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: 'p1',
        },
      },
      // {
      //   params: {
      //     pid: 'p2',
      //   },
      // },
      // {
      //   params: {
      //     pid: 'p3',
      //   },
      // },
    ],
    fallback: 'blocking',
  };
}

export default ProductDetailPage;
