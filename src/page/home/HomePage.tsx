import Banner from "./sections/Banner";
import CardAnimation from "./sections/CardAnimation";
import InfinityScroll from "./sections/InfinityScroll";
import ScrollAnimation from "./sections/ScrollAnimation";

const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <ScrollAnimation />
        <CardAnimation />
      </div>
      <div className="container  mx-auto w-full h-screen bg-[#0a0a0a] text-white flex justify-center items-center overflow-x-hidden">
        <InfinityScroll />
      </div>
    </>
  );
};

export default HomePage;
