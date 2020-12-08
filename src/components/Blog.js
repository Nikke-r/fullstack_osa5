import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const styles = {
    border: 'solid',
    margin: 10,
    padding: 5,
  }

  return(
    <div style={styles} className='blog' id='blog'>
      <div>
        {blog.title} {blog.author}
        <button id='view-details-btn' className='details' onClick={toggleVisibility}> {showDetails ? 'Hide' : 'View'} </button>
      </div>
      {showDetails && (
        <div>
          <div>
            URL: {blog.url}
          </div>
          <div>
            Likes: {blog.likes}
            <button id='like-btn' onClick={() => handleLike(blog)} >like</button>
          </div>
          {blog.user !== null && blog.user !== undefined && blog.user.username ?
            <div>
            User: {blog.user.username}
            </div>
            :
            null}
          {blog.user.id === user.id && (
            <button id='remove-blog-btn' onClick={() => handleRemove(blog.id)}>Remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog
