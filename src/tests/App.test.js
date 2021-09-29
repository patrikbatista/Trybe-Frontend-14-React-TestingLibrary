import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import App from '../App';

describe('01-  testa o componete App', () => {
  it('01- testa se a aplicaçao é redirecionada para a pagina principal, HOME', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const homeText = screen.getByRole('heading', {
      level: 1,
      name: /pokédex/i,
    });
    expect(homeText).toBeInTheDocument();
  });
});

test('02- testa se a aplicaçao é redirecionada para a pagina principal, ABOUT', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  expect(aboutLink).toBeInTheDocument();

  userEvent.click(aboutLink);

  const aboutText = screen.getByRole('heading', {
    level: 2,
    name: /about pokédex/i,
  });
  expect(aboutText).toBeInTheDocument();
});

test('03- testa se a aplicaçao é redirecionada para a pagina, FAVORITE POKEMONS', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favotiteLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(favotiteLink);

  const favoriteText = screen.getByRole('heading', {
    name: /favorite pokémons/i,
  });
  expect(favoriteText).toBeInTheDocument();
});

test('04- testa se a aplicaçao é redirecionada para a pagina, NOT FOUND', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  customHistory.push('/xablau');

  const notFoundText = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(notFoundText).toBeInTheDocument();
});
