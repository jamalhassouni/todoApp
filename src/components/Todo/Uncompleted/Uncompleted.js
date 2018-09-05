import React from "react";
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
              className="inputedit"
              type="text"
              onKeyPress={e => onSave(e)}
              defaultValue={data.item}
              id={data.id}
            />
            <div className="buttons">
              <button
                className="close"
                onClick={() => onClose()}
                dangerouslySetInnerHTML={{ __html: closeSVG }}
              />
            </div>
          </li>
        );
      } else {
        return (
          <li
            className={classes}
            data-value={data.item}
            draggable="true"
            data-id={data.id}
            data-index={index}
            key={index}
            onDrop={e => onDrop(e)}
            onDragOver={e => onDragOver(e)}
            onDragEnd={() => onDragEnd()}
            onDragLeave={() => onDragLeave()}
            onDragEnter={e => onDragEnter(e)}
            onDragStart={e => onDragStart(e)}
          >
            {data.item}
            <div className="buttons">
              <button
                className="remove"
                onClick={() => onDelete(data.id)}
                dangerouslySetInnerHTML={{ __html: removeSVG }}
              />
              <button
                className="complete"
                onClick={() => onComplete(data.id, 2)}
                dangerouslySetInnerHTML={{ __html: completeSVG }}
              />
            </div>
          </li>
        );
      }
    });
  }

  return (
    <div className="col-md-6">
      <ul className="todo scroll-bar-wrap" id="todo">
        <div className="scroll-box">{list}</div>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </ul>
    </div>
  );
};

export default Uncompleted;
