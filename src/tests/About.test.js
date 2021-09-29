import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import App from '../App';

test('01- testa se a page tras informacoes sobre a pokedex', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/about');

  const textInfoAbout = screen.getByText(/This application simulates/i);
  expect(textInfoAbout).toBeInTheDocument();
});

test('02- testa se a page contém heading h2', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/about');

  const textAbout = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(textAbout).toBeInTheDocument();
});

test('03- testa se a page contém 2 paragrafos', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/about');

  const textPagraphyOne = screen.getByText(/This application simulates/i);
  expect(textPagraphyOne).toBeInTheDocument();

  const textPagraphyTwo = screen.getByText(/One can filter/i);
  expect(textPagraphyTwo).toBeInTheDocument();
});

test('03- testa se a page contém imagem', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/about');

  const imagePokedex = screen.getByAltText('Pokédex');
  expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
