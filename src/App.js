import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

import Header from './Header';
import Mainbody from './Mainbody';
import Template from "./Template";
import FormHeader from './FormHeader';
import QuestionForm from './QuestionForm';
import SurveyForm from './SurveyForm';

function App() {
  return (
    <div className="App">
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
            <>
            <SurveyForm />
            
            </>
            } />
          <Route exact path="/" element={
            <>
              <Header />
              <Template />
              <Mainbody />
            </>
          } />
        </Routes>
      </Router>

      
      <Footer />
    </div>
  );
}

export default App;
