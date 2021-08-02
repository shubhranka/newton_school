import React,{ useState } from "react";
const LoginFrom = (props) => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    return (
    <div className="login__container">
        <div className="input__username">
            <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="username"/>
        </div>
        <div className="input__password">
            <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password"/>
        </div>
        <div className="input__button" onClick={()=>props.onClick(username,password)}>
        <div className="button">  Log In </div>
        </div>
    </div>);
};

export default LoginFrom;