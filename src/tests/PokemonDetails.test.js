import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('Teste as informações detalhadas do Pokémon', () => {
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
  const detailsPokemon = screen.getByRole('heading', {
    level: 2,
    name: 'Pikachu Details',
  });
  expect(detailsPokemon).toBeInTheDocument();

  expect(linkDetails).not.toBeInTheDocument();
  const summaryText = screen.getByRole('heading', {
    level: 2,
    name: /summary/i,
  });
  expect(summaryText).toBeInTheDocument();
  const paragraphText = screen.getByText(/This intelligent/i);
  expect(paragraphText).toBeInTheDocument();
});

test('teste seção de mapas do pokemon', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  customHistory.push('/');

  const linkDetails = screen.getByText('More details');
  userEvent.click(linkDetails);

  const locationText = screen.getByRole('heading', {
    level: 2,
    name: /Game Locations of Pikachu/i,
  });
  expect(locationText).toBeInTheDocument();

  const nameLocationOne = screen.getByText('Kanto Viridian Forest');
  expect(nameLocationOne).toBeInTheDocument();

  const pokemonLocation = 'Pikachu location';
  const mapOne = screen.getAllByAltText(pokemonLocation);

  expect(mapOne[0]).toBeInTheDocument();
  expect(mapOne[0]).toHaveAttribute('alt', pokemonLocation);
  expect(mapOne[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

  expect(mapOne[1]).toBeInTheDocument();
  expect(mapOne[1]).toHaveAttribute('alt', pokemonLocation);
  expect(mapOne[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const nameLocationTwo = screen.getByText('Kanto Power Plant');
  expect(nameLocationTwo).toBeInTheDocument();

  const labelText = screen.getByLabelText('Pokémon favoritado?');
  expect(labelText).toBeInTheDocument();
  userEvent.click(labelText);
  expect(labelText).toBeChecked();
  userEvent.click(labelText);
  expect(labelText).not.toBeChecked();
});
