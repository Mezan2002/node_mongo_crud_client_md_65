import React, { useState } from "react";

const AddUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const handleAddUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          event.target.reset();
          alert("User Successfully Added");
        }
      });
  };
  const handleBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...userInfo };
    newUser[field] = value;
    setUserInfo(newUser);
  };

  return (
    <div>
      <h2>Please Add a New User</h2>
      <form onClick={handleAddUser}>
        <input
          onBlur={handleBlur}
          type="text"
          name="name"
          placeholder="name"
          required
        />
        <br />
        <input
          onBlur={handleBlur}
          type="text"
          name="address"
          placeholder="address"
          required
        />
        <br />
        <input
          onBlur={handleBlur}
          type="email"
          name="email"
          id=""
          placeholder="email"
          required
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
