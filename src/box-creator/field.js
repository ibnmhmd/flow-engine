import React from 'react';

const Field = ({label,name, placeholder, type, setRuleProperties}) => (

    <div className="wrapper">
     <label >{name}</label> 
     {type !== "textarea" ? 
    
      <div className="input">
         <input name ={label} type = "text" className = "form-control" placeholder = {placeholder} onKeyUp = {setRuleProperties}/>
      </div> :
         <div className="input">
            <textarea name ={label} rows = "5" className = "form-control" placeholder = {placeholder} onKeyUp = {setRuleProperties}/>
       </div>}
   </div>
);

export default Field;