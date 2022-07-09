import Search from './Search'
import HomeSlider from './HomeSlider'
import HomeAdvantage from './HomeAdvantage'
import HomeBenefits from './HomeBenefits'
import HomeSpecialist from './HomeSpecialist'
import HomeReviews from './HomeReviews'


function Body() {
  return (
    <div className="homepage main" id="content">
        <div className="page home-page">
            <div className="page_content">
                <Search />
                <HomeSlider />
                <HomeAdvantage />
                <HomeBenefits />
                <HomeSpecialist />
                <HomeReviews />

            </div>
        </div>
    </div>
  );
}

export default Body;
