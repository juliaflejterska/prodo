import { useState, useEffect } from "react";
import Select from "react-select";
import { motion } from "framer-motion";

import GoalsForm from "./GoalsForm";
import Goal from "./Goal";

import classes from "./GoalsTracker.module.css";

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

const GoalsTracker = () => {
  const forceUpdate = useForceUpdate();

  const sortCategories = [
    { value: "all", label: "all" },
    { value: "self-development", label: "self-development" },
    { value: "self-care", label: "self-care" },
    { value: "work/school", label: "work/school" },
    { value: "other", label: "other" },
  ];

  const [selectedSortCategory, setSelectedSortCategory] = useState(
    sortCategories[0].value
  );

  const [goals, setGoals] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const showAddHandler = () => {
    setShowAdd(true);
  };

  let goalsFromLS;
  useEffect(() => {
    goalsFromLS = JSON.parse(localStorage.getItem("goals"));
    setGoals(goalsFromLS);
  }, []);

  useEffect(() => {
    if (selectedSortCategory === "all") {
      setSelectedGoals([...goals]);
      forceUpdate();
    } else {
      const isCategory = (goal) => {
        return goal.category === selectedSortCategory;
      };
      setSelectedGoals([...goals].filter(isCategory));
    }
  }, [selectedSortCategory, goals]);

  const changeSortCategory = (e) => {
    setSelectedSortCategory(e.value);
  };

  const addGoal = (goal) => {
    if (!goal.text || /^\s*$/.test(goal.text)) return;

    const newGoals = [goal, ...goals];

    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  const removeGoal = (id) => {
    const removeArray = [...goals].filter((goal) => goal.id !== id);
    setGoals(removeArray);
    localStorage.setItem("goals", JSON.stringify(removeArray));
  };

  const updateGoal = (goalId, newGoal) => {
    if (!newGoal.text || /^\s*$/.test(newGoal.text)) return;

    const editedGoals = [...goals].map((goal) =>
      goal.id === goalId ? newGoal : goal
    );
    setGoals(editedGoals);
    localStorage.setItem("goals", JSON.stringify(editedGoals));
  };

  return (
    <section>
      <div className={classes.empty}></div>
      <div className={classes.main}>
        <div className={classes.container}>
          <img
            className={classes.img}
            src="https://images.unsplash.com/photo-1591258370814-01609b341790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="excercising women"
          ></img>
          {!showAdd && (
            <div className={classes.text}>
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 25,
                  duration: 1,
                }}
              >
                GOALS TRACKER
              </motion.h1>
              <button className={classes.btn} onClick={showAddHandler}>
                <span className={classes.span}>ADD YOUR GOAL</span>
              </button>
            </div>
          )}
        </div>

        {showAdd && (
          <div className={classes.add}>
            <GoalsForm
              title="NEW GOAL"
              placeholder="enter text"
              buttonText="ADD"
              onSubmit={addGoal}
            />
          </div>
        )}
      </div>

      <motion.div
        className={classes.goals}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, stiffness: 260 }}
      >
        <div className={classes.categories}>
          <h2>choose category </h2>
          <Select
            className={classes.select}
            value={sortCategories.find(
              (category) => category.value === selectedSortCategory
            )}
            options={sortCategories}
            onChange={changeSortCategory}
          ></Select>
        </div>

        <div className={classes.all}>
          <Goal
            goals={selectedGoals}
            removeGoal={removeGoal}
            updateGoal={updateGoal}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default GoalsTracker;
