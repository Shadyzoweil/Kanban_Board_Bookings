import { useState } from "react";

function Form({ onAddCard }) {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //to keep track of validation errors
  const validate = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters.";
    }

    // Age validation
    if (!formData.age.trim()) {
      newErrors.age = "Age is required.";
    } else if (!/^\d+$/.test(formData.age)) {
      newErrors.age = "Age must be a valid number.";
    } else if (parseInt(formData.age, 10) <= 0 || parseInt(formData.age, 10) > 120) {
      newErrors.age = "Age must be between 1 and 120.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email must be a valid email address.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 11 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onAddCard(formData); // Pass form data to App to create a new card
      setFormData({ title: "", name: "", age: "", email: "", phone: "" }); // Reset form fields
      setErrors({}); // Clear errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-8">
      <b>Form</b>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`ml-2 p-1 border rounded-md text-black ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`ml-2 p-1 border rounded-md text-black ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className={`ml-2 p-1 border rounded-md text-black ${errors.age ? "border-red-500" : ""}`}
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`ml-2 p-1 border rounded-md text-black ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`ml-2 p-1 border rounded-md text-black ${errors.phone ? "border-red-500" : ""}`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4">
        Submit
      </button>
    </form>
  );
}

export default Form;
