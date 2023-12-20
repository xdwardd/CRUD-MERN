import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateUsers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });
  const navigate = useNavigate();

  //handle input change
  const handleChange = () => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/adduser",

        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data.success === true) {
        navigate("/");
      } else {
        console.log("Error Occured");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form class="max-w-sm mx-auto border rounded-lg p-4 mt-20">
        <div className="text-2xl font-bold text-gray-500 text-center mb-2">
          Add User
        </div>
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="position"
            class="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUsers;
