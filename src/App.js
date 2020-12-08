import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState({
    type: '',
    message: '',
  })
  const [blogs, setBlogs] = useState([])
  const [inputs, setInputs] = useState({})
  const [user, setUser] = useState(null)
  const createBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      const userFromStorage = JSON.parse(loggedInUser)
      blogService.setToken(userFromStorage.token)
      setUser(userFromStorage)
    }
  }, [])

  const handleInputs = (target) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: inputs.username,
        password: inputs.password,
      })

      if (user === undefined) {
        handleNotification('error', 'Wrong username or password')
        return
      }

      window.localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setInputs({})
    } catch (error) {
      handleNotification('error', error.message)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleSubmit = async (blog) => {
    try {
      const newBlog = await blogService.createBlog(blog)

      if (newBlog === undefined) {
        handleNotification('error', 'Error while adding a new blog. Please try again')
        return
      }

      setBlogs([...blogs, newBlog])
      setInputs({})
      handleNotification('success', `New blog ${blog.title} by ${blog.author} has been added!`)
      createBlogFormRef.current.toggleVisibility()
    } catch (error) {
      handleNotification('error', error.message)
    }
  }

  const handleNotification = (type, message) => {
    setNotification({ type, message })

    setTimeout(() => {
      setNotification({
        type: '',
        message: ''
      })
    }, 3000)
  }

  const handleLike = async (blog) => {
    try {
      const savedBlog = await blogService.likeBlog(blog)
      const copyOfBlogs = [...blogs]
      const blogIndex = copyOfBlogs.findIndex(blog => blog.id === savedBlog.id)
      copyOfBlogs[blogIndex].likes = copyOfBlogs[blogIndex].likes + 1
      setBlogs(copyOfBlogs.sort((a, b) => b.likes - a.likes))
    } catch (error) {
      handleNotification('error', error.message)
    }
  }

  const handleRemove = async (id) => {
    try {
      window.confirm('Are you sure you want to remove?')
      await blogService.deleteBlog(id)
      const blogsAfterDelete = blogs.filter(blog => blog.id !== id)
      const sortBlogs = blogsAfterDelete.sort((a, b) => b.likes - a.like)
      setBlogs(sortBlogs)
      handleNotification('success', 'Blog has been removed')
    } catch (error) {
      handleNotification('error', error.message)
    }
  }

  return (
    <div>
      {notification.type === 'error' ?
        <div>
          <p> {notification.message} </p>
        </div>
        :
        <div>
          <p> {notification.message} </p>
        </div>}
      {user !== null ?
        <>
          <h2>blogs</h2>
          <h4> {user.name} logged in. </h4>
          <button onClick={handleLogOut}>Logout</button>
          <Togglable buttonLabel="Create new blog" ref={createBlogFormRef}>
            <BlogForm
              createBlog={handleSubmit}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} handleRemove={handleRemove} />
          )}
        </>
        :
        <>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <input id='username' placeholder="Username" value={inputs.username} name="username" onChange={({ target }) => handleInputs(target)} />
            <input id='password' placeholder="Password" value={inputs.password} name="password" onChange={({ target }) => handleInputs(target)} type="password" />
            <input id='login-btn' type="submit" value="Login" />
          </form>
        </>}
    </div>
  )
}

export default App