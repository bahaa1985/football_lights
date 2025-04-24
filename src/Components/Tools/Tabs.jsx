// Tabs.jsx
import {React,useState} from 'react';

 const Tabs = ({ tabs, activeTab, onTabChange }) => {
  // const [left,setLeft]=useState(0)
  return (
    <div className='w-full sm:w-fit mx-auto flex flex-row justify-center '>
      {/* tabs */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex justify-center items-center p-1 sm:p-3 w-[${100/tabs.length}%] sm:w-32 h-10 cursor-pointer border-b-2 border-solid            
          ${activeTab === index ? 'text-slate-900 font-bold border-b-2 border-solid border-blue-700' : 'hover:border-blue-200 hover:border-b-2 text-slate-500'}`}
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
       {/* indicator */}
       {/* <div className={`h-1 w-[${100/tabs.length}%] sm:w-32 bg-blue-700`} style={{marginLeft:(left).toString()+'%'}}></div> */}
    </div>
    
  );
};

export default Tabs;
