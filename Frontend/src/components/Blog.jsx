const Blog = ({ blogs, user }) => {
  const filteredBlogs = blogs.filter(
    (blog) => blog.user.username === user.username
  );
  return filteredBlogs.map((blog) => {
    return (
      <div key={blog.id} className="blog">
        <li className="title">Title: {blog.title}</li>
        <p>Author: {blog.author}</p>
      </div>
    );
  });
};

export default Blog;
