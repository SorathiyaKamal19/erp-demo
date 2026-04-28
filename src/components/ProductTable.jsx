import React from "react";
import { FiPlus } from "react-icons/fi";
import ProductRow from "./ProductRow";
import {Table} from "react-bootstrap"
const ProductTable = ({ rows, products, setRows }) => {
  const addRow = () => {
    setRows([
      ...rows,
      { productId: "", qty: 1, price: 0, total: 0 },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index, updatedRow) => {
    const updated = [...rows];
    updated[index] = updatedRow;
    setRows(updated);
  };

  const selectedProducts = rows.map((r) => r.productId);

  return (
    <>
      <Table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <ProductRow
              key={i}
              row={row}
              products={products}
              selectedProducts={selectedProducts}
              onChange={(updatedRow) => updateRow(i, updatedRow)}
              onRemove={() => removeRow(i)}
            />
          ))}
        </tbody>
      </Table>

      <button className="btn btn-add" onClick={addRow}>
        <FiPlus/> Add Product
      </button>
    </>
  );
};

export default ProductTable;