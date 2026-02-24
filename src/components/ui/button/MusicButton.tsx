import { useMusic } from "../../../hooks/useMusic";


export const MusicButton = () => {
  const { play, pause, playing } = useMusic();

  return (
    <button
      onClick={() => (playing ? pause() : play())}
      className=" bg-white text-black px-4 py-2 rounded-full shadow-lg z-50"
    >
      {playing ? "Mute 🔇" : "Play 🎵"}
    </button>
  );
};