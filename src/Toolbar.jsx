import React, { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import './Toolbar.css'; // Import CSS for styling
//import PreviewScratchFormModal from './previews/PreviewScratchFormModal'; 
import PreviewScratchFormModal from './previews/PreviewScratchFormModal'; 
import { Button, Menu, MenuItem } from '@material-ui/core'; 
import SaveIcon from '@material-ui/icons/Save'
import { AiOutlineEye } from 'react-icons/ai';
import ProfileMenu from './ProfileMenu';

const Toolbar = ({questions}) => {
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to update last save time
  const handleSave = () => {
    setLastSaveTime(Date.now());
  };

  // Function to calculate time elapsed since last save
  const calculateTimeSaved = () => {
    if (lastSaveTime === null) {
      return 'No saves yet';
    } else {
      const timeDifference = Date.now() - lastSaveTime;
      return <TimeAgo date={Date.now() - timeDifference} />;
    }
  };

  useEffect(() => {
    let intervalId;

    if (lastSaveTime !== null) {
      // Update time every second
      intervalId = setInterval(() => {
        setLastSaveTime(prevTime => prevTime + 1000); // Increment time every second
      }, 1000);
    }

    // Clear interval on component unmount or when lastSaveTime becomes null
    return () => clearInterval(intervalId);
  }, [lastSaveTime]);

  // Function to open the preview modal
  const openPreviewModal = () => {
    setIsPreviewModalOpen(true);
  };

  // Function to close the preview modal
  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="toolbar">
      <div className='toolbar_left'>
        <div className="toolbar-item">
          {/* Dropdown for Tools */}
          <Button
            id="dropdown-tools"
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
          >
            Tools
          </Button>
          <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Item 1</MenuItem>
            <MenuItem onClick={handleClose}>Item 2</MenuItem>
            <MenuItem onClick={handleClose}>Item 3</MenuItem>
          </Menu>
        </div>
        </div>
        <div className='toolbar_mid'>
        <div className="toolbar-item">
          <span className="toolbar-label">Time Since Last Save:</span>
          <span className="toolbar-value">{calculateTimeSaved()}</span>
        </div>
        <div className="toolbar-item">
          <Button className="toolbar-button" onClick={handleSave} style={{backgroundColor:"#007BFF",alignItems:"center"}}>Save<SaveIcon /></Button>
        </div>
      </div>
      
      <div className='toolbar_right'>
        <div className="toolbar-item">
          <Button className="toolbar-button" onClick={openPreviewModal} variant='outlined'>Preview
          <AiOutlineEye fontSize="small" className="form_header_icon" /></Button>
        </div>
        <div className="toolbar-item">
          <Button className="toolbar-button" variant='contained' style={{backgroundColor:"#66BB6A"}}>Publish</Button>
        </div>
        {/*<div className="toolbar-item">
          <ProfileMenu />
        </div>*/}
      </div>
      <PreviewScratchFormModal questions={questions} show={isPreviewModalOpen} onHide={closePreviewModal} /> {/* Render the PreviewModal component */}
    </div>
  );
};

export default Toolbar;
