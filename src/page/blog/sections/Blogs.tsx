import BlogCard from "./BlogCard";

const Blogs = () => {
  const details = [
    {
      id: 1,
      image:
        "https://cdn.shopify.com/s/files/1/0771/9691/9043/files/image_120e660b-b380-44c2-a200-344c235d9afb.jpg?v=1771919109",
      title: "Traditions That Shape Our Identity",
      desc: "Discover the customs and traditions passed down through generations. These cultural practices define our identity, values, and the way our community lives and celebrates life.",
    },
    {
      id: 2,
      image:
        "https://cdn.shopify.com/s/files/1/0771/9691/9043/files/12964.jpg?v=1771855600",
      title: "Art, Craft, and Timeless Creativity",
      desc: "Explore the artistic expressions of our culture — from traditional crafts to modern interpretations — reflecting the creativity, skills, and stories of our people.",
    },
    {
      id: 3,
      video:
        "https://cdn.shopify.com/videos/c/o/v/e8d8d83a8fdf439c89454f9b2807e992.mp4",
      title: "Life Through Culture and Community",
      desc: "Experience everyday life through the lens of culture. This visual journey captures the rhythm, unity, and spirit of the community that keeps traditions alive.",
    },
    {
      id: 4,
      video:
        "https://cdn.shopify.com/videos/c/o/v/172d7f0777a94aeebd0b3560f1a1eaef.mp4",
      title: "Stories Rooted in Heritage",
      desc: "Every place has a story. Dive into narratives rooted in heritage, history, and shared memories that continue to inspire future generations.",
    },
    {
      id: 5,
      video:
        "https://cdn.shopify.com/videos/c/o/v/877622c06c944546b6f4d13ee4317541.mp4",
      title: "Stories Rooted in Heritage",
      desc: "Every place has a story. Dive into narratives rooted in heritage, history, and shared memories that continue to inspire future generations.",
    },
    {
      id: 6,
      image:
        "https://cdn.shopify.com/s/files/1/0771/9691/9043/files/pexels-themeditators-23266987.jpg?v=1772254971",
      title: "Stories Rooted in Heritage",
      desc: "Every place has a story. Dive into narratives rooted in heritage, history, and shared memories that continue to inspire future generations.",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      {details.map((items) => (
        <BlogCard
          key={items.id}
          title={items.title}
          desc={items.desc}
          image={items.image}
          video={items.video}
        />
      ))}
    </div>
  );
};

export default Blogs;
