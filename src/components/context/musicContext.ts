import { createContext } from "react";

type MusicContextType = {
  play: () => void;
  pause: () => void;
  playing: boolean;
};

export const MusicContext = createContext<MusicContextType | null>(null);