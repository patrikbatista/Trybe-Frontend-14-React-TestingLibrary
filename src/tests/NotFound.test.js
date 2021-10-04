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
  customHistory.push('/xablau');

  const notFoundText = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(notFoundText).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const customHistory = createMemoryHistory();
  const alt = 'Pikachu crying because the page requested was not found';
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/xablau');

  const imgNotFound = screen.getByAltText(alt);
  expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
