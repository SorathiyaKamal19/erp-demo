import React from "react";

const OrderSummary = ({ total }) => {
  return (
    <h3 style={{ marginTop: "20px" }}>
      Grand Total: ₹{total}
    </h3>
  );
};

export default OrderSummary;