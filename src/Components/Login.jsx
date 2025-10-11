import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){

     const [formValidation,setFormValidation] = useState({
        emailErr: "",
        passwordErr: "" 
    })
    const navigate = useNavigate();

    const [response,setResponse] = useState("");

   

    const [formData,setFormData] = useState({
        email : "",
        password : ""
    })

   

    function handleChange(e){
        setFormData(prevFormData => {
            return{
            ...prevFormData,
            [e.target.name] : e.target.value
            }
        })

    
    }

   


    function handleSubmit(e){

        if(formData.email === "" || !formData.email.includes("@")){
            setFormValidation(
                   { emailErr : "Email is invalid"}
            )
        }else if(formData.password === "" || formData.password < 8){
             setFormValidation({
                    passwordErr : "Password is invalid"
                }
            )

           
       
        }else{
             axios.post(
            "http://localhost:8081/user/api/login",
            {
              
                "email" : formData.email,
                "password" : formData.password
            }
        
        ).then(res => {
            setResponse("");
            localStorage.setItem("jwt-token",res.data);
            localStorage.setItem("loggedInUser",formData.email); 
            navigate("/project")
            


        }).catch(err => {
            setResponse(err.response.data);
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("loggedInUser")
        })

    }
       

    }

    


    return(
        <div className="container">
            <div className="card">
                <header className="header">
                    <h2>TASKIFY</h2>
                    <h3>Login in to continue</h3>
                    <span>{response}</span>
                </header>
                <main className="main">
                    
                    
                     <div className="input-field">
                    <label for="email" className="form-label">email
                         <span className="required"> * </span>
                    </label>
                    <input id= "email" onChange={handleChange} name="email" type="text" className="input-text"></input>
                    <span className="error">{formValidation.emailErr}</span>
                     </div>
                     <div className="input-field">
                    <label for="password" className="form-label">password
                         <span className="required"> * </span>
                    </label>
                    <input id= "password" onChange={handleChange} name="password" type="password" className="input-text"></input>
                    <span className="error">{formValidation.passwordErr}</span>
                     </div>
      
                    <div className="login-option">
                        <span>Can't log in? |</span>
                        <a href="/signup"> Create an account</a>
                    </div>
                    <button id="signup" onClick={handleSubmit} className="signup-btn" type="submit">Log in</button>
                </main>
            </div>

        </div>
    )
}



export default Login;