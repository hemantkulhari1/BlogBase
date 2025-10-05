import React, { useState, useEffect } from "react";
import API from "../api";
<<<<<<< HEAD
=======

>>>>>>> b7f1da0 (Fix API imports and add axios baseURL for deployment)
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    //get user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem("userId");
            const { data } = await API.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);
    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={blog.user.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <h1>You Haven't Created a blog</h1>
            )}
        </div>
    );
};

export default UserBlogs;