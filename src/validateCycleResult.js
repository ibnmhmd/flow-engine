export default (result) => {
     console.log(result)
    if('cyclic' === result)
    {
        return true;
    }else
    {
        return false;
    }
}