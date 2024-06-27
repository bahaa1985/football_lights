import React from 'react';
import '../styles/nestedStatistics.css';

const NestedTeamStatistics = ({ data, isParent=true }) => {

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
          <div key={key} style={{display: key !== 'fixtures' || key !== 'goals' || key !=='biggest ' ? 'flex':null}}>
            <h2>{key}:</h2>
            <div style={{display:'flex'}}>{renderNestedObject(value)}</div>
          </div>
        )
      } else {
        return (
          <div>
            <p style={{color: isParent ? 'red' : 'black'}}  key={key}>
              {key}: {value}
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
