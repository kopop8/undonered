import * as ctx from '../../../../quasar.conf.js'
describe('Prepping', function () {
  it('clear DB', function () {
    cy.clearDb()
  })
})
describe('Register', function () {
  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'user/register'
    }).as('register')
    cy.visit('/#/register')
  })
  it('Wrong Register', function () {
    cy.get('[data-cy="email"]')
    cy.get('[data-cy="register"]').click()
    cy.get('.text-negative').should('be.visible')
    cy.url().should('include', '/register')
  })
  it('Wrong Register 2', function () {
    cy.get('[data-cy="email"]').click()
    cy.get('[data-cy="password"]').click()
    cy.get('.text-negative').should('be.visible')
    cy.url().should('include', '/register')
  })
  it('Register (Not repeated password)', function () {
    cy.get('[data-cy="email"]').type('dwa@dwa.nl')
    cy.get('[data-cy="firstname"]').type('dwa')
    cy.get('[data-cy="lastname"]').type('dwa')
    cy.get('[data-cy="password"]').type('dwa')
    cy.get('[data-cy="passwordrepeat"]').type('dwa2')
    cy.get('[data-cy="register"]').click()
    cy.get('.text-negative').should('be.visible')
    cy.url().should('include', '/register')
  })
  it('Register', function () {
    // time 1
    cy.get('[data-cy="email"]').type('dwa@dwa.nl')
    cy.get('[data-cy="firstname"]').type('dwa')
    cy.get('[data-cy="lastname"]').type('dwa')
    cy.get('[data-cy="password"]').type('dwa')
    cy.get('[data-cy="passwordrepeat"]').type('dwa')
    cy.get('[data-cy="register"]').click()
    cy.wait('@register').then((xhr) => {
      expect(xhr.status).to.eq(201)
    })
    cy.url().should('include', '/')
  })
  it('Register 2 times with the same stuff', function () {
    // time 2
    cy.get('[data-cy="email"]').type('dwa@dwa.nl')
    cy.get('[data-cy="firstname"]').type('dwa')
    cy.get('[data-cy="lastname"]').type('dwa')
    cy.get('[data-cy="password"]').type('dwa')
    cy.get('[data-cy="passwordrepeat"]').type('dwa')
    cy.get('[data-cy="register"]').click()
    cy.wait('@register').then((xhr) => {
      expect(xhr.status).to.eq(409)
    })
    cy.url().should('include', '/register')
  })
  it('Go to login', function () {
    cy.get('[data-cy="login"]').click()
    cy.url().should('include', '/login') // => true
  })
})

describe('login', function () {
  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'user/login'
    }).as('login')
    cy.visit('/#/login')
  })
  it('Wrong login', function () {
    cy.get('[data-cy="email"]').type('hallo')
    cy.get('[data-cy="password"]').type('hallo')
    cy.get('[data-cy="login"]').click()
    cy.wait('@login').then((xhr) => {
      expect(xhr.status).to.eq(404)
    })
    cy.url().should('include', '/login')
  })
  it('Wrong login empty', function () {
    cy.get('[data-cy="login"]').click()
    cy.get('.text-negative').should('be.visible')
    cy.url().should('include', '/login')
  })
  it('Login', function () {
    cy.get('[data-cy="email"]').type('dwa@dwa.nl')
    cy.get('[data-cy="password"]').type('dwa')
    cy.get('[data-cy="login"]').click()
    cy.wait('@login').then((xhr) => {
      expect(xhr.status).to.eq(201)
    })
    cy.url().should('include', '/')
  })
})

