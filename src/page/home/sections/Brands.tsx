import InfinityScroll from "./InfinityScroll";

const Brands = () => {
  return (
    <div className="w-full flex min-h-125 flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-5 mb-16 ">
        <p className="font-extrabold uppercase px-5 py-1 border-2 border-[#f97316] rounded-full">
          Brands Collaborations
        </p>
        <div>
          <h1 className="text-5xl font-semibold">Brands that trust us</h1>
        </div>
        <div className="container w-full border-t border-b mt-10  border-t-[#f97316] border-b-[#f97316]">
          <InfinityScroll />
        </div>
      </div>
    </div>
  );
};

export default Brands;
