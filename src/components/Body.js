import Search from './Search'
import HomeSlider from './HomeSlider'
import HomeAdvantage from './HomeAdvantage'
import HomeBenefits from './HomeBenefits'
import HomeSpecialist from './HomeSpecialist'
import HomeReviews from './HomeReviews'


function Body() {
  return (
    <div className="md:py-[30px] py-[25px]">
      <Search />
      <HomeSlider />
      <HomeAdvantage />
      <HomeBenefits />
      <HomeSpecialist />
      <HomeReviews />
    </div>
  );
}

export default Body;
