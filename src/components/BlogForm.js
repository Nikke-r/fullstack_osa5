import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthor = target => {
    setAuthor(target.value)
  }

  const handleTitle = target => {
    setTitle(target.value)
  }

  const handleUrl = target => {
    setUrl(target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ author, url, title })
    setAuthor()
    setTitle()
    setUrl()
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <input id='title' name="title" placeholder="title" value={title} onChange={({ target }) => handleTitle(target)} />
        <input id='author' name="author" placeholder="author" value={author} onChange={({ target }) => handleAuthor(target)} />
        <input id='url' name="url" placeholder="url" value={url} onChange={({ target }) => handleUrl(target)} />
        <input id='submit-blog-btn' type="submit" value="Create" />
      </form>
    </div>
  )
}

export default BlogForm
