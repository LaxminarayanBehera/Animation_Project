import { useContext } from "react";
import { MusicContext } from "../components/context/musicContext";


export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used inside MusicProvider");
  return context;
};