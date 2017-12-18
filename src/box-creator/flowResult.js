import React from "react";
import Accordion from '../accordion';
 const Result  = ({ruleName,testResult, id, trueID, falseID,body}) => (
    <Accordion>
    <div className="accor">
      <div className={testResult? "head-success": "head-failure"}><span className="left-id">{id}</span> {ruleName} - &nbsp; *{testResult ? "Passed":"Failed"}*</div>
             <div className="body">
                 
               <div className="row">  
               <h4 className ="resultText rule">Rule Body</h4>                    
                         <div className="col-xs-12 div">                          
                           <h4 className ="resultText">{body}</h4> 
                         </div>
               </div>
                                
                  <div className="resultDiv">
                     <div className="inner left"> <h4 className ="resultText">Next rule-ID if passed</h4> </div>
                     <div className="inner right"> <h4 className ="resultText">Next rule-ID if failed</h4> </div>  

                     <div className="inner left-true"> <h4 className ="resultText">{trueID}</h4></div>
                     <div className="inner right-true"><h4 className ="resultText">{falseID} </h4></div>  

                  </div>

               </div>  
            
    </div>
  </Accordion>)

export default Result;