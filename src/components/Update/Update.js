import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const storedUser = useLoaderData();
  const [userInfo, setUserInfo] = useState(storedUser);
  const handleUpdateUser = (event) => {
    event.preventDefault();
    console.log(userInfo);
    fetch(`http://localhost:5000/users/${storedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...userInfo };
    newUser[field] = value;
    setUserInfo(newUser);
  };
  return (
    <div>
      <h2>Please Update</h2>
      <form onClick={handleUpdateUser}>
        <input
          defaultValue={storedUser.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
          required
        />
        <br />
        <input
          defaultValue={storedUser.address}
          onChange={handleChange}
          type="text"
          name="address"
          placeholder="address"
          required
        />
        <br />
        <input
          defaultValue={storedUser.email}
          onChange={handleChange}
          type="email"
          name="email"
          id=""
          placeholder="email"
          required
        />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default Update;
