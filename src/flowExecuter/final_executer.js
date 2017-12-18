import Engine from './engine';
import RulesResult from '../rulesResult/rulesResult';

const FinalExecuter = (flow, json) => 
{
    if(flow.length === 0 || flow === null || flow === undefined){return 'no-flow-to-execute'};
    const generatorInstance = generator(flow[0], json, flow);
    return  generatorInstance.next().value;
}
export default FinalExecuter ;

function* generator(rule, json,flow) {

    let nextRule, result;
    if(!Engine(rule, json))
    {
       result = RulesResult (rule, Engine(rule, json) === undefined ? false : Engine(rule, json));
       nextRule = getNextRuleIfFalse(rule, flow);
      if(nextRule !== undefined){ yield* generator(nextRule, json, flow);}
      else {
       return yield result;
      }
    }else
    if(Engine(rule, json))
    {
        result = RulesResult (rule, Engine(rule, json) === undefined ? false : Engine(rule, json));
        nextRule = getNextRuleIfTrue(rule, flow); 
        if(nextRule !== undefined){  yield* generator(nextRule, json,flow)}
        else{
            return yield result;
        }  
    }
}
const  getNextRuleIfTrue =   (_rule, flow) =>  { return flow.find((rule) => rule.RuleID === _rule.IDifTrue.toString())};
const  getNextRuleIfFalse = (_rule, flow) =>  { return flow.find((rule) => rule.RuleID === _rule.IDifFalse.toString())};
