import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

const EditBlog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get("/blogs");
                const blog = res.data.find((b) => b._id === id);
                if (blog) {
                    setTitle(blog.title);
                    setContent(blog.content);
                } else {
                    alert("Blog not found");
                    navigate("/");
                }
            } catch (err) {
                alert("Failed to fetch blog");
            }
        };

        fetchBlog();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/blogs/${id}`, { title, content });
            navigate("/");
        } catch (err) {
            alert("Failed to update blog");
        }
    };

    return (
        <>

            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>



            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                <form
                    onSubmit={handleUpdate}
                    className="bg-white p-6 rounded shadow-lg w-full max-w-xl relative"
                    onClick={(e) => e.stopPropagation()} // Prevent click propagation to blur bg
                >

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
                        aria-label="Close"
                    >
                        &times;
                    </button>

                    <h2 className="text-2xl mb-4 font-semibold text-center">Edit Blog</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditBlog;
