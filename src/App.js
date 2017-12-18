import React, { Component } from 'react';
import './assets/scss/App.css';
import FlowCreator from "./flow-body/flow-creator";
import Rules from "./listOfRules/rules";
import InputObject from "./inputObject/input";

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {rules: [], id: '', state: ""};
    this.getRules = this.getRules.bind(this);
    this.remove = this.remove.bind(this);
  }

  remove(id)
  {
    this.setState({rules: this.state.rules.filter(rule => rule.RuleID !== id.toString()), id, state: "delete"});
  }
  getRules(rules)
  {
    this.setState({rules, state: ""});
  }
  render() {

    return (
      <div className="App">
          <div className="panel panel-success">
            <div className="panel-body">
              <h1>flow engine</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
                 <FlowCreator setRules = {this.getRules} ruleId = {this.state.id} state = {this.state.state}/>
                 <Rules rules = {this.state.rules} removeRule = {this.remove}/>
                 <InputObject rules = {this.state.rules}/>
            </div> 
          </div>
      </div>
    );
  }
}

export default App;
