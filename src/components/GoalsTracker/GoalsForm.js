import { useState } from "react";
import Select from "react-select";
import classes from "./GoalsForm.module.css";

const GoalsForm = (props) => {
  const categories = [
    { value: "self-development", label: "self-development" },
    { value: "self-care", label: "self-care" },
    { value: "work/school", label: "work/school" },
    { value: "other", label: "other" },
  ];
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === "" || input.length === 0) {
      alert("Name cannot be empty. Please enter a valid name.");
      return;
    }

    props.onSubmit({
      id: Math.floor(Math.random() * 1000000),
      text: input,
      category: selectedCategory,
    });

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.title}>
        <h2>{props.title}</h2>
      </div>
      <h3>name</h3>
      <input
        className={classes.input}
        onChange={handleInputChange}
        value={input}
        type="text"
        placeholder={props.placeholder}
        name="goal"
      />
      <h3>category</h3>
      <Select
        className={classes.input}
        value={categories.find(
          (category) => category.value === selectedCategory
        )}
        options={categories}
        onChange={handleCategoryChange}
      ></Select>
      <button className={classes.btn}>
        <span className={classes.span}>{props.buttonText}</span>
      </button>
    </form>
  );
};

export default GoalsForm;
