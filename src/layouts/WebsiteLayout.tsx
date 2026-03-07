import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import { MusicButton } from "../components/ui/button/MusicButton";
import ScrollControl from "../hooks/ScrollControl";
import ScrollToTop from "../hooks/ScrollToTop";
import Footer from "../components/ui/Footer";
import FaqPage from "../page/faq/FaqPage";
import useSmoothScroll from "../hooks/use-smooth-scroll";

const WebsiteLayout = () => {
  const { getInstance } = useSmoothScroll({
    shouldEnableLenis: true,
    autoInit: true,
  });

  const location = useLocation();

  useEffect(() => {
    getInstance()?.scrollTo(0, { immediate: true });
  }, [location.pathname, getInstance]);

  return (
    <>
      <ScrollToTop />
      <header className="min-h-15 h-17.5 z-999 w-full">
        <Navbar />
      </header>

      <main className="w-full h-auto">
        <Outlet />
      </main>

      <footer className="w-full h-auto overflow-x-hidden">
        <FaqPage />
        <Footer />
      </footer>

      <div className="hidden md:flex">
        <ScrollControl />
      </div>
      <div className="fixed bottom-4 right-4">
        <MusicButton />
      </div>
    </>
  );
};

export default WebsiteLayout;
