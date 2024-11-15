import { useState } from "react";
import { useDrag } from "react-dnd";

function Card({ cardData, onUpdateCard, onDeleteCard }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cardData);
  const [errors, setErrors] = useState({
    title: "",
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  //drag and drop functionality
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: cardData.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters.";
    }
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Age must be a positive number.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email.";
    if (!formData.phone || !/^\d{11}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 11 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  //function to switch between editing or not
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  //function to save edited card
  const handleSaveClick = () => {
    if (validateForm()) {
      onUpdateCard(formData);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = () => {
    onDeleteCard(cardData.id);
  };

  return (
    <div ref={drag} className={`bg-white p-3 m-2 rounded shadow-md ${isDragging ? "opacity-50" : "opacity-100"}`}>
      {isEditing ? (
        <div>
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border p-1 mb-2"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-1 mb-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="border p-1 mb-2"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-1 mb-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-1 mb-2"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <button onClick={handleSaveClick} className="bg-green-500 p-1 rounded text-white">Save</button>
        </div>
      ) : (
        <div className="text-left">
          <p><b>{cardData.title}. {cardData.name}</b> {cardData.age} yo</p>
          <p>{cardData.email}</p>
          <p>{cardData.phone}</p>
          <div className="mt-2">
            <button onClick={handleEditClick} className="bg-yellow-500 p-1 rounded text-white">Edit</button>
            <button onClick={handleDeleteClick} className="bg-red-500 p-1 ml-2 rounded text-white">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
