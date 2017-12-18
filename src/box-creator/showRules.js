
import React from "react";
const Display = ({rule, id, remove}) => (
    <div>
           <label className = "alert alert-success">{id} - &nbsp; {rule}<span onClick = {() => remove(id)} className ="remove">X</span></label>
    </div>
)

export default Display ;

