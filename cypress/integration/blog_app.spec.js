describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            username: 'tester',
            name: 'Test Tester',
            password: 'test123'
        }

        cy.request('POST', 'http://localhost:3001/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login', function() {
        it('Succeeds with right credentials', function() {
            cy.get('#username').type('tester')
            cy.get('#password').type('test123')
            cy.get('#login-btn').click()

            cy.contains('Test Tester logged in.')
        })

        it('Fails with wrong credentials', function() {
            cy.get('#username').type('tester')
            cy.get('#password').type('wrondpass')
            cy.get('#login-btn').click()

            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'tester', password: 'test123' })
        })

        it('A blog can be created', function() {
            cy.get('#show-create-form').click()
            cy.get('#title').type('title')
            cy.get('#author').type('author')
            cy.get('#url').type('url')
            cy.get('#submit-blog-btn').click()

            cy.contains('title author')
        })

        it('Blog can be liked', function() {
            cy.get('#show-create-form').click()
            cy.get('#title').type('title')
            cy.get('#author').type('author')
            cy.get('#url').type('url')
            cy.get('#submit-blog-btn').click()

            cy.get('#view-details-btn').click()
            cy.get('#like-btn').click()

            cy.contains('Likes: 1')
        })

        it('User who has created the blog can delete it', function() {
            cy.get('#show-create-form').click()
            cy.get('#title').type('title')
            cy.get('#author').type('author')
            cy.get('#url').type('url')
            cy.get('#submit-blog-btn').click()

            cy.get('#view-details-btn').click()
            cy.get('#remove-blog-btn').click()

            cy.contains('Blog has been removed')
        })

        it('Blogs are ordered by likes', function() {
            cy.createBlog({ author: 'Author1', title: 'Title1', url: 'Url1', likes: 1 })
            cy.createBlog({ author: 'Author2', title: 'Title2', url: 'Url2', likes: 2 })
            cy.createBlog({ author: 'Author3', title: 'Title3', url: 'Url3', likes: 3 })

            cy.get('.blog').then(blogs => {
                cy.get('.details').then(buttons => {
                    cy.wrap(buttons[0]).click()
                    cy.wrap(buttons[1]).click()
                    cy.wrap(buttons[2]).click()

                    cy.wrap(blogs[0]).contains('Likes: 3')
                    cy.wrap(blogs[1]).contains('Likes: 2')
                    cy.wrap(blogs[2]).contains('Likes: 1')
                })
            })
        })
    })
})