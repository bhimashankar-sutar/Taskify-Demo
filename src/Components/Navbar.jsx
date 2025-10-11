import React from "react";
import './style/navstyle.css';
function Navbar(){
    return(
        <>
        <nav>
            <div className="nav-items-left">
                <div className="nav-item">
                    <h4 >Taskify</h4>
                </div>
                
                <div className="nav-item-link">
                    <h6 >Projects</h6>
                </div>
               
                <div className="nav-item-link">
                    <h6 >People</h6>
                </div>
                
                <div className="nav-item">
                     <button  type="button">Create</button>
                </div>
               
            </div>
            <div className="nav-items-right">
                <div className="nav-item">
                    <button>Logout</button>
                </div>
                
            </div>
            
        </nav>
        </>
        
    )
}

export default Navbar;
