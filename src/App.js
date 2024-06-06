
import Navigation from './Navigation';
import Footer from './Footer';

import './App.css';
import SurveyForm from './SurveyForm';

function App({person}) {
  return (
    <div className="App">
      <Navigation />
      <SurveyForm />
      <Footer />
    </div>
  );
}




export default App;
