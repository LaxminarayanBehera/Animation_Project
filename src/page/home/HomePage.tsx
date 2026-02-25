import BlogPage from "../blog/BlogPage";
import DrawSvg from "../svg/DrawSvg";
import SvgAnimation from "../svg/SvgAnimation";
import Banner from "./sections/Banner";
import Brands from "./sections/Brands";
import CardAnimation from "./sections/CardAnimation";
import ScrollAnimation from "./sections/ScrollAnimation";

const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <ScrollAnimation />
        <CardAnimation />
      </div>
      <div className="container mx-auto w-full  bg-[#0a0a0a] text-white flex justify-center items-center overflow-x-hidden">
        <Brands />
      </div>
      <DrawSvg />
      <BlogPage />
      <SvgAnimation />
    </>
  );
};

export default HomePage;
