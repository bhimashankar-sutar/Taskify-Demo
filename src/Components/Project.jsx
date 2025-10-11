import { useState } from 'react';
import './style/Project.css';
import axios from 'axios';
const Project = () =>{

    const [projectForm,setProjectForm] = useState({name:'',key:''});
    const [formValid,setFormValid] = useState({nameErr:'', keyErr:''});


    function handleChange(e){
        // setProjectForm(currProjectForm => {
        //     return{
        //         ...currProjectForm,
        //         [e.target.name] : e.target.value
        //     }
        // });
        if(e.target.name === "name"){
            if(e.target.value === " " || e.target.value.length < 2){
                setFormValid({
                    nameErr : "Invalid Project Name"
                })
            }else{
                setProjectForm({
                name : e.target.value.trim(),
                key : generateKey(e.target.value)
            })
            setFormValid({
                    nameErr : ''
                })

            }
            
        }
        if(e.target.name === "key"){
            setProjectForm(
                {
                    name : projectForm.name,
                    key : e.target.value
                }
            )
        }
    }

    function  generateKey(projectName){
        const split = projectName.split(" ");
        let key = "";
        for(let i=0;i<split.length;i++){
            key += split[i].charAt(0);
        }
        return key.toUpperCase();

    }

    function handleOnSubmit(e){
        e.target.classList.add("active");
        const token = localStorage.getItem("jwt-token");
        if(projectForm.name === '' || projectForm.name.length < 3){
            setFormValid({
                nameErr : "Invalid project name"
            });
             e.target.classList.remove("active");
        }else if(projectForm.key === '' || projectForm.key.length < 2){
            setFormValid({
                keyErr : "key should be 2 or more characters"
            });
             e.target.classList.remove("active");
        }else{

            axios.get(
                "http://localhost:8081/project/api/"+projectForm.key,
                {
                    headers:{
                        Authorization : "Bearer "+token
                    }
                }

            ).then(res =>
            {
                if(res.data === false){
                    setFormValid({
                        keyErr: "Key is already present."
                    });
                     e.target.classList.remove("active");
                }else{
                    axios.post(
                        "http://localhost:8081/project/api/create",
                       {
                            "projectName" : projectForm.name,
                            "projectKey" : projectForm.key
                        },
                        {
                            headers:{
                               
                                    Authorization : "Bearer "+token
    
                            }
                          
                        }
                         
                    ).then(res => {
                        console.log(res);
                        
                    }).catch(err => {
                        if(err.status === 403){
                             window.location.href = "http://localhost:3000/login"
                        }
        

                    })
                }
            }
            ).catch(err => {
                console.log(err);
            })
                
            
        

        }
        
    }
    return (
        <div className="project-container">
            <div className="project-card">
                <header className='project-header'>
                    <h3>Create a project</h3>
                </header>
                <main>
                    <div className='input-field'>
                        <label className='form-label'> Name</label>
                        <input type='text' id='name' onChange={handleChange} className='input-text' name='name' placeholder='Enter the project name'></input>
                        <span className='error'>{formValid.nameErr}</span>
        
                    </div>
                    <div className='input-field'>
                        <label className='form-label'>Key</label> <br/>
                        <input type='text' id='key' onChange={handleChange} className='project-key' name='key' value={projectForm.key}></input>
                        <img src='infomation.jpg' className='key-info' width="20px" height="20px" alt='info' title='The key is autogenrated'></img>
                        <span className='error'>{formValid.keyErr}</span>
                    </div>
                    <div >
                        <button className='project-create-btn' onClick={handleOnSubmit}>create</button>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Project;