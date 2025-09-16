
/// <reference types="jasmine" />
import { selectFavorites, selectFavoritesCount } from './favorites.selectors';
import { FavoritesState } from './favorites.reducer';

describe('Favorites Selectors', () => {
  const initialState: FavoritesState = {
    favorites: [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Test product 1',
      category: 'Category A',
      image: 'image1.png',
      rating: { rate: 4.5, count: 10 }
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      description: 'Test product 2',
      category: 'Category B',
      image: 'image2.png',
      rating: { rate: 4.0, count: 8 }
    }
  ]
  };

  it('should select all favorites', () => {
    const result = selectFavorites.projector(initialState);
    expect(result.length).toBe(2);
    expect(result).toEqual(initialState.favorites);
  });

  it('should return the count of favorites', () => {
    const result = selectFavoritesCount.projector(initialState.favorites);
    expect(result).toBe(2);
  });

  it('should return empty array if no favorites', () => {
    const result = selectFavorites.projector({ favorites: [] });
    expect(result).toEqual([]);
  });

  it('should return 0 if no favorites', () => {
    const result = selectFavoritesCount.projector([]);
    expect(result).toBe(0);
  });
});
