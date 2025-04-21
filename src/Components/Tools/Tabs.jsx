// Tabs.jsx
import {React,useState} from 'react';

 const Tabs = ({ tabs, activeTab, onTabChange }) => {
  // const [left,setLeft]=useState(0)
  return (
    <div>
      {/* tabs */}
      <div className='w-full flex flex-row justify-center space-x-3'>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex justify-center items-center w-[${100/tabs.length}%] sm:w-32 h-10 cursor-pointer  
          ${activeTab === index ? 'text-slate-900 font-bold border-b-4 border-solid border-blue-700' : 'text-slate-500 border-none'}`}
          onClick={(e) => {
            e.stopPropagation();
            onTabChange(index);
            console.log('Clicked tab index:', index, 'Active tab:', activeTab);
            // setLeft(index*(100/tabs.length));
          }}
        >
          {tab}
        </div>
      ))}
      </div>
       {/* indicator */}
       {/* <div className={`h-1 w-[${100/tabs.length}%] sm:w-32 bg-blue-700`} style={{marginLeft:(left).toString()+'%'}}></div> */}
    </div>
    
  );
};

export default Tabs;
