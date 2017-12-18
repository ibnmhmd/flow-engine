
let finalResult = [];
const RulesResult = (Rule, Test) => 
{
      Rule.TestResult = Test;
      let index = finalResult.map((rule) => rule.RuleID).indexOf(Rule.RuleID);
        if(index !== -1)
        {
              finalResult = [];
        }
       finalResult.push(Rule);
       return finalResult;
}

export default RulesResult;