import React from "react";
import './style/navstyle.css';
function Navbar(){
    return(
        <>
        <nav>
            <div className="nav-items-left">
                <h4 className="item">Taskify</h4>
                <h6 className="item">Projects</h6>
                <h6 className="item">People</h6>
                <button  className="item-create"type="button">Create</button>
            </div>
            
        </nav>
        </>
        
    )
}

export default Navbar;
