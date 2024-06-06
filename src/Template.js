import React from 'react'
import MorevertIcon from "@material-ui/icons/MoreVert"
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore"
import "./Template.css"
import blank from "./blank-survey.PNG"
import sample from "./SampleSurvey.png"

function Template(){
return(
    <div className='template_section'>
        <div className='template_top'>
            <div className='template_left'>
                <span style={{fontSize:"16px",color:"#202124"}}>Start New Form</span>
            </div>
            <div className='template_right'>
                <div className="gallery_button">
                    Template Gallery Button
                    <UnfoldMoreIcon />
                </div>
                <button><MorevertIcon /></button>
            </div>
            
        </div>
        <div className='template_body'>
            <div className='template_card'>
                <img src={blank} alt="blank" className='template_card_image' />
                <p className='template_card_title'>Blank</p>
            </div>
            <div className='template_card'>
                <img src={sample} alt="sample survey" className='template_card_image' />
                <p className='template_card_title'>Sample Survey</p>
            </div>
        </div>
        
    </div>
)
}

export default Template;