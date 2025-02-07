import { useState } from "react";

const AddNewBlog = ({ onAdd }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newBlog.title} // Controlled input
          onChange={handleChange}
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={newBlog.author} // Controlled input
          onChange={handleChange}
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={newBlog.url} // Controlled input
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddNewBlog;
