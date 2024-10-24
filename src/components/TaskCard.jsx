import React from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({
  title,
  tags,
  handleDelete,
  index,
  setActiveCard,
  status,
  RegionIndex,
}) => {
  return (
    <div
      className="task_card_border_Css"
      draggable
      onDragStart={() =>
        setActiveCard({ index: index, RegionIndex: RegionIndex })
      }
      onDragEnd={() => setActiveCard(null)}
    >
      <article className="task_card">
        <span className="task_text">{title}</span>

        <div className="task_card_bottom_line">
          <div className="task_card_tags">
            {/* {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))} */}
          </div>
          <div
            className="task_delete"
            onClick={() => handleDelete(index, status, RegionIndex)}
          >
            <img
              src={deleteIcon}
              className="delete_icon"
              alt=""
              draggable={false}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default TaskCard;
