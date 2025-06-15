import { useState, useEffect } from "react";
import Button from "../components/Button";
import { FaPlus } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import { useContent } from "../Hooks/useContent";
import SideBar from "../components/SideBar";
import axios from "axios";
import Card from "../components/Card";
import {toast} from "react-hot-toast"
import CreateContentModel from "../components/CreateContentModel";
import { DiVim } from "react-icons/di";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh, setContents } = useContent();
  const [shareHash, setShareHash] = useState<string | null>(null);
  const [isShared, setIsShared] = useState(false);

  const fetchShareStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/brain/status`, {
        headers: {
          Authorization: token,
        },
      });
      setIsShared(res.data.share);
      if (res.data.share) {
        setShareHash(res.data.hash);
      }
    } catch (err) {
      console.error("Failed to fetch share status:", err);
    }
  };

  useEffect(() => {
    fetchShareStatus();
  }, []);

  const handleShareToggle = async () => {
    const token = localStorage.getItem("token") || "";

    if (isShared) {
      // If already shared, unshare
      try {
        await axios.post(
          `${BACKEND_URL}/api/v1/brain/share`,
          { share: false },
          {
            headers: { Authorization: token },
          }
        );
        setIsShared(false);
        setShareHash(null);
        toast.success("Brain sharing disabled.");
      } catch (err) {
        console.error("Error disabling share:", err);
      }
    } else {
      // If not shared, share
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/brain/share`,
          { share: true },
          {
            headers: { Authorization: token },
          }
        );
        const hash = response.data.hash;
        setIsShared(true);
        setShareHash(hash);
        const shareUrl = `http://localhost:5173/share/${hash}`;
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Brain shared! Link copied to clipboard.");
      } catch (error) {
        console.error("Error sharing brain:", error);
      }
    }
  };

  useEffect(() => {
    refresh();
  }, [modelOpen]);

  const handleDeleteCard = async (contentId: string) => {
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      data: { contentId },
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    setContents((prev: any) => prev.filter((card: any) => card._id !== contentId));
  };

  return (
    <div>
      <SideBar />
      <div className="p-8 ml-48 h-screen bg-gray-100">
        <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<FaPlus />}
          />
          <Button
            onClick={handleShareToggle}
            variant="secondary"
            text={isShared ? "Deactivate Link" : "Share brain"}
            startIcon={isShared? <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)] animate-pulse transition duration-300 ease-in-out"></div>:<LuShare2 />}
          />
        </div>
        <div className="flex flex-wrap gap-3 h-full mt-5">
          {contents?.length > 0 ? (
            contents.map(({ _id, type, link, title }) => (
              <Card
                key={_id}
                id={_id}
                type={type}
                title={title}
                link={link}
                onDelete={handleDeleteCard}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-2xl font-semibold text-gray-500">No Content Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
