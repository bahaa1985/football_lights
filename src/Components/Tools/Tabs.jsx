// Tabs.jsx
import {React} from 'react';
import { getTranslation } from '../Translation/labels';
const lang = JSON.parse(localStorage.getItem('language'))?.lang || 'en';  
 const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='w-full mx-auto flex flex-row justify-center gap-2 '>
      {/* tabs */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex justify-center items-center p-1 sm:p-3 w-[${100/tabs.length}%] sm:w-40 h-10 cursor-pointer border-b-2 border-solid text-lg            
          ${activeTab === index ? 'text-slate-900 font-bold border-b-2 border-solid border-blue-700' : 'hover:border-blue-300 hover:border-b-2 text-slate-500'}`}
          onClick={(e) => {
            e.stopPropagation();
            onTabChange(index);
          }}
        >
          {getTranslation(tab,lang) || tab}
        </div>
      ))}
    </div>
    
  );
};

export default Tabs;
