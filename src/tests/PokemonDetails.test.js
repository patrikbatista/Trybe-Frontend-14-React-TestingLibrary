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

  const mapOne = screen.getAllByAltText('Pikachu location');
  console.log(mapOne);

  mapOne.forEach((map) => {
    expect(map).toBeInTheDocument();
    expect(map).toHaveAttribute('alt', 'Pikachu location');
    expect(map).toHaveAttribute('src', map.src);
  });
  // expect(mapOne).toBeInTheDocument();
  // expect(mapOne).toHaveAttribute('alt', 'Pikachu location');
  // expect(mapOne).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

  const nameLocationTwo = screen.getByText('Kanto Power Plant');
  expect(nameLocationTwo).toBeInTheDocument();

  // const mapTwo = screen.getByRole('img', {
  //   src: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
  // });
  // expect(mapTwo).toBeInTheDocument();
  // expect(mapTwo).toHaveAttribute('alt', 'Pikachu location');
  // expect(mapTwo).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const labelText = screen.getByLabelText('Pokémon favoritado?');
  expect(labelText).toBeInTheDocument();
  userEvent.click(labelText);
  expect(labelText).toBeChecked();
  userEvent.click(labelText);
  expect(labelText).not.toBeChecked();
});
