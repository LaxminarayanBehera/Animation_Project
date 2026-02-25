import Card from "./Card";

const CardDetails = () => {
  const details = [
    {
      id: 1,
      image:
        "https://cdn.shopify.com/s/files/1/0771/9691/9043/files/image_120e660b-b380-44c2-a200-344c235d9afb.jpg?v=1771919109",
      title: " House cleaning",
      desc: " Our house cleaning services are designed to keep your home tidy, and healthy. We take care of all the essential cleaning tasks, from dusting.",
    },
    {
      id: 2,
      image: "",
      title: "Deep Cleaning",
      desc: "For those times when your home needs more than just a surface clean, our deep cleaning service offers a thorough, detailed approach.",
    },
    {
      id: 3,
      image: "",
      title: "Commercial Cleaning",
      desc: "For those times when your home needs more than just a surface clean, our deep cleaning service offers a thorough, detailed approach.",
    },
    {
      id: 4,
      image: "",
      title: "Cleaning",
      desc: "For those times when your home needs more than just a surface clean, our deep cleaning service offers a thorough, detailed approach.",
    },
  ];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      {details.map((items, index) => (
        <Card
          key={index}
          title={items.title}
          desc={items.desc}
          image={items.image}
        />
      ))}
    </div>
  );
};

export default CardDetails;
