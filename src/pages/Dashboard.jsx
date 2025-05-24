import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      alert("Failed to fetch blogs");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/blogs/${id}`);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } catch (err) {
        alert("Failed to delete blog");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:mb-0">
          Hello, <span className="text-indigo-600">{user?.name}</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition"
          >
            Add New Blog
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-20">
          No blogs yet. Start by creating one!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {blog.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {blog.content.length > 140
                    ? blog.content.slice(0, 140) + "..."
                    : blog.content}
                </p>
              </div>
              <footer className="flex justify-between px-6 py-4 bg-gray-100 rounded-b-xl">
                <button
                  onClick={() => navigate(`/edit/${blog._id}`)}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
