import { useEffect } from "react";
import { useLocation } from "react-router";
import { useScrollTo } from "../hooks/useScrollTo";

const ScrollToTop = () => {
  const location = useLocation();
  const { scrollToTop } = useScrollTo();

  useEffect(() => {
    scrollToTop(0.8);
  }, [location.pathname, scrollToTop]);

  return null;
};

export default ScrollToTop;
