import React from 'react';
import { FiStar, FiSettings } from "react-icons/fi";
import { AiOutlineEye } from 'react-icons/ai';
import { IoMdFolderOpen } from "react-icons/io";
import ColorLensIcon from '@material-ui/icons/ColorLens';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import avatar from "./profileImage.png";
import "./FormHeader.css"


let title = "Survey";
let doc_name = "";

function FormHeader() {
    return (
        <div className="form_header">
            <div className='form_header_left'>
                <input type="text" placeholder="Untitled Survey" className='form_name' value={doc_name} />
                <IoMdFolderOpen className='form_header_icon' style={{ marginRight: "10px" }} />
                <FiStar className='form_header_icon' style={{ marginRight: "10px" }} />
                <span style={{ fontSize: "12px", fontWeight: "680" }}>Please save changes</span>
            </div>
            <div className='form_header_right'>
                <Button>
                    <ColorLensIcon fontSize="small" className="form_header_icon" />
                </Button>
                <Button>
                    <AiOutlineEye fontSize="small" className="form_header_icon" />
                </Button>
                <Button>
                    <FiSettings fontSize="small" className="form_header_icon" />
                </Button>
                <Button variant='contaner' color='primary' href='#contained-buttons'>
                    Send
                </Button>
                <Button>
                    <MoreVertIcon fontSize="small" className="form_header_icon" />
                </Button>
                <Button>
                    <Avatar alt="avatar" src={avatar} className="form_header_icon" />
                </Button>
            </div>
        </div>
    );
}

export default FormHeader;
