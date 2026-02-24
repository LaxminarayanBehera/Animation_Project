import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { MusicContext } from "./musicContext";

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const soundRef = useRef<Howl | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/music/dhurandhar.mp3"],
      loop: true,
      volume: 0.3,
      html5: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const play = () => {
    soundRef.current?.play();
    setPlaying(true);
  };

  const pause = () => {
    soundRef.current?.pause();
    setPlaying(false);
  };

  return (
    <MusicContext.Provider value={{ play, pause, playing }}>
      {children}
    </MusicContext.Provider>
  );
};
