import CardDetails from "../home/sections/CardDetails";
import Section1 from "./sections/Section1";

const AboutPage = () => {
  return (
    <>
      <Section1 />
      <div className="w-full p-10">
        <CardDetails />
      </div>
    </>
  );
};

export default AboutPage;
