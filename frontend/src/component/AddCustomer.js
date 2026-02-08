import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

 function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    emailId: "",
    dateOfBirth: ""
  });

  const { name, emailId, dateOfBirth } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      emailId: emailId,
      dateOfBirth: dateOfBirth
    };

    try {
      await axios.post("http://localhost:8085/hdfcbank/customers", newUser);
      navigate("/customerlist");
    } catch (error) {
      console.error("Error while adding customer:", error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Customer</h2>
          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>Customer Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Name'
                name='name'
                value={name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='emailId' className='form-label'>Email Id</label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter Email'
                name='emailId'
                value={emailId}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='dateOfBirth' className='form-label'>Date of Birth</label>
              <input
                type='date'
                className='form-control'
                name='dateOfBirth'
                value={dateOfBirth}
                onChange={onInputChange}
                required
              />
            </div>

            <button type='submit' className='btn btn-outline-success'>Add Customer</button>
            <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddUser;