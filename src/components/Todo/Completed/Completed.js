import React from "react";
import BrowserDetection from "react-browser-detection";
import  { removeSVG,completeSVG } from "../../../utils/icons";

const browserHandler = {
  chrome: () => <div className="cover-bar" />,
  firefox: () => <div className="cover-bar width-15" />
};
const Completed = ({todos,onDelete,onComplete}) => {

  var list = todos;
  if(list != null){
    list = list.map(
      function(data, index) {
        return (
       <li key={index} >
          {data.item}
        <div className="buttons">
       <button className="remove" onClick={() => onDelete(data.id)} dangerouslySetInnerHTML={{ __html: removeSVG }}/>
       <button className="complete" onClick={()=> onComplete(data.id,1)} dangerouslySetInnerHTML={{ __html: completeSVG }}/>
      </div>
       </li>
        );
      }
    );
  }
  return (
    <ul className="todo scroll-bar-wrap" id="completed">
      <div className="scroll-box">{list}</div>
      <BrowserDetection>{browserHandler}</BrowserDetection>
    </ul>
  );

};


export default Completed;