import React from 'react'
import StorageIcon from "@material-ui/icons/Storage"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import FolderOpenIcon from "@material-ui/icons/FolderOpen"
import "./Mainbody.css"
function Mainbody(){
return(
    <div className="mainbody">
        <div className="mainbody_top">
            <div className="mainbody_top_left" style={{fontSize:"16px",fontSize:"500"}}>
                Recent Forms
            </div>
            <div className="mainbody_top_right">
                <div className="mainbody_top_center" style={{fontSize:"14px",marginRight:"125px"}}> 
                    Any Author
                    <ArrowDropDownIcon />

                    <button><StorageIcon style={{fontSize:'16px',color:"black"}}/></button>
                    <button><FolderOpenIcon style={{fontSize:'16px',color:"black"}}/></button>
                
                </div>
            </div>
        </div>
        <div className="mainbody_docs">
        
        </div>
    </div>
    
)
}

export default Mainbody;