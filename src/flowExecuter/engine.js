
import moduleEngine from "../validateRulebody";

const Engine =(flow, json) => {
 try
 {
   return moduleEngine(flow.RuleBody)(json);
 }catch(_error)
 {
     return "can't process the request, please check the input object";
 }
  
}
export default Engine;