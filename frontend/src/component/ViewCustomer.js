import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    emailId: "",
    dateOfBirth: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8085/hdfcbank/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Customer Details</h2>

          <div className="mb-3">
            <label><strong>Name:</strong></label>
            <p>{customer.name}</p>
          </div>
          <div className="mb-3">
            <label><strong>Email:</strong></label>
            <p>{customer.emailId}</p>
          </div>
          <div className="mb-3">
            <label><strong>Date of Birth:</strong></label>
            <p>{customer.dateOfBirth || customer.dob}</p>
          </div>

          {/* ✅ Fixed navigation path */}
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/customerlist")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCustomer;
