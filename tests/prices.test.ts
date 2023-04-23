import { describe, expect, it } from 'vitest';
import { Price} from '../src/resolvers-types';

describe('prices', () => {
  it('can_map_to_generated_price_type', () => {

    // arrange
    var data = [
      {
        "id": "PR-1",
        "price": 2.99,
        "currency": "EUR"
      },
      {
        "id": "PR-2",
        "price": 4.99,
        "currency": "EUR"
      },
      {
        "id": "PR-3",
        "price": 2.49,
        "currency": "EUR"
      }
    ];

    // act
    const prices: Price[] = data.map(price => {
      return {
        id: price.id,
        price: price.price,
        currency: price.currency
      }
    });

    // assert
    expect(prices.length).eq(3);
  })
})
