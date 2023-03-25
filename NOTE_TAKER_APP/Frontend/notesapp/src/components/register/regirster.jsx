import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'

const RegisterUser = () => {
    const navigate = useNavigate();

    const [formData, setForm] = useState({
        name: "",
        email: "",
        password: "",
        reppassword: "",
    });

    const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
    };
    


    const [err, setErr] = useState({
        name: { isValid: true, message: "" },
        email: { isValid: true, message: "" },
        password: { isValid: true, message: "" },
        reppassword: { isValid: true, message: "" },
    });

    

    const registerUser = async (event) => {
        // event.preventDefault();
        // navigate("/SignIn");
        console.log(userData);

        // const { name, email, password } = formData;
        // console.log(formData);
        // const requestBody = { name, email, password };
        // console.log(requestBody);

        if (formData.password !== formData.reppassword) {
            setErr({
                ...err,
                reppassword: {
                    isValid: false,
                    message: "Passwords do not match",
                },
            });
            return;
        }
   

        // console.log(userData);

        const result = await fetch("http://localhost:8081/api/v1/user/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)

        })


        const regUsr = await result.json();
        console.log(result.message);
        console.log(result.status);


        if(regUsr.status === 401){
            alert("User already exists");
          }
        else if(regUsr.status === 500) {
            alert("Check your details");
        }
        else if(regUsr.status === 201) {
            navigate('/');
            }        
        };

        const GotoLogin = () => {
            navigate("/login");
        };

        // const isValid = checkForm("all");
        // if (isValid) {
        //     console.log("User registered sucessfully");
        //     navigate("/SignIn");
        // } else {
        //     console.log("Please fix the errors and try again");
        // }
    // };

    const checkForm = (type) => {
        let isValid = true;
        switch (type) {
            case "name":
                if (formData.email.includes(Number)) {
                    setErr({
                        ...err,
                        email: {
                            isValid: false,
                            message: "Name should not contain numbers",
                        },
                    });
                    isValid = false;
                } else {
                    setErr({
                        ...err,
                        email: {
                            isValid: true,
                            message: "",
                        },
                    });
                }
                break;
            case "email":
                if (!formData.email.includes("@")) {
                    setErr({
                        ...err,
                        email: {
                            isValid: false,
                            message: "Email must have @ in before domain",
                        },
                    });
                    isValid = false;
                } else {
                    setErr({
                        ...err,
                        email: {
                            isValid: true,
                            message: "",
                        },
                    });
                }
                break;

            case "password":
                if (formData.password.length > 16 || formData.password.length < 6) {
                    setErr({
                        ...err,
                        password: {
                            isValid: false,
                            message: "Password must contain atleast 6 letters",
                        },
                    });
                    isValid = false;
                } else {
                    setErr({
                        ...err,
                        password: {
                            isValid: true,
                            message: "",
                        },
                    });
                }
                break;

            case "reppassword":
                if (formData.reppassword !== formData.password) {
                    setErr({
                        ...err,
                        reppassword: {
                            isValid: false,
                            message: "Passwords do not match",
                        },
                    });
                    isValid = false;
                } else {
                    setErr({
                        ...err,
                        reppassword: {
                            isValid: true,
                            message: "",
                        },
                    });
                }
                break;

            case "all":
                const emailCheck = checkForm("email");
                const passwordCheck = checkForm("password");
                const reppasswordCheck = checkForm("reppassword");
                isValid = emailCheck && passwordCheck && reppasswordCheck;
                break;

            default:
                break;
        }
        return isValid;
    };

    let back = "<";
    return (
        <div className='main-container'>
            <span id="back" onClick={GotoLogin}>{back}</span>
            <h1>SIGN UP</h1>
            <div>
                <form onSubmit={registerUser}>
                    <div className='contents'>
                        <input
                            id="name"
                            type="text"
                            placeholder="NAME"
                            value={formData.name}
                            onChange={(event) =>
                                setForm({ ...formData, name: event.target.value })
                            }
                            onBlur={() => checkForm("name")}
                            required={true}
                        />
                        {err.name.isValid ? null : (
                            <label className="error-label">{err.name.message}</label>
                        )}
                    </div>
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="EMAIL"
                            value={formData.email}
                            onChange={(event) =>
                                setForm({ ...formData, email: event.target.value })
                            }
                            onBlur={() => checkForm("email")}
                            required={true}
                        />
                        {err.email.isValid ? null : (
                            <label className="error-label">{err.email.message}</label>
                        )}
                    </div>
                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="PASSWORD"
                            value={formData.password}
                            onChange={(event) =>
                                setForm({ ...formData, password: event.target.value })
                            }
                            onBlur={() => checkForm("email")}
                            required={true}
                        />
                        {err.password.isValid ? null : (
                            <label className="error-label">{err.password.message}</label>
                        )}
                    </div>
                    <input
                        id="rep-password"
                        type="password"
                        placeholder="REPEAT PASSWORD"
                        value={formData.reppassword}
                        onChange={(event) =>
                            setForm({ ...formData, reppassword: event.target.value })
                        }
                        onBlur={() => checkForm('reppassword')}
                        required={true}
                    />
                    <br />
                    <br />
                    <input
                        id="check"
                        type="checkbox"
                        value={formData.reppassword}
                        // onChange={(event)=>{setFormData({...formData, email: event.target.value})}}
                        // onBlur={() => checkErrors("email")}
                        required={true}
                    />
                    
                    <label id='check'>I agree with <span>TEARMS & CONDITIONS</span></label>
                </form>
                <br />
                <button type='submit' onClick={registerUser}>CONTINUE</button>
            </div>
        </div>
    )
}

export default RegisterUser;