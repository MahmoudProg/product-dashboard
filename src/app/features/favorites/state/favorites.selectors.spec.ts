// favorites.selectors.spec.ts
import { selectFavorites, selectFavoritesCount } from './favorites.selectors';
import { FavoritesState } from './favorites.reducer';

describe('Favorites Selectors', () => {
  const initialState: FavoritesState = {
    favorites: [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Desc 1',
      category: 'Category 1',
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      description: 'Desc 2',
      category: 'Category 2',
      image: 'image2.jpg',
      rating: { rate: 4.0, count: 5 },
    },
    ],
  };

  it('should select favorites array', () => {
    const result = selectFavorites.projector(initialState);
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Product 1');
  });

  it('should select favorites count', () => {
    const result = selectFavoritesCount.projector(initialState.favorites);
    expect(result).toBe(2);
  });

  it('should return empty array if state is undefined', () => {
    const result = selectFavorites.projector(undefined as any);
    expect(result).toEqual([]);
  });
});
