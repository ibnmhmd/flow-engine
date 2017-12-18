import React, {Component} from 'react';
import Box from '../box-creator/box';
import parseJsonInput from "../error/handleInputObject";
import FinalExecuter from "../flowExecuter/final_executer";

export default  class InputObject extends Component
{

    constructor(props)
    {
        super(props);
        this.handleObject = this.handleObject.bind(this);
        this.validateJSON = this.validateJSON.bind(this);
        this.executeFlow = this.executeFlow.bind(this);
        this.state = {inputObject: '', error_source: false, notValid: false, message: '', _JSON: null, flowResult: []};
    }

    componentDidMount()
    {
     
    }
     handleObject(event)
     {
         this.setState({inputObject: event.target.value}, ()=> {
 
         });
     }

     executeFlow()
     {
       if ("no-flow-to-execute" === FinalExecuter(this.props.rules, this.state._JSON))
       {
          this.setState({message: 'Sorry, there\'s no rule to execute.', error_source: 'Flow Execution', notValid: true, flowResult: []});
       }else
       {
            this.setState({flowResult: FinalExecuter(this.props.rules, this.state._JSON), message: '', notValid: false}, () => {
                console.log(this.state.flowResult)
            });
       }

      
     }
     validateJSON()
     {
         const object = parseJsonInput(this.state.inputObject);
         if ("not-valid" === object)
         {
            this.setState({message: 'This doesn\'t seem to be a valid JSON Object.',
            error_source:'Input Object', notValid: true});
         }else
         {
            this.setState({message: '',
            error_source:'', notValid: false, _JSON: object}, () => {this.executeFlow();});
         }
     }
     render()
     {
         return(<span> <Box execute = {this.validateJSON} name = "Input Object" 
           type = "object" btn = "Execute Flow"
           setRuleProperties = {(e)=> this.handleObject(e)} message  = {this.state.message}
           error = {this.state.error_source} notValid = {this.state.notValid}/>
           <Box name = "Result" flowResult = {this.state.flowResult} type = "result"/>
          </span>);
     }
}
