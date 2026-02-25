import Button from "../../components/ui/button/Button";
import Blogs from "./sections/Blogs";

const BlogPage = () => {
  return (
    <div className="w-full h-auto">
      <div className="w-full grid grid-cols-2 p-10">
        <div className="w-full flex flex-col  gap-5">
          <p className="w-fit text-sm bg-[#f97316] uppercase  text-white px-4 py-1 rounded-full">
            Blogs
          </p>
          <h1 className="text-3xl font-semibold  text-white">
            Dive into our collection of engaging blog posts
          </h1>
        </div>
        <div className="w-full flex justify-end items-center">
          <Button>View All </Button>
        </div>
      </div>

      <div className="w-full flex justify-center items-center p-10">
        <Blogs />
      </div>
    </div>
  );
};

export default BlogPage;
