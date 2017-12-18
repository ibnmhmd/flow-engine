import React, { Component } from 'react';
import Box from '../box-creator/box';

export default class Rules extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {rules: []};
        this.Remove = this.Remove.bind(this);
    }
 Remove(ruleID)
 {
    this.props.removeRule(ruleID);
 }
  componentWillReceiveProps(nextProps)
  {
      this.setState({rules: nextProps.rules});
  }
    render()
    {
        return(<Box name = "List Of Rules" rules = {this.state.rules} type = "list" remove = {this.Remove}/>)
    }
}