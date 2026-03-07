import NewDraggableAnimation from "../svg/NewDraggableAnimation";
import PillAnimation from "../svg/PillAnimation";
import TextAnimation from "../svg/TextAnimation";
import ServicePage from "./sections/ServicePage";
import ServicePage2 from "./sections/ServicePage2";

const Page = () => {
  return (
    <div className="w-full h-screen min-h-fit overflow-hidden">
      <TextAnimation />
      <NewDraggableAnimation />
      <ServicePage />
      <ServicePage2 />
      <PillAnimation />
    </div>
  );
};

export default Page;
