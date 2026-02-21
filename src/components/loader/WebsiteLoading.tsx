import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/newLoader.json";

const WebsiteLoading = () => {
  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-[#0d0d0d]">
      <div className="w-62.5 h-62.5 flex items-center justify-center">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default WebsiteLoading;
