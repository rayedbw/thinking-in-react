import React from "react";
import ReactDOM from "react-dom";
import { PRODUCTS, sortProductByCategory } from "./utils";

const ProductRow = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
};

const ProductTable = ({ products }) => {
  const productRows = [];
  let lastCategory = null;

  products.sort(sortProductByCategory).forEach(product => {
    if (product.category !== lastCategory) {
      productRows.push(
        <ProductCategoryRow
          key={product.category}
          category={product.category}
        />
      );
    }

    productRows.push(<ProductRow key={product.name} product={product} />);

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{productRows}</tbody>
    </table>
  );
};

const SearchBar = () => {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <p>
        <input type="checkbox" /> &nbsp; Only show products in stock
      </p>
    </form>
  );
};

const FilterableProductTable = ({ products }) => {
  return (
    <>
      <SearchBar />
      <ProductTable products={products} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <FilterableProductTable products={PRODUCTS} />
  </React.StrictMode>,
  document.getElementById("root")
);
