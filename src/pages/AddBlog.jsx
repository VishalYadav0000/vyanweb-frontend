import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/blogs", { title, content });
            navigate("/");
        } catch (err) {
            alert("Failed to add blog");
        }
    };


    const handleClose = () => {
        navigate(-1);
    };

    return (
        <>

            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>


            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <form
                    onSubmit={handleSubmit}
                    className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl"
                >

                    <button
                        type="button"
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
                        aria-label="Close"
                    >
                        &times;
                    </button>

                    <h2 className="text-3xl font-semibold mb-6 text-gray-900">Add New Blog</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="w-full mb-6 p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBlog;
