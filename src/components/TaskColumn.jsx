import React, { useEffect, useState } from "react";
import Todo from "../assets/direct-hit.png";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";
import Each from "./Each";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
  RegionIndex,
  setRegionsObjectModal,
  setDeletedRegion,
}) => {
  const [titleValue, setTitleValue] = useState("");

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  const changeRegionName = (Name, RegionIndex) => {
    console.log(RegionIndex);
    setTitleValue(Name);
  };

  const saveChangedRegionName = () => {
    alert("name has been saved");
    setRegionsObjectModal((prev) => {
      let changename = [...prev];
      changename[RegionIndex].label = titleValue;
      return changename;
    });
  };

  const deleteRegionFuncton = (RegionIndex, title) => {
    console.log("delete", RegionIndex);
    setDeletedRegion({ RegionIndex: RegionIndex, title: title });
  };

  return (
    <section className="task_column">
      <div className="inputAndButton_container">
        <input
          type="text"
          className="task_column_heading"
          value={titleValue}
          onChange={(e) => changeRegionName(e.target.value, RegionIndex)}
          // onFocus={() => setInputClicked(true)}
          onBlur={() =>
            setTimeout(() => {
              saveChangedRegionName();
            }, 300)
          }
        />
        {title === "Not Serviced" ? (
          ""
        ) : (
          <button
            alt="submit"
            height={20}
            width={20}
            className="input_box_buttonRegionDelete"
            onClick={() => deleteRegionFuncton(RegionIndex, titleValue)}
          >
            <img
              src="https://icon-library.com/images/delete-icon-png/delete-icon-png-20.jpg"
              height={20}
              width={20}
            ></img>
          </button>
        )}
      </div>
      <div className="Region-Column-Container">
        <DropArea key={title} onDrop={() => onDrop(0, status, RegionIndex)} />

        <Each
          of={tasks}
          render={(task, index) => (
            <React.Fragment>
              <TaskCard
                title={task.Name}
                // tags={task.tags}
                handleDelete={handleDelete}
                index={index}
                setActiveCard={setActiveCard}
                status={status}
                RegionIndex={RegionIndex}
              />
              <DropArea onDrop={() => onDrop(index + 1, status, RegionIndex)} />
            </React.Fragment>
          )}
        />
        {/* <DropArea
          onDrop={() => onDrop(index + 1, status, RegionIndex)}
          full={1}
        /> */}
      </div>
    </section>
  );
};

export default TaskColumn;
