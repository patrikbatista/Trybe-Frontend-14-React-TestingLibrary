import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import App from '../App';
import pokemons from '../data';

test('teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/');

  const { name } = pokemons[0];

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName).toHaveTextContent(name);

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType).toHaveTextContent('Electric');

  const pokemonWeigth = screen.getByTestId('pokemon-weight');
  expect(pokemonWeigth).toHaveTextContent(/Average weight: 6.0 kg/i);

  const pokemonImage = screen.getByRole('img');
  expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
});

test('Teste se ao clicar no link,redireciona para a página de detalhes', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/');

  const linkDetails = screen.getByText('More details');
  expect(linkDetails).toBeInTheDocument();
  expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  userEvent.click(linkDetails);
  const summaryText = screen.getByText('Summary');
  expect(summaryText).toBeInTheDocument();
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/');

  const linkDetails = screen.getByText('More details');
  userEvent.click(linkDetails);
  const favorite = screen.getByText(/Pokémon favoritado/i);
  userEvent.click(favorite);

  const starIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
