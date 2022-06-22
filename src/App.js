import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Search from './components/Search'
import HomeSlider from './components/HomeSlider'
import HomeAdvantage from './components/HomeAdvantage'
import HomeBenefits from './components/HomeBenefits'
import HomeSpecialist from './components/HomeSpecialist'
import HomeReviews from './components/HomeReviews'
import Footer from './components/Footer'
import CopyRight from './components/CopyRight'




function App() {
  return (
    <div>
      <NavBar />
      <Search />
      <HomeSlider />
      <HomeAdvantage />
      <HomeBenefits />
      <HomeSpecialist />
      <HomeReviews />
      <Footer />
      <CopyRight />
    </div>
  );
}

export default App;
