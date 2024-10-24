import React from "react";
import Todo from "../assets/direct-hit.png";

import "./DeleteColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const DeleteColumn = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  let data = [{ Name: "Goa" }];

  return (
    <section className="delete_column">
      <h2 className="task_column_heading">{title}</h2>
      <div className="Region-Delete-Column-Container">
        <DropArea onDrop={() => onDrop(0, status)} />
        {data.map((task, index) => (
          <React.Fragment key={index}>
            <TaskCard
              title={task.Name}
              // tags={task.tags}
              handleDelete={handleDelete}
              index={index}
              setActiveCard={setActiveCard}
            />
            <DropArea onDrop={() => onDrop(index + 1, status)} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default DeleteColumn;
