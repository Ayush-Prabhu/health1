
import Navigation from './Navigation';
import Footer from './Footer';

import './App.css';
import SurveyForm from './SurveyForm';
import Header from './Header';
import Mainbody from './Mainbody';
import Template from "./Template";
function App({person}) {
  return (
    <div className="App">
      <Navigation />
      {/*<SurveyForm />*/}
      <Header />
      <Template />
      <Mainbody />
      <Footer />
    </div>
  );
}




export default App;
