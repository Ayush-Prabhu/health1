import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

import Header from './Header';
import Mainbody from './Mainbody';
import Template from "./Template";
import FormHeader from './FormHeader';
import QuestionForm from './QuestionForm';
import SurveyForm from './SurveyForm';
import CatalogPage from './CatalogPage';
import ProfileSidebar from './ProfileSidebar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ImageInput from './ImageInput';
import StringToImage from './StringToImage';
import Split from './Grouping/Split';
import PublishModal from './publish/PublishModal';



function App() {

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };



  // useEffect(() => {
  //   const handleKeydown = (event) => {
  //     if (
  //       (event.ctrlKey && event.shiftKey && event.code === 'KeyI') ||
  //       (event.ctrlKey && event.shiftKey && event.code === 'KeyJ') ||
  //       (event.ctrlKey && event.code === 'KeyU') ||
  //       (event.ctrlKey && event.code === 'KeyS') ||
  //       (event.ctrlKey && event.code === 'KeyC') ||
  //       (event.ctrlKey && event.code === 'KeyX') ||
  //       (event.ctrlKey && event.code === 'KeyV') ||
  //       (event.ctrlKey && event.code === 'KeyA') ||
  //       (event.ctrlKey && event.code === 'KeyF') ||
  //       (event.ctrlKey && event.code === 'KeyP')
  //     ) {

  //       event.preventDefault();
  //     }
  //   };

  //   const handleRightClick = (event) => {
  //     event.preventDefault();
  //   };

  //   document.addEventListener('contextmenu', handleRightClick);
  //   document.addEventListener('keydown', handleKeydown);

  //   return () => {
  //     document.removeEventListener('contextmenu', handleRightClick);
  //     document.removeEventListener('keydown', handleKeydown);
  //   };
  // }, []);

  return (
    <div className="App light">
      <Navigation />



      <Router>
        <Routes>
          <Route exact path="/form/:id" element={
            <>
              <FormHeader />
              <QuestionForm />
            </>
          } />
          <Route exact path="/sampleform/:id" element={
            <div>
              <Split />

            </div>
          } />

          <Route exact path="/catalog/Specific" element={


            <><CatalogPage /></>


          }></Route>

          <Route exact path="/catalog/General" element={


            <><CatalogPage /></>


          }>

          </Route>

          <Route exact path="/" element={
            <>
              <Header />
              <Template />
              <Mainbody />
            </>
          } />
        </Routes>
      </Router>

      {/* <StringToImage base64String={prompt()}/> */}
      {/* <PublishModal /> */}
      <Footer />
    </div>

  );
}

export default App;



