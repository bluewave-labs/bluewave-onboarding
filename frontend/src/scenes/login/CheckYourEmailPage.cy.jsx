import React from 'react'
import CheckYourEmailPage from './CheckYourEmailPage'

describe('<CheckYourEmailPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CheckYourEmailPage />)
  })
})