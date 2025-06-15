import { GrDocumentText } from "react-icons/gr";
import { LuShare2 } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: (id: string) => void;
}

const Card = ({ id, title, type, link, onDelete }: CardProps) => {
  const handleDelete = async () => {
    await onDelete(id);
  };

  return (
    <div className="bg-white rounded-md shadow-md border border-gray-200 max-w-80 min-h-48 overflow-y-scroll max-h-64 min-w-80 p-4">
      {/* header section */}
      <div className="flex justify-between">
        <div className="flex gap-1 items-center text-md text-gray-500 hover:text-gray-800">
          <GrDocumentText />
          {title}
        </div>
        <div className="flex gap-1 items-center text-md text-gray-500 text-xl">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <LuShare2 className="hover:text-gray-800" />
          </a>
          <RiDeleteBin6Line
            onClick={handleDelete}
            className="hover:text-gray-800 cursor-pointer"
          />
        </div>
      </div>

      {/* content section */}
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Card;
