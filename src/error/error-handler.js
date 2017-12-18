import React from 'react'; 
const Error = ({error, message}) => 
(
    <a className = 'btn btn-danger'>*{error}* {message}</a>
)

export default Error ;