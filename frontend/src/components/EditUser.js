import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from '@mui/material/Button';
import './EditUser.css';
 
export default function Edit() {
 const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: "",
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:4000/user/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const user = await response.json();
     if (!user) {
       window.alert(`User with id ${id} not found`);
       navigate("/show-users");
       return;
     }
 
     setForm(user);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     firstName: form.firstName,
     lastName: form.lastName,
     email: form.email,
     password: form.password,
     isAdmin: form.isAdmin,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:4000/user-update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/show-users");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="update-users">
     <h3>Update User</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="firstName">First Name: </label>
         <input
           type="text"
           className="form-control"
           id="firstName"
           value={form.firstName}
           onChange={(e) => updateForm({ firstName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="lastName">Last Name: </label>
         <input
           type="text"
           className="form-control"
           id="lastName"
           value={form.lastName}
           onChange={(e) => updateForm({ lastName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">E-Mail: </label>
         <input
           type="email"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password: </label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="isAdmin">Admin Status: </label>
         <input
           type="text"
           className="form-control"
           id="isAdmin"
           value={form.isAdmin}
           onChange={(e) => updateForm({ isAdmin: e.target.value })}
         /> 1 for Admin, 0 for Non-Admin
       </div>
       <div className="form-group-btn">
         <Button variant="contained" className="submit-update-btn" onClick={onSubmit}>
          Submit
          </Button>
       </div>
     </form>
   </div>
 );
}