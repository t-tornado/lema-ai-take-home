import { mount } from 'cypress/react';
import { UserPostsPage } from '../features/users/pages/UserPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { GetUserByUserIdResponse, User } from '../features/users/types';

describe('<UserPostsPage />', () => {
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

  const mountComponent = (userId: string = '1', userInState?: User) => {
    mount(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[{ pathname: `/post/${userId}`, state: { user: userInState } }]}
        >
          <Routes>
            <Route element={<UserPostsPage />} path="/post/:userId" />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  it('shows loader while loading', () => {
    const userId = '1';

    cy.intercept('GET', `**/users/${userId}`, { delay: 100000 });
    cy.intercept('GET', `**/posts?userId=${userId}`, { delay: 5000 });

    mountComponent(userId);

    cy.wait(1000);
    cy.get('.lds-ellipsis').should('exist');
  });

  it('shows error when user is not found', () => {
    const userId = '1';

    cy.intercept('GET', `**/users/${userId}`, { statusCode: 404 }).as('getUser');
    cy.intercept('GET', `**/posts?userId=${userId}`, { statusCode: 404 }).as('getPosts');

    mountComponent(userId);

    cy.wait(1000);
    cy.get('[data-testid="data-error"]').should('exist');
  });

  it('shows user posts when user is found', () => {
    const userId = '1';
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        id: '1',
        user_id: '1',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipcode: '12345',
      },
    };
    const getUserResponse: GetUserByUserIdResponse = {
      data: user,
      status: 'success',
    };

    cy.intercept('GET', `**/users/${userId}`, { statusCode: 200, body: getUserResponse }).as(
      'getUser',
    );
    cy.intercept('GET', `**/posts?userId=${userId}`, { statusCode: 200, body: [] }).as('getPosts');

    mountComponent(userId);

    cy.wait(1000);
    cy.get('[data-testid="user-posts-header"]').should('exist');
  });
});
