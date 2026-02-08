import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Component imports
import Login from "./component/Login";
import CustomerList from "./component/CustomerList";
import AddCustomer from "./component/AddCustomer";
import UpdateCustomer from "./component/UpdateCustomer";
import ViewCustomer from "./component/ViewCustomer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Redirect from root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Defined routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/customerlist" element={<CustomerList />} />
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/update-customer/:id" element={<UpdateCustomer />} />
      <Route path="/view-customer/:id" element={<ViewCustomer />} />

      {/* Fallback route to handle undefined URLs */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);
