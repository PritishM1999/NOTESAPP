import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {

    const [formData, setFormdata] = useState({
        email: "",
        password: "",
        // checkbox:""

    });
    // console.log(formData);

    const navigate = useNavigate();
    const GotoReg = () => {
        navigate("/register");
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        // navigate('/homepage')

        // console.log(`Submitted: ${email} - ${email}`);  
        // console.log(`Submitted: ${password} - ${password}`);


        const result = await fetch("http://localhost:5000/login",{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })
        console.log(formData);

        const userlogin = await result.json();
        console.log(userlogin);
        // console.log(userlogin.message);
        // console.log(userlogin.status);


        if(userlogin.status === 401){
            alert("User not found")
        }
        else if(userlogin.status === 400){
            alert("Password or Email doesn't match")
        }
        else if(userlogin.status === 200){
            localStorage.setItem('user', JSON.stringify({token:userlogin.token, user:userlogin.user}))
            console.log(JSON.parse(localStorage.getItem("user")).user?._id);
        
            // navigate('/homepage')
        }

    }


    let register = ">"
    return (
        <section className='myContainer'>
            <div>
            <br/>
            <h1>SIGN IN</h1>
            <div>
            <form>
                <input
                    id="email"
                    type="email"
                    placeholder="EMAIL"
                    value={formData.email}
                    // onChange = {handleChange}
                    onChange={(event)=>{setFormdata({...formData, email: event.target.value})}}
                    // onBlur={() => checkErrors("email")}
                    required={true}
                />
                <br/>
                <input
                    id="password"
                    type="password"
                    placeholder="PASSWORD"
                    value={formData.password}
                    onChange={(event)=>{setFormdata({...formData, password: event.target.value})}}
                    // onChange = {handleChange}
                    // onBlur={() => checkErrors("email")}
                    required={true}
                />
                <br/>
                <input id='checkbox' type="checkbox"></input>
                <label id='check'>Remember me</label>
            </form>
            <br/>
            <button type='submit' onClick={handleSignIn}>Submit</button>
            <br/>
            <label id="forgot">Forgot Password?</label>

            <br/>

            <label id='here'>Click here to register </label>
            
            <span id='regis' onClick={GotoReg}>{register}</span>
            </div>
        </div>
        </section>
    )
}

export default Login;