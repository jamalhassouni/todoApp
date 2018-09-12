import React from "react";
import PropTypes from "prop-types";
import BrowserDetection from "react-browser-detection";
import { removeSVG, completeSVG, closeSVG } from "../../../utils/icons";

const browserHandler = {
  chrome: () => <div className="cover-bar" />,
  firefox: () => <div className="cover-bar width-15" />
};

const Uncompleted = ({
  todos,
  ItemDragging,
  idEdited,
  onDelete,
  onComplete,
  onClose,
  onSave,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDragLeave,
  onDragEnter
}) => {
  var list = todos;
  if (list != null) {
    list = list.map(function(data, index) {
      // eslint-disable-next-line
      const dragging = index == ItemDragging ? "dragging" : "";
      const classes = `${dragging} item`;
      if (data.id === idEdited) {
        return (
          <li key={index} className="editable">
            <input
              tabIndex={data.sort}
              className="inputedit"
              type="text"
              onKeyPress={e => onSave(e)}
              defaultValue={data.item}
              id={data.id}
            />
            <div className="buttons">
              <button
                className="close"
                title="Cancel"
                onClick={() => onClose()}
                dangerouslySetInnerHTML={{ __html: closeSVG }}
              />
            </div>
          </li>
        );
      } else {
        return (
          <li
            tabIndex={data.sort}
            title="Click to edit or drag to change position"
            className={classes}
            data-value={data.item}
            draggable="true"
            data-id={data.id}
            data-index={index}
            key={index}
            onDrop={e => onDrop(e, 1)}
            onDragOver={e => onDragOver(e, 1)}
            onDragEnd={() => onDragEnd(1)}
            onDragLeave={() => onDragLeave()}
            onDragEnter={e => onDragEnter(e, 1)}
            onDragStart={e => onDragStart(e)}
          >
            {data.item}
            <div className="buttons">
              <button
                className="remove"
                title="Delete"
                onClick={() => onDelete(data.id, 1, data.sort)}
                dangerouslySetInnerHTML={{ __html: removeSVG }}
              />
              <button
                className="complete"
                title="Mark as Completed"
                onClick={() => onComplete(data.id, 2, data.sort)}
                dangerouslySetInnerHTML={{ __html: completeSVG }}
              />
            </div>
          </li>
        );
      }
    });
  } else {
    list = (
      <div className="text-center">
        <span>No Tasks Found</span>
      </div>
    );
  }

  return (
    <div className="col-md-6">
      <div className="plate">
        <p className="script">
          <span>Uncompleted tasks</span>
        </p>
      </div>
      <ul className="todo scroll-bar-wrap" id="todo">
        <div className="scroll-box">{list}</div>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </ul>
    </div>
  );
};
Uncompleted.propTypes = {
  todos: PropTypes.array,
  idEdited: PropTypes.string,
  ItemDragging: PropTypes.number,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragEnter: PropTypes.func
};
export default Uncompleted;
