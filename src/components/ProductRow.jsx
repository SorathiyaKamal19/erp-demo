import React from "react";
import { MdDeleteForever } from "react-icons/md";

const ProductRow = ({
  row,
  products,
  onChange,
  onRemove,
  selectedProducts,
}) => {
  const handleProductChange = (id) => {
    const product = products.find((p) => p.id === Number(id));

    onChange({
      ...row,
      productId: Number(id),
      price: product?.price || 0,
      total: (product?.price || 0) * row.qty,
    });
  };

  const handleQtyChange = (qty) => {
    const quantity = Number(qty);
    onChange({
      ...row,
      qty: quantity,
      total: quantity * row.price,
    });
  };

  return (
    <tr>
      <td>
        <select
          value={row.productId}
          onChange={(e) => handleProductChange(e.target.value)}
        >
          <option value="">Select</option>
          {products.map((p) => (
            <option
              key={p.id}
              value={p.id}
              disabled={
                selectedProducts.includes(p.id) &&
                p.id !== row.productId
              }
            >
              {p.name}
            </option>
          ))}
        </select>
      </td>

      <td>
        <input
          type="number"
          value={row.qty}
          min="1"
          onChange={(e) => handleQtyChange(e.target.value)}
        />
      </td>

      <td>₹ {row.price}</td>
      <td>₹ {row.total}</td>

      <td>
        <button className="btn btn-danger" onClick={onRemove} style={{fontSize:"15px"}}>
          <MdDeleteForever/>
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;