//Import libraries
import { useState, useEffect } from "react";
//Import services
import blogService from "./services/blogs";
import loginService from "./services/login";
//Import other files
import "./index.css";
//Import components
import LoginSignUp from "./components/LoginSignUp";
import Blog from "./components/Blog";
import AddNewBlog from "./components/AddBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    //Use this command to logout: window.localStorage.removeItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      // // Fetch blogs again after login to get latest data
      // const updatedBlogs = await blogService.getAll();
      // setBlogs(updatedBlogs);
    } catch (exception) {
      setIsError(true);
      setMessage("Username or password is incorrect!");
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 3000);
    }
  };

  const handleSignout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      };

      const returnedBlog = await blogService.create(newBlog);
      console.log(returnedBlog);
      // const updatedBlogs = await blogService.getAll();
      setBlogs((prevBlogs) => prevBlogs.concat(returnedBlog));

      setMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      );
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      setMessage("Error adding blog!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  if (user === null) {
    return (
      <LoginSignUp
        onSubmit={handleLogin}
        errorMessage={message}
        isError={isError}
        onChangeUsername={handleUsername}
        onChangePassword={handlePassword}
        username={username}
        password={password}
      />
    );
  }

  return (
    <div className="main">
      <h2 className="heading">My blogs</h2>
      <div className="user-info">
        <p className="user">{user.name} logged in!</p>
        <button onClick={handleSignout}>Sign out</button>
      </div>
      <Blog blogs={blogs} user={user} />
      <AddNewBlog onAdd={handleAddBlog} />
    </div>
  );
};

export default App;
