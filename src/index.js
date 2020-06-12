import React, { useState } from "react";
import ReactDOM from "react-dom";
import PRODUCTS from "./products";
import { sortProductByCategory } from "./utils";

const ProductRow = ({ product }) => {
  const productName = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{productName}</td>
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

const ProductTable = ({ products, filterText, inStock }) => {
  const productRows = [];
  let lastCategory = null;

  products
    .filter(
      product =>
        product.name.toLowerCase().includes(filterText.toLowerCase()) &&
        (!inStock ? true : product.stocked)
    )
    .sort(sortProductByCategory)
    .forEach(product => {
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

const SearchBar = ({ filterText, inStock, onInputChange }) => {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        name="filterText"
        onChange={onInputChange}
        placeholder="Search..."
      />
      <p>
        <input
          type="checkbox"
          checked={inStock}
          name="inStock"
          onChange={onInputChange}
        />{" "}
        Only show products in stock
      </p>
    </form>
  );
};

const FilterableProductTable = ({ products }) => {
  const [state, setState] = useState({
    filterText: "",
    inStock: false,
  });

  const handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = name === "filterText" ? target.value : target.checked;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <>
      <SearchBar
        filterText={state.filterText}
        inStock={state.inStock}
        onInputChange={handleInputChange}
      />
      <ProductTable
        products={products}
        filterText={state.filterText}
        inStock={state.inStock}
      />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <FilterableProductTable products={PRODUCTS} />
  </React.StrictMode>,
  document.getElementById("root")
);
