// src/components/CustomerSelect.jsx

const CustomerSelect = ({ customers, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Customer</option>
      {customers.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default CustomerSelect;