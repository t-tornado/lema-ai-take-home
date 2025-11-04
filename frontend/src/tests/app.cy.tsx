import { mount } from 'cypress/react';
import App from '../App';

describe('App', () => {
  it('should render', () => {
    mount(<App />);
    cy.get('h1').should('have.text', 'Welcome to the lema assignment');
  });
});
