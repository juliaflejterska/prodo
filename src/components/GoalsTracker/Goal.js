import { useState } from "react";
import ReactPaginate from "react-paginate";
import GoalsForm from "./GoalsForm";
import { BiEdit } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import classes from "./Goal.module.css";

//from GoalsTracker
const Goal = ({ goals, removeGoal, updateGoal }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [pageNum, setPageNum] = useState(0);
  const goalsPerPage = 5;
  const pagesVisited = pageNum * goalsPerPage;
  const pageCount = Math.ceil(goals.length / goalsPerPage);

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  const submitGoalUpdate = (value) => {
    if (!value || value === "" || value.length === 0) {
      window.alert("ENTER VALID NAME");
    }
    updateGoal(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const displayGoals = goals
    .slice(pagesVisited, pagesVisited + goalsPerPage)
    .map((goal, index) => {
      return (
        <div key={index} className={classes.list}>
          <div key={goal.id} className={classes.text}>
            <div>
              <h4>{goal.text}</h4>
            </div>
          </div>

          <div className={classes.icons}>
            <BiEdit onClick={() => setEdit({ id: goal.id, text: goal.text })} />
            <RiCloseCircleLine onClick={() => removeGoal(goal.id)} />
          </div>
        </div>
      );
    });

  if (edit.id)
    return (
      <>
        <div className={classes.edit}>
          <h2>edit your goal</h2>
          <h3>({edit.text})</h3>
          <GoalsForm
            placeholder={"enter new name"}
            buttonText="save edit"
            edit={edit}
            onSubmit={submitGoalUpdate}
          />
        </div>
      </>
    );

  return (
    <>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={classes.container}
        activeClassName={classes.active}
      />
      <div className={classes.goals}>{displayGoals}</div>
    </>
  );
};

export default Goal;
