import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let handleLike
    let handleRemove

    beforeEach(() => {
        const blog = {
            title: 'title',
            author: 'author',
            url: 'url',
            likes: 0,
            user: {
                name: 'name'
            }
        }

        const user = {
            name: 'name'
        }

        handleLike = jest.fn()
        handleRemove = jest.fn()

        component = render(
            <Blog blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />
        )
    })

    test('Only author and title are shown at initial state', () => {
        expect(component.container).toHaveTextContent(
            'title'
        )

        expect(component.container).toHaveTextContent(
            'author'
        )

        expect(component.container).not.toHaveTextContent(
            'url'
        )

        expect(component.container).not.toHaveTextContent(
            0
        )
    })

    test('Url and likes are shown when the details are visible', () => {
        const showButton = component.getByText('View')
        fireEvent.click(showButton)

        expect(component.container).toHaveTextContent('url')
        expect(component.container).toHaveTextContent(0)
    })

    test('When like button is pressed twice handleLike is fired twice', () => {
        const showButton = component.getByText('View')
        fireEvent.click(showButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(handleLike.mock.calls).toHaveLength(2)
    })
})