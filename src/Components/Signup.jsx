import React, { useState } from "react";
import './style/signup.css';
import axios from "axios";



function Signup(){

    const [formValidation,setFormValidation] = useState({
        nameErr: "",
        emailErr: "",
        passwordErr: "" 
    })

    const [response,setResponse] = useState("");

    const [checked,setChecked] = useState(false)

    const [formData,setFormData] = useState({
        name : "",
        email : "",
        password : ""
    })

    if(!checked){
        

    }

    function handleChange(e){
        setFormData(prevFormData => {
            return{
            ...prevFormData,
            [e.target.name] : e.target.value
            }
        })

    
    }

    function handleCheckbox(e){

        setChecked(!checked)
    }


    function handleSubmit(e){

        if(formData.name === "" || formData.name.length < 2){
            setFormValidation( {
                nameErr : "Name is required and should contains more then 2 characters."
            })
        }else if(formData.email === "" || !formData.email.includes("@")){
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
            "http://localhost:8081/user/api/sigup",
            {
               "name" : formData.name,
                "email" : formData.email,
                "password" : formData.password
            }
        
        ).then(res => {
            console.log(res.data);
            setResponse(res.data);

        }).catch(err => {
            console.log(err.response.data);
            setResponse(err.response.data);
        })

    }
       

    }

    


    return(
        <div className="container">
            <div className="card">
                <header className="header">
                    <h2>Taskify</h2>
                    <h3>Set you account details</h3>
                    <span>{response}</span>
                </header>
                <main className="main">
                    
                    <div className="input-field">
                        <label for="name" className="form-label">
                        Name
                         <span className="required"> * </span>
                    </label>
                    <input id= "name" onChange={handleChange} name="name" type="text" className="input-text" required></input>  
                    <span className="error">{formValidation.nameErr}</span>

                    </div>
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
      
                    <div className="declaration">
                        <input id="declaration" checked={checked} onChange={handleCheckbox} className="input-checkbox" type="checkbox"></input>
                        <label for="declaration" >By Signing up I accept the 
                            <span className="highlight"> Term of service</span> and aknowledge the
                            <span className="highlight"> Privary Policy</span> </label>
                    </div>
                    <div className="login-option">
                        <span>Already have account? |</span>
                        <a href="/login"> Login</a>
                    </div>
                    <button id="signup" disabled={!checked} onClick={handleSubmit} className="signup-btn" type="submit">Continue</button>
                </main>
            </div>

        </div>
    )
}

export default Signup;