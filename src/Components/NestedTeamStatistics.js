import React from 'react';
import '../styles/nestedStatistics.css';
import { useRef } from 'react';

function NestedTeamStatistics({ data, isParent=true }) {

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
          <div key={key}>
            {/* {
              console.log("value",value)
            } */}
            <h2>{key}</h2>
            <div 
            style={
              {
                display: ['played','wins','draws','loses','total','average','streak','wins','loses','for','against',
                'clean_sheet','failed_to_score','scored','missed'].indexOf(key) >-1 && 
                typeof(value.total) !==  'object'  ? 'flex' : 'block'
              }
            }
            >
              {renderNestedObject(value)}
            </div>
          </div>
        )
      } 
      else {
        return (
            <p style={{color: isParent ? 'red' : 'black'}}  key={key}>
              {key} {value}
            </p>
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
