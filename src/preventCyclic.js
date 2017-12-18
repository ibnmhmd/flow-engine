export default (fl,flow) => {

    if(flow.length === 0) { return true; }
  
    const sliceRuleFromFlow = (id) =>
      flow.find(rule => rule.RuleID === id) || null;
  
    const visitSlicedRule = (currentRule, ids) => {
      if(currentRule === null) { return true; }
  
      const { RuleID, IDifTrue, IDifFalse } = currentRule;
      if(ids.indexOf(RuleID) !== -1) {
          return "cyclic";
      }
  
      const validRule = visitSlicedRule(sliceRuleFromFlow(IDifTrue), [...ids, RuleID]);
      if(validRule === 'cyclic') { return validRule; }
      return visitSlicedRule(sliceRuleFromFlow(IDifFalse), [...ids, RuleID]);
    };
    const validRule = visitSlicedRule(sliceRuleFromFlow(flow[0].IDifTrue), [flow[0].RuleID]);

    if(validRule === 'cyclic') { return validRule; }
    return visitSlicedRule(sliceRuleFromFlow(flow[0].IDifFalse), [flow[0].RuleID]);
  };
 