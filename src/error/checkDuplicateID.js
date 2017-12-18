export default  (newRule, flow) => {
return flow.filter( (rule) => 
                      rule.RuleID === newRule.RuleID
                    );
} 