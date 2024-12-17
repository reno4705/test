/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        id: "",
        email: "",
        phone: "",
        department: "",
        doj: "",
        role: "",
    });

    const deptartments = ["HR", "Marketing", "Engineering"];

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleReset = () => {
        setForm({
            name: "",
            id: "",
            email: "",
            phone: "",
            department: "",
            doj: "",
            role: "",
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let lst = {};

      if (!form.name) lst.name = "Name is required";
      if (!form.id) lst.id = "Employee Id is required";
      if (!form.email) lst.email = "Email is required";
      if (!form.phone.match(/^\d{10}$/)) lst.phone = "Phone number must be 10 digits";
      if (!form.department) lst.department = "Department is required";
      if (!form.doj) lst.doj = "Date of Joining is required";
      if (!form.role) lst.role = "Role is required";
      
      setErrors(lst);

      if (Object.keys(lst).length === 0) {
          try {
              const res = await fetch("http://localhost:8000/register", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(form),
              });
              if (res.ok) {
                  toast.success("Employee regitser successfully", {
                      position: "top-right",
                  });
                  console.log("Employee registered successful");
                  handleReset();
              } else {
                  const data = await res.json();
                  if (data.message == "Employee id already exist") {
                      toast.warning("Employee id already exist", {
                          position: "top-right",
                      });
                      console.log("Employee id already exist");
                  } else if (data.message == "Employee email already exist") {
                      toast.warning("Employee email already exist", {
                          position: "top-right",
                      });
                      console.log("Employee email already exist");
                  }
              }
          } catch (error) {
              toast.error("Error registering employee", {
                  position: "top-right",
              });
              console.log(error);
          }
      }
  };

    return (
        <div className="cont">
            <div className="box">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                        <br />
                        <label>Employee Id:</label>
                        <br />
                        <input
                            type="text"
                            name="id"
                            value={form.id}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.id && <p className="error">{errors.id}</p>}
                        <br />
                        <label>Email:</label>
                        <br />
                        <input
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                        <br />
                        <label>Phone:</label>
                        <br />
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                        <br />
                        <label>Department:</label>
                        <br />
                        <select
                            className="input-field"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select Department
                            </option>
                            {deptartments.map((dept, index) => (
                                <option key={index} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                        {errors.department && <p className="error">{errors.department}</p>}
                        <br />
                        <label>Date of Joining:</label>
                        <br />
                        <input
                            type="date"
                            name="doj"
                            value={form.doj}
                            onChange={handleChange}
                            max={new Date().toISOString().split("T")[0]}
                            className="input-field"
                        />
                        {errors.doj && <p className="error">{errors.doj}</p>}
                        <br />
                        <label>Role:</label>
                        <br />
                        <input
                            type="text"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.role && <p className="error">{errors.role}</p>}
                        <br />
                        <button type="submit" className="submit">
                            Submit
                        </button>
                        <button onClick={handleReset} className="reset">
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