describe('Restaurants', function () {
  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'user/login'
    }).as('login')

    cy.visit('/')
    cy.get('[data-cy="email"]').type('dwa@dwa.nl')
    cy.get('[data-cy="password"]').type('dwa')
    cy.get('[data-cy="login"]').click()
    cy.wait('@login').then((xhr) => {
      expect(xhr.status).to.eq(201)
    })

    cy.url().should('include', '/')
  }
  )
  it('Go to restaurant', function () {
    cy.route('GET', '/restaurants*', 'fixture:restaurants').as('restaurants')
    cy.wait('@restaurants').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
    cy.route('GET', '/reviews/*', 'fixture:reviews').as('reviews')
    cy.get('[data-cy="restaurant:0"]').click()
    cy.url().should('include', '/detail')
    cy.wait('@reviews').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
  })
  it('Go to restaurant MAPS', function () {
    cy.route('GET', '/restaurants*', 'fixture:restaurants').as('restaurants')
    cy.wait('@restaurants').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
    cy.get('[data-cy="restaurant:0"]').click()
    cy.url().should('include', '/detail')
    cy.get('[data-cy="maps"]').click()

  })
  it('Go to all', function () {
    cy.route('GET', '/restaurants*', 'fixture:restaurants').as('restaurants')
    cy.get('[data-cy="all"]').click()
    cy.wait('@restaurants').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
    cy.get('[data-cy="radius"]').should('not.exist')
  })
  // it('Change radius', function () {
  //   // check if its kept changed
  //   cy.get('[data-cy="radius"]').trigger('mousemove', { which: 1, pageY: 600 })
  //   cy.wait('@restaurants').then((xhr) => {
  //     expect(xhr.status).to.eq(200)
  //   })
  // })
  it('Search empty', function () {
    cy.get('[data-cy="search-input"]').type('dwkla;dwka;ldkwal;da')
    cy.get('[data-cy="empty-restaurants"]').should('be.visible')
    cy.get('[data-cy="restaurant:0"]').should('not.exist')
  })
  it('Search for 1', function () {
    // check if its kept changed
    cy.get('[data-cy="search-input"]').type('Ayf Kebap')
    // cy.get('[data-cy="restaurant:0"]').should('be.visible')
  })
  it('Change sort', function () {
    // check if its kept changed
    cy.get('[data-cy="sort"]').click()
    cy.get('[data-cy="sort-most"]').click()
  })
})

describe('Reviews', function () {
  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'user/login'
    }).as('login')

    cy.visit('/')
    cy.get('[data-cy="email"]').type('dwa@dwa.nl')
    cy.get('[data-cy="password"]').type('dwa')
    cy.get('[data-cy="login"]').click()
    cy.wait('@login').then((xhr) => {
      expect(xhr.status).to.eq(201)
    })
    cy.url().should('include', '/')
  }
  )

  it('Post to review', function () {
    cy.route('POST', '/reviews*', 'fixture:review').as('review')
    cy.route('GET', '/restaurants*', 'fixture:restaurants').as('restaurants')
    cy.get('[data-cy="review"]').click()

    cy.url().should('include', '/review') // => true
    cy.get('[data-cy="review-input"]').type('Was lekker (Test)')
    cy.get('[data-cy="review-post"]').click()
    cy.wait('@review').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
    cy.url().should('include', '/')
    cy.route('GET', '/restaurants*', 'fixture:restaurants').as('restaurants')

    cy.wait('@restaurants').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
  })
})

describe('Profile', function () {
  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'PUT',
      url: 'user'
    }).as('change')
    cy.route({
      method: 'POST',
      url: 'user/login'
    }).as('login')
    cy.route('GET', '/restaurants*', 'fixture:restaurants').as('restaurants')
    cy.visit('/')
    cy.get('[data-cy="email"]').type('dwa@dwa.nl')
    cy.get('[data-cy="password"]').type('dwa')
    cy.get('[data-cy="login"]').click()
    cy.wait('@login').then((xhr) => {
      expect(xhr.status).to.eq(201)
    })

    cy.wait('@restaurants').then((xhr) => {
      expect(xhr.status).to.eq(200)
    })
    cy.url().should('include', '/')
    cy.get('[data-cy="profile"]').click()
    cy.url().should('include', '/#/profile')
  }
  )
  it('Change profile info', function () {
    cy.get('[data-cy="change-info"]').click()
    cy.get('[data-cy="profile-firstname"]').type('chicken')
    cy.get('[data-cy="profile-lastname"]').type('chicken')
    cy.get('[data-cy="save"]').click()
    cy.wait('@change').then((xhr) => {
      expect(xhr.status).to.eq(202)
    })
  })
  it('Logout', function () {
    cy.get('[data-cy="logout"]').click()
    cy.url().should('include', '/login') // => true
  })
})
