import {React, useState} from 'react';
import { getCookie,setCookie } from '../../Api/cookie';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Favourite(props){
        const elem_id = props.elem_id;
        const cookie_name= props.cookie_name;
        const obj = props.obj
        function handlePreference(){
            let preferedItemsArr=getCookie(cookie_name);  
            if(preferedItemsArr !== null){
                if( preferedItemsArr.find(item=>item.id === elem_id) === undefined ){
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

        function setPreferedItemsColor(elem_id){ //to mark prefered league/team
            let preferedItemsArr=getCookie(cookie_name); 
            let strokeClass="text-slate-200"; 
            preferedItemsArr.map((item)=>{
                if(item.id === elem_id){
                    console.log("mark:",elem_id)
                   strokeClass= "text-yellow-400";
                }
            })
            return strokeClass;
        }

        return(
            <div>
                <FontAwesomeIcon 
                    icon={faStar}
                    className={`size-6 sm:size-8 cursor-pointe hover:text-slate-200 ${setPreferedItemsColor(elem_id)} cursor-pointer`}                             
                    onClick={(event)=>
                    {
                        const senderElement = event.currentTarget; 
                        senderElement.classList.toggle("text-yellow-400");
                        senderElement.classList.toggle("text-slate-200");  
                        handlePreference(elem_id);
                    }}/>
            </div>
        )
}