import logo from './logo.svg';
import './App.css';
import './css/colorbox.css';
import './css/general-layout.css';
import './css/normalize.css';
import './css/reset.css';
import './css/slider.css';
import './css/redesign.css';
import './css/common.css';
import NavBar from './components/NavBar'
import Body from './components/Body'
import Footer from './components/Footer'
import CopyRight from './components/CopyRight'




function App() {
  return (
    <div>
      <NavBar />
      <Body />
      <Footer />
      <CopyRight />
    </div>
  );
}

export default App;
