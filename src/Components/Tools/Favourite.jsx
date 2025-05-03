import {React, useState} from 'react';
import { getCookie,setCookie } from '../../Api/cookie';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Favourite(props){
        const elem_id = props.elem_id;
        const cookie_name= props.cookie_name;
        const obj = props.obj
        function handlePreference(){
         //set prefered leagues cookie 
            let preferedItemsArr=getCookie(cookie_name);  
            if(preferedItemsArr !== null){
                if( preferedItemsArr.find(item=>item.id === elem_id) === undefined ){
                // const seasonsLength=elem.seasons.length;
                    // console.log("selected league",elemLeague);
                    // const seasonYear= elem.seasons[seasonsLength-1].year;
                    // const endDate=elem.seasons[seasonsLength-1].end;
                    preferedItemsArr.push(obj);
                }
                else
                {
                    const index=preferedItemsArr.indexOf(preferedItemsArr.filter(item=>item.id===elem_id)[0])
                    preferedItemsArr=preferedItemsArr.slice(0,index).concat(preferedItemsArr.slice(index+1)); 
                }
                setCookie(cookie_name,preferedItemsArr);
            }     
        }

        function setPreferedItemsColor(elem_id){ //to mark prefered league
            let preferedItemsArr=getCookie(cookie_name); 
            let strokeClass="text-blue-200"; 
            preferedItemsArr.map((item)=>{
                if(item.id === elem_id){
                    console.log("mark:",elem_id)
                   strokeClass= "text-blue-600";
                }
            })
            return strokeClass;
        }

        return(
            <div>
                <FontAwesomeIcon 
                    icon={faStar}
                    stroke='text-blue-200'
                    className={`size-8 sm:size-10 cursor-pointer hover:stroke-blue-600
                        ${setPreferedItemsColor(elem_id)}`}                             
                    onClick={(event)=>
                    {
                        const senderElement = event.currentTarget; 
                        senderElement.classList.toggle("text-blue-600");
                        senderElement.classList.toggle("text-blue-200");  
                        handlePreference(elem_id);                                
                        // elem.league?  //if there is leagues source data, display leagues pages, if not, it will be teams       
                        //     handlePreference(elem) 
                        //     :
                        //     handlePreference(elem)
                    }}/>
            </div>
        )
}