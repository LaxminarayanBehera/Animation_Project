const SecondBanner = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.shopify.com/videos/c/o/v/ba8c7b9ac1434fcfb217c205ecd8f2fe.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/30" />
      <h1 className="relative z-10 max-w-5xl px-6 text-center text-white text-5xl md:text-7xl font-semibold italic">
        Where vision meets what’s possible
      </h1>
    </div>
  );
};

export default SecondBanner;
