import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mount } from 'cypress/react';
import { MemoryRouter, Route, Routes, type InitialEntry } from 'react-router-dom';
import { UsersPage } from '../features/users/pages/UsersPage';
import type { GetUsersCountApiResponse, GetUsersResponse, User } from '../features/users/types';

describe('<UsersPage />', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });

    queryClient.clear();
  });

  const mountComponent = () => {
    const initialEntries: InitialEntry[] = [{ pathname: '/users' }];

    mount(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route element={<UsersPage />} path="/users" />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  it('Page Renders', () => {
    const getUsersResponse: GetUsersResponse = {
      data: [],
    };

    const getUsersCountResponse: GetUsersCountApiResponse = {
      count: 0,
    };

    cy.intercept('GET', '**/users?*', { statusCode: 200, body: getUsersResponse }).as('getUsers');
    cy.intercept('GET', '**/users/count', { statusCode: 200, body: getUsersCountResponse }).as(
      'getUsersCount',
    );
    mountComponent();
    cy.wait(1000);
    cy.get('[data-testid=users-page-root]');
    it('Page Renders', () => {
      const getUsersResponse: GetUsersResponse = {
        data: [],
      };

      const getUsersCountResponse: GetUsersCountApiResponse = {
        count: 0,
      };

      cy.intercept('GET', '**/users?*', { statusCode: 200, body: getUsersResponse }).as('getUsers');
      cy.intercept('GET', '**/users/count', { statusCode: 200, body: getUsersCountResponse }).as(
        'getUsersCount',
      );
      mountComponent();
      cy.wait(1000);
      cy.get('[data-testid=users-page-root]');
      cy.get('[data-testid=users-table-root]');
    });
  });

  it('Shows loading row when loading', () => {
    cy.intercept('GET', '**/users?*', { statusCode: 200, delay: 100000 });
    cy.intercept('GET', '**/users/count', { statusCode: 200 });

    mountComponent();
    cy.wait(1000);
    cy.get('[data-testid=users-table-loading-row]');
  });

  it('Shows empty row when no data', () => {
    cy.intercept('GET', '**/users?*', { statusCode: 200, body: { data: [], totalUsers: 0 } });
    cy.intercept('GET', '**/users/count', { statusCode: 200, body: { count: 0 } });

    mountComponent();
    cy.wait(1000);
    cy.get('[data-testid=users-empty-row]');
  });

  it('Shows error row when error', () => {
    cy.intercept('GET', '**/users?*', { statusCode: 400 });
    cy.intercept('GET', '**/users/count', { statusCode: 500 });

    mountComponent();
    cy.wait(1000);
    cy.get('[data-testid=users-table-error-row]');
  });

  it('Shows user row when data', () => {
    const users: User[] = [
      {
        address: {
          id: '1',
          user_id: '1',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipcode: '12345',
        },
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      {
        address: {
          id: '2',
          user_id: '2',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipcode: '12345',
        },
        id: '2',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      {
        address: {
          id: '3',
          user_id: '3',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipcode: '12345',
        },
        id: '3',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    ];
    cy.intercept('GET', '**/users?*', { statusCode: 200, body: users });
    cy.intercept('GET', '**/users/count', { statusCode: 200, body: { count: 3 } });

    mountComponent();
    cy.wait(1000);
    cy.get('[data-testid=users-table-user-row]').should('have.length', 3);
  });

  it('Shows formatted user address in table cell', () => {
    const users: User[] = [
      {
        address: {
          id: '1',
          user_id: '1',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipcode: '12345',
        },
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    ];
    cy.intercept('GET', '**/users?*', { statusCode: 200, body: users });
    cy.intercept('GET', '**/users/count', { statusCode: 200, body: { count: 1 } });

    mountComponent();
    cy.wait(1000);
    cy.get('[data-testid=users-table-user-address-cell]').should(
      'have.text',
      '123 Main St, CA, Anytown, 12345',
    );
  });
});
