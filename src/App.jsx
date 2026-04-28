import{ useEffect, useMemo, useState } from "react";
import CustomerSelect from "./components/CustomerSelect";
import ProductTable from "./components/ProductTable";
import { getCustomers, getProducts } from "./services/api";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useLocalStorage("customer", "");
  const [rows, setRows] = useLocalStorage("rows", [
    { productId: "", qty: 1, price: 0, total: 0 },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [savedOrder, setSavedOrder] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    getCustomers().then(setCustomers);
    getProducts().then(setProducts);

    useEffect(() => {
      const isChanged =
        customerId !== "" ||
        rows.some(
          (r) =>
            r.productId !== "" ||
            r.qty !== 1 ||
            r.price !== 0 ||
            r.total !== 0
        );

      setIsDirty(isChanged);
    }, [customerId, rows]);

    useEffect(() => {
      const handleBeforeUnload = (e) => {
        if (isDirty) {
          e.preventDefault();
          e.returnValue = "";
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);
    const saved = JSON.parse(localStorage.getItem("savedOrder"));
    if (saved) setSavedOrder(saved);
  }, []);

  const grandTotal = useMemo(() => {
    return rows.reduce((sum, r) => sum + r.total, 0);
  }, [rows]);

  const isValid = () => {
    if (!customerId) return false;
    return rows.every((r) => r.productId && r.qty > 0);
  };


  const handleSubmitClick = () => {
    if (!isValid()) {
      toast.error("Please fill all required fields correctly!");
      return;
    }

    handleSubmit();
  };

  // ✅ Submit / Update Order
  const handleSubmit = () => {
    try {
      const order = {
        customerId,
        rows,
        total: grandTotal,
      };

      localStorage.setItem("savedOrder", JSON.stringify(order));
      setSavedOrder(order);

      // ✅ Toast
      toast.success(
        isEditing
          ? "Order Updated Successfully!"
          : "Order Saved Successfully!"
      );

      // ✅ RESET FORM
      setCustomerId("");
      setRows([{ productId: "", qty: 1, price: 0, total: 0 }]);
      setIsDirty(false);
      setIsEditing(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // ✅ Load Order for Editing
  const loadOrder = () => {
    if (!savedOrder) return;

    setCustomerId(savedOrder.customerId);
    setRows(savedOrder.rows);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure?"
      );
      if (!confirmLeave) return;
    }

    setCustomerId("");
    setRows([{ productId: "", qty: 1, price: 0, total: 0 }]);
    setIsDirty(false);
    setIsEditing(false);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="container">
        {/* FORM */}
        <div className="card">
          <div className="title">
            {isEditing ? "Edit Sales Order" : "Sales Order"}
          </div>

          <CustomerSelect
            customers={customers}
            value={customerId}
            onChange={setCustomerId}
          />

          <ProductTable
            rows={rows}
            products={products}
            setRows={setRows}
          />

          <div className="total">Grand Total: ₹ {grandTotal}</div>

          <div style={{ marginTop: "15px" }}>
            <button
              className="btn btn-primary"
              onClick={handleSubmitClick}
            >
              {isEditing ? "Update Order" : "Submit Order"}
            </button>

            {isEditing && (
              <button
                className="btn btn-danger"
                onClick={cancelEdit}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* SAVED ORDER VIEW */}
        {/* SAVED ORDER VIEW */}
        {savedOrder && !isEditing && (
          <div className="card" style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>📦 Saved Order</h3>
              <button className="btn btn-primary" onClick={loadOrder}>
                Edit
              </button>
            </div>

            <hr style={{ margin: "10px 0" }} />

            {/* Customer */}
            <p>
              <b>Customer:</b>{" "}
              {customers.find(c => c.id == savedOrder.customerId)?.name || "N/A"}
            </p>

            {/* Products Table */}
            <table className="table" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {savedOrder.rows.map((item, index) => {
                  const product = products.find(p => p.id == item.productId);

                  return (
                    <tr key={index}>
                      <td>{product?.name || "N/A"}</td>
                      <td>{item.qty}</td>
                      <td>₹ {item.price}</td>
                      <td>₹ {item.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Grand Total */}
            <div className="total" style={{ marginTop: "10px" }}>
              Grand Total: ₹ {savedOrder.total}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;