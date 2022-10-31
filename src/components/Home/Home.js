import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUser, setDisplayUser] = useState(users);
  const handleDelete = (user) => {
    const agreed = window.confirm(
      `Are You Agree to Delete the User ${user.name}`
    );
    if (agreed) {
      console.log("We are going to delete user id", user._id);
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("User Deleted Successfully");
            const remainingUser = displayUser.filter(
              (usr) => usr._id !== user._id
            );
            setDisplayUser(remainingUser);
          }
        });
    }
  };

  return (
    <div>
      <h2>User: {displayUser.length}</h2>
      <div>
        {displayUser.map((user) => (
          <div key={user._id}>
            {user.name} {user.email}
            <Link to={`/users/${user._id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => handleDelete(user)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
