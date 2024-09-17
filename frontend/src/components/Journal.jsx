import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

export default function Journal() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the back-end
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data); // Set the blogs in state
      } catch (error) {
        console.error("There was an error fetching the blogs!", error);
      }
    };

    fetchBlogs();
  }, []); // Empty array ensures the effect runs only once on mount

  return (
    <div className="container mt-4">
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{blog.category}</h6>
                <p className="card-text">{blog.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
