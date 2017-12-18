const parseJsonInput = (json) =>
{
    try {
       return JSON.parse(json);
    } catch (e) {
       return 'not-valid';
    }
}
   
  export default parseJsonInput;