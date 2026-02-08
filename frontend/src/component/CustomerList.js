import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8085/hdfcbank/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:8085/hdfcbank/customers/${id}`)
        .then(() => fetchCustomers())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand mb-0 h1">Full Stack Application</span>
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/add-customer")}
        >
          Add User
        </button>
      </nav>

      <div className="container mt-4">
        <table className="table table-hover shadow">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust, index) => (
              <tr key={cust.customerId}>
                <td>{index + 1}</td>
                <td>{cust.name}</td>
                <td>{cust.emailId}</td>
                <td>{cust.dateOfBirth || cust.dob}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate(`/view-customer/${cust.customerId}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => navigate(`/update-customer/${cust.customerId}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCustomer(cust.customerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
