import { GoArrowUpRight } from "react-icons/go";
import { TbMenu } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "./button/Button";

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { isMobile, isTab } = useScreenSize();
  const isSmallScreen = isMobile || isTab;

  const navItems = [
    { title: "HOME", link: "/" },
    { title: "ABOUT", link: "/about" },
    { title: "SERVICES", link: "/our-services", hasDropdown: true },
    { title: "PROJECTS", link: "/projects" },
    { title: "REVIEWS", link: "/reviews" },
    { title: "BLOG", link: "/blog" },
    { title: "CONTACT", link: "/contact-information" },
  ];

  return (
    <>
      <motion.nav
        ref={navbarRef}
        animate={{ y: visible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          scrolled || mobileOpen ? "" : "",
        )}
      >
        <div className="w-full mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-17.5">
            <div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer z-10"
            >
              <img src="./logo.png" alt="logo" className="h-12" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 bg-[#0d0d0d] border rounded-full px-4 py-2">
                {navItems.map((item, index) => {
                  if (item.hasDropdown) {
                    return (
                      <Fragment key={`nav-${index}`}>
                        <div
                          className="relative flex items-center"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Link
                            to={item.link}
                            className={clsx(
                              "px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                              open
                                ? "text-[#f97316] bg-white/5"
                                : "text-white hover:text-[#f97316]",
                            )}
                          >
                            {item.title}
                          </Link>
                        </div>
                      </Fragment>
                    );
                  }
                  return (
                    <Link
                      key={`nav-${index}`}
                      to={item.link}
                      className={clsx(
                        "px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                        location.pathname === item.link
                          ? "text-[#f97316] bg-white/5 border"
                          : "text-white hover:text-[#F58327] hover:bg-white/5",
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Button type="button" className="text-[#0a0a0a]">
                Get in touch
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="bg-[#242424] p-2 rounded-lg"
              >
                {mobileOpen ? (
                  <IoClose className="text-2xl text-white" />
                ) : (
                  <TbMenu className="text-2xl text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileOpen && isSmallScreen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden bg-[#0a0a0a] border-t border-white/10 lg:hidden"
            >
              <div className="flex flex-col items-center text-center px-4 py-4 gap-3 h-screen">
                {navItems.map((item, index) => {
                  return (
                    <Link
                      key={`mobile-nav-${index}`}
                      to={item.link}
                      className={clsx(
                        "w-full px-4 py-4 rounded-full text-sm md:text-base font-medium tracking-wide transition-all",
                        index === 0
                          ? "text-[#f97316] bg-white/5"
                          : "text-white hover:text-[#f97316] hover:bg-white/5",
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                  );
                })}

                {/* Mobile CTA */}
                <div className="w-full md:w-fit pt-4 pb-2">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full bg-[#f97316] uppercase text-[#0a0a0a] px-6 py-4 rounded-full font-semibold text-sm md:text-base tracking-wide shadow-lg flex items-center justify-center gap-2"
                  >
                    Get in touch
                    <GoArrowUpRight className="text-lg" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-17.5" />
    </>
  );
};

export default Navbar;
