import React from 'react'
import "./Header.css"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import Avatar from "@material-ui/core/Avatar"
import profileImage from "./profileImage.png"
function Header(){
    return(
        <div className="header">
        <div className="header_info">
            <button>
            <MenuIcon />
            </button>
            <div className="info">
                Surveys
            </div>
        </div>
        <div className="header_search">
        <button id="searchButton">
            <SearchIcon />
            
            </button>
            <input type="text" name="search" className='searchBox' placeholder='Search'></input>
        </div>
        <div className="header_right">
            <button>
                <Avatar src={profileImage} />
            </button>
        </div>
        </div>
    )
}

export default Header;