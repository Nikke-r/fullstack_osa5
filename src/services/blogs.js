import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  try {

    const options = {
      headers: {
        Authorization: token,
      },
    }

    const response = await axios.post(baseUrl, blog, options)
    return response.data
  } catch (error) {
    console.log(`Error while creating a new blog: ${error.message}`)
  }
}

const likeBlog = async (blog) => {
  try {

    const modifiedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const response = await axios.put(`${baseUrl}/${blog.id}`, modifiedBlog)
    return response.data
  } catch (error) {
    console.log(`Error adding a like to a blog: ${error.message}`)
  }
}

const deleteBlog = async (id) => {
  try {
    const options = {
      headers: {
        Authorization: token,
      },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, options)
    return response.data
  } catch (error) {
    console.log(`Error deleting a blog: ${error.message}`)
  }
}

export default { getAll, setToken, createBlog, likeBlog, deleteBlog }