import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    name: "",
    emailId: "",
    dateOfBirth: ""
  });

  const { name, emailId, dateOfBirth } = customer;

  // ✅ useEffect with inlined function to avoid ESLint warning
  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/hdfcbank/customers/${id}`);
        setCustomer({
          name: response.data.name || "",
          emailId: response.data.emailId || "",
          dateOfBirth: response.data.dateOfBirth || ""
        });
      } catch (error) {
        console.error("Failed to fetch customer:", error);
      }
    };

    loadCustomer();
  }, [id]); // ✅ dependency array includes 'id'

  const onInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/hdfcbank/customers/${id}`, customer);
      navigate("/customerlist");
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Update Customer</h2>
          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Customer Name</label>
              <input
                type='text'
                className='form-control'
                name='name'
                placeholder='Enter name'
                value={name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Email ID</label>
              <input
                type='email'
                className='form-control'
                name='emailId'
                placeholder='Enter email'
                value={emailId}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Date of Birth</label>
              <input
                type='date'
                className='form-control'
                name='dateOfBirth'
                value={dateOfBirth}
                onChange={onInputChange}
                required
              />
            </div>

            <button type='submit' className='btn btn-outline-success'>Update</button>
            <Link to="/customerlist" className='btn btn-outline-danger mx-2'>Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCustomer;
