    import { IoMdClose } from "react-icons/io";
    import Input from "./Input";
    import Button from "./Button";
    import { useRef, useState } from "react";
    import axios from "axios";
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

    const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter",
    };

    interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
    }

    const CreateContentModel = ({ open, onClose }: CreateContentModelProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    const addContent = async () => {
        const title=titleRef.current?.value
        const link=linkRef.current?.value
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            title,
            type
        },{
            headers:{
                "Authorization":localStorage.getItem("token")||""
            }
        })
        onClose()
    };

    if (!open) return null;

    return (
        <div className="absolute inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/30 backdrop-blur-sm p-4 sm:p-8">
        <div className="relative w-full max-w-2xl bg-white/30 border border-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-10 mt-10 sm:mt-20">
            {/* Close Button */}
            <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-900"
            >
            <IoMdClose />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Title *</label>
                <Input reference={titleRef} placeholder="Title" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Link *</label>
                <Input reference={linkRef} placeholder="Link" />
            </div>

            <div>
                <h2 className="text-base font-semibold text-gray-800 mb-2">Type</h2>
                <div className="flex flex-wrap gap-3">
                <Button
                    text="Youtube"
                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                    onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                    text="Twitter"
                    variant={type === ContentType.Twitter ? "primary" : "secondary"}
                    onClick={() => setType(ContentType.Twitter)}
                />
                </div>
            </div>

            <Button
                onClick={addContent}
                variant="primary"
                fullWidth={true}
                text="Submit"
            />
            </div>
        </div>
        </div>
    );
    };

    export default CreateContentModel;
