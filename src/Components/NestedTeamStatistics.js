import React from 'react';
import '../styles/nestedStatistics.css';
import { useRef } from 'react';

function NestedTeamStatistics({ data, isParent=true }) {

  const parentDiv =useRef();

  const renderNestedObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (value === null) {
        return (
          <p key={key}>
            {key}: NA
          </p>
        )
      } 
      else if (typeof(value) === 'object') {
        return (
          <div key={key} style={{display: 'block'}}>
            <h2>{key}:</h2>
            <div ref={parentDiv} style={{display: typeof(value) === 'object' ? 'block' : 'flex'}}>
              {renderNestedObject(value)}
            </div>
          </div>
        )
      } 
      else {
        return (
          <div id='atomic'>
            {
              parentDiv.current.style.backgroundColor='lightblue'
            }
            <p style={{color: isParent ? 'red' : 'black'}}  key={key}>
              {key} : {value}
            </p>
          </div>
        )
      }
    })
  };

  return (
    <div>
      {renderNestedObject(data)}
    </div>
  );
};

export default NestedTeamStatistics;
