import React, { Component } from 'react';
import Box from '../box-creator/box';
import bodyValidator from '../validateRulebody';
import checkID from "../error/checkDuplicateID";
import preventCylce from '../preventCyclic';
import validateCycleResult from '../validateCycleResult';
let _flowInstance = [];
export default class FlowCreator extends Component
{
    constructor(props)
    {  
          super(props);
          this.state = {object: [{"label": "RuleName","name":"Rule Name", "placeholder": "Enter Rule Name E.g: Rule 1", "id": 1},
                                 {"label": "RuleID", "name":"Rule ID", "placeholder":"Enter Rule ID (unique) E.g: 1","id": 2},
                                 {"label": "IDifTrue","name":"ID if Rule is True", "placeholder":"E.g: 2","id": 3},
                                 {"label": "IDifFalse", "name":"ID if Rule is False", "placeholder":"E.g: 3","id": 4},
                                 {"label": "RuleBody","name":"Rule Body", 
                                 "placeholder":`Enter Rule Body (a proper javascript function)
                     function(object)
                             {
                             return object.name === "Rule 1";
                            }`,"type": "textarea", "id": 5}],
                        rule: {RuleName : '', RuleID: '', IDifTrue: '', IDifFalse: '', RuleBody: ''} ,
                        flow: [], ruleValidator: {}, error_source: '' ,
                         notValid: false , message: '',valid_body: true, tempFlow:[]    
                     };
            this.setRuleProperties = this.setRuleProperties.bind(this);
            this.addRuleToFlow = this.addRuleToFlow.bind(this);
            this.validate = this.validate.bind(this);
            this.validateRuleBody = this.validateRuleBody.bind(this);
            this.reset = this.reset.bind(this);
            this.setRules = this.setRules.bind(this);
            this.cleanFlow = this.cleanFlow.bind(this);
            this.setError = this.setError.bind(this);
     }

     componentWillReceiveProps(nextProps)
     {
      if( "delete" === nextProps.state)
        {
            this.setState({flow:this.state.flow.filter(rule => rule.RuleID !== nextProps.ruleId.toString())} ,
                () => {   
             }) ;

             let index = _flowInstance.map((rule) => rule.RuleID).indexOf(nextProps.ruleId);
             if(index !== -1)
             {
                 _flowInstance.splice(index, 1);
             }
        }
     }
     setError(source, message)
     {
        this.setState({notValid: true, error_source: source, message:message,
        flow: [...this.state.flow], rule: {...this.state.rule},
        ruleValidator:{...this.state.rule}})
     }
     /**************validate rule************/
    validateRuleBody(func)
    {
        try{
            this.setState({message: "", notValid: false})
            return bodyValidator (func);    
        }catch (e)
        {
           this.setState({message: 'the javascript function you provided is not valid.',
           error_source:'Rule Body', notValid: true})
        }
    }

    setRules()
    {
        this.props.setRules(this.state.flow);
    }
    componentDidUpdate(prevProps, prevState) 
      {
        if(!this.state.ruleValidator.hasOwnProperty('RuleName'))
        {
            this.reset();
        }
      }

    cleanFlow(flow)
    {
        let indexID = _flowInstance.map((rule) => rule.RuleID).indexOf(this.state.ruleValidator.RuleID);
        let indexName = _flowInstance.map((rule) => rule.RuleIName).indexOf(this.state.ruleValidator.RuleName);
        if(indexID !== -1)
        {
            _flowInstance.splice(indexID, 1);
        }

        if(indexName !== -1)
        {
            _flowInstance.splice(indexName, 1);
        }
       _flowInstance = [..._flowInstance, this.state.ruleValidator];
    }
    reset()
    {
        document.getElementById('form').reset();
    }
            /*************validate object *****/
            valid(prop, i)
            {       
                    if(i !== "IDifTrue" && i !== "IDifFalse" && i !== "TestResult")
                    {
                        return this.validate(prop);  
                    }else
                    {
                        return true;
                    }                 
            }
      //******************* add Rule to flow *****/
      validate(prop)
      {
          return prop != null && "" !== prop && 0 !== prop.length;
      }
      /**********************add rule to flow *****/
      ruleIsValid()
      {
          this.setState({flow: [...this.state.flow, this.state.rule],
                                            rule: {RuleName : '', RuleID: '', IDifTrue: '', IDifFalse: '', RuleBody: ''},
                                            ruleValidator: {}, notValid: false, 
                                           }, ()=> {this.setRules()});
      }
        addRuleToFlow(event)
        {
              event.preventDefault();         
              /************* validate input ****/            
             if(this.state.ruleValidator.hasOwnProperty('RuleName'))
             {
                for(let i in this.state.ruleValidator) 
                {
                      if (this.valid (this.state.ruleValidator[i],i)){
                         // ---------- validate rule body --------
                         if(i === "RuleBody")
                            {
                                if (this.validateRuleBody(this.state.ruleValidator[i]) !== undefined)
                                 {
                                   if (checkID(this.state.ruleValidator, this.state.flow).length === 0)
                                      {
                                         /*********check the cycle ********/
                                         this.cleanFlow(this.state.ruleValidator);
                                            if (!validateCycleResult( preventCylce(this.state.ruleValidator, _flowInstance)))
                                            {
                                             this.ruleIsValid();
                                            }else
                                            {
                                             this.setError('Rule Is Cyclic', 'Sorry, the flow shouldn\'t be cyclic');
                                             return ; 
                                            }                                      
                                      }else
                                      {
                                        this.setError('Rule ID', 'Sorry, this is a duplicate ID, Rule ID must be unique');
                                        return ;
                                      }                                 
                                 }
                            }
                      }else
                      {
                             this.setError(i, 'shouldn\'t be empty');
                             return ;
                      }
                }
             }else
             {
                this.setState({notValid: true, error_source: 'Rule fields', message: 'shouldn\'t be empty'})
             }  
        }
/*******************ends  ********************/
    setRuleProperties(event)
    {
        this.setState({rule : {...this.state.rule, [event.target.name]: event.target.value, "TestResult":null},
             ruleValidator: {...this.state.rule, [event.target.name]: event.target.value}}, () => {
             });   
    }
/************************ reset form */
    render()
    {
        return  (       
                  <Box type = "rule" name = "Create Flow" btn = "Add Rule" 
                   object = {this.state.object} setRuleProperties = {this.setRuleProperties}
                   message  = {this.state.message}
                   addRule = {this.addRuleToFlow} error = {this.state.error_source} notValid = {this.state.notValid}/>
                )
    }
}