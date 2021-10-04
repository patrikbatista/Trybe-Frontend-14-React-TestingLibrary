import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('01- testa se a page tras informacoes sobre a pokedex', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/favorites');

  const textFavorite = screen.getByText(/No favorite pokemon found/i);
  expect(textFavorite).toBeInTheDocument();
});
// falta o segundo teste
test('Testa se é exibido todos os cards de pokémons favoritados', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/');
  const detailLink = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(detailLink);

  const checkedButton = screen.getByRole('checkbox');
  userEvent.click(checkedButton);
  expect(checkedButton).toBeInTheDocument();

  customHistory.push('/favorites');

  const imageFavorites = screen.getByText('Pikachu');
  expect(imageFavorites).toBeInTheDocument();
});
