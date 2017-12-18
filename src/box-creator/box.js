import React from 'react';
import Field from './field';
import Display from './showRules';
import Error from '../error/error-handler';
import Result from "./flowResult";
import Accordion from '../accordion';
const Box = ({type, name, btn, object, setRuleProperties, addRule, 
    error, notValid, message, rules, remove, execute, flowResult}) => (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 box">
    <h3>{name}</h3>
    {type === "rule" ? <form  className ="form-inline" id= "form" onSubmit = {addRule}>
            {object.map((rule)=> 
              <Field key ={rule.id} label = {rule.label} name = {rule.name} placeholder = {rule.placeholder}
               type ={rule.type} setRuleProperties = {setRuleProperties}/> 
             )}
           
            
        <button type="submit" className = "btn btn-success">{btn}</button>   
       </form> : null }
   {/******************************** object body *************************/}
   {type === "object" ?  
   <form action="" className ="form-inline" >
      <div className="wrapper object">
              <label className ="">Input Object</label> 
                 <div className="input">    
                    <textarea type = "textarea" className = "form-control"  rows="6" onChange = {setRuleProperties}
                    placeholder = {`Enter Input Object E.g: 
                                    {
                                        "name": "foo"
                                    }
                                   `}/>
                </div>
      </div> 
      </form>:null }
      {/********************** list of rules ***************/}
      { type === "list" ?  
          <span>
                {  rules.map(rule => 
                      <Display key ={rule.RuleID} rule = {rule.RuleName} id = {rule.RuleID} remove ={remove}/>
                 ) }
          </span>
        
           :null 
       }
    
        {notValid ? <Error error = {error} message= {message}/> : null}
        { type === "object" ? <a type="submit" className = "btn btn-success" onClick = {execute}>{btn}</a> : null }

        {/***************** rules result ***************/}
        { type === "result" ?
           <span>
            {  flowResult.map(rule => 
                 <Result key ={rule.RuleID} ruleName = {rule.RuleName} id = {rule.RuleID} testResult = {rule.TestResult} trueID = {rule.IDifTrue} falseID = {rule.IDifFalse} body = {rule.RuleBody}/>
            ) }
           </span>
         :null 
        } 
    </div>
);

export default Box;