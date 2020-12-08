import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('Callback when creating a new blog has right info', () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} />
        )

        const authorInput = component.container.querySelector('#author')
        const titleInput = component.container.querySelector('#title')
        const urlInput = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(authorInput, {
            target: { 
                value: 'author' 
            }
        })

        fireEvent.change(titleInput, {
            target: {
                value: 'title' 
            }
        })

        fireEvent.change(urlInput, {
            target: { 
                value: 'url' 
            }
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls[0][0].author).toBe('author')
        expect(createBlog.mock.calls[0][0].title).toBe('title')
        expect(createBlog.mock.calls[0][0].url).toBe('url')
    })
})