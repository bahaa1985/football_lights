import React from 'react';
import '../styles/nestedStatistics.css';
const NestedObjectComponent = ({ data, isParent=true }) => {
  const renderNestedObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (value === null) {
        return (
          <p key={key}>
            {key}: NA
          </p>
        );
      } 
      else if (typeof(value) === 'object') {
        return (
          <div key={key}>
            <h2 >{key}:</h2>
            <div className='stat_details'>{renderNestedObject(value)}</div>
          </div>
        );
      } else {
        return (
          <p style={{color: isParent ? 'red' : 'black'}}  key={key}>
            {key}: {value}
          </p>
        );
      }
    });
  };

  return (
    <div>
      {renderNestedObject(data)}
    </div>
  );
};

export default NestedObjectComponent;
