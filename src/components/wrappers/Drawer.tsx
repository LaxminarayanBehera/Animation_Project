import clsx from "clsx";
import {
  forwardRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IconButton, Drawer as MUIDrawer } from "@mui/material";
import { type DrawerProps as MUIDrawerProps } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
import useSmoothScroll from "../../hooks/use-smooth-scroll";

export interface DrawerRefType {
  open: () => void;
  close: () => void;
}
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  muiDrawerProps: Omit<MUIDrawerProps, "open"> | undefined;
  menu: ReactNode | undefined;
}

const Drawer = forwardRef(
  (
    {
      children,
      className,
      onClick,
      menu,
      muiDrawerProps,
      ...rest
    }: DrawerProps,
    ref,
  ) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    // const navigate = useNavigate();

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
      onClick?.(e);
    };
    const handleClose = () => {
      setOpenDrawer(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpenDrawer(true);
      },
      close: () => {
        handleClose();
        setOpenDrawer(false);
      },
    }));

    const { changeTarget, retrigger } = useSmoothScroll({});
    const paperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!paperRef?.current) return;
      if (openDrawer) {
        changeTarget(paperRef?.current);
      } else {
        retrigger();
      }
    }, [paperRef, changeTarget, retrigger, openDrawer]);

    return (
      <>
        {/* Mobile hamburger trigger */}
        <div
          {...rest}
          onClick={handleClick}
          className={clsx(
            className,
            `lg:hidden inline-flex items-center justify-center w-fit`,
          )}
        >
          {menu}
        </div>

        {/* Desktop nav content */}
        <div className="hidden lg:flex flex-row justify-center items-center flex-1 w-full h-full">
          {children}
        </div>

        <MUIDrawer
          {...muiDrawerProps}
          open={openDrawer}
          onClose={() => handleClose()}
          slotProps={{
            paper: {
              sx: {
                width: window.innerWidth,
                background: "transparent",
              },
              className: `flex flex-col justify-start items-center space-y-3 bg-transparent relative max-h-[100svh] overflow-hidden`,
            },
          }}
          transitionDuration={0}
        >
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.21, ease: "linear" }}
            className="w-full h-screen max-h-svh flex flex-col p-1 overflow-hidden"
          >
            <motion.section
              ref={paperRef}
              className="w-full h-screen max-h-svh overflow-auto rounded-3xl flex flex-col bg-[#0a0a0a] backdrop-blur-sm"
            >
              <div className="w-full py-2 px-6 h-fit flex justify-end items-center">
                <IconButton
                  sx={{
                    p: 0.5,
                    color: "white",
                    "&:hover": { color: "red" },
                  }}
                  onClick={() => handleClose()}
                >
                  <IoClose className="text-3xl" />
                </IconButton>
              </div>

              <div className="min-h-fit flex flex-col w-full px-5 py-4">
                {children}
              </div>
            </motion.section>
          </motion.section>
        </MUIDrawer>
      </>
    );
  },
);

Drawer.displayName = "Drawer";
export default Drawer;
