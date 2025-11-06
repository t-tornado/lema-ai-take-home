import { mount } from 'cypress/react';
import { App } from '../app';

describe('App', () => {
  it('should render', () => {
    mount(<App />);
    cy.get('h1').should('exist');
  });
});
