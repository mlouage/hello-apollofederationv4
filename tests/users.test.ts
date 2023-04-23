import { describe, expect, it } from "vitest";
import { Price, User, Product } from "../src/resolvers-types";

describe("users", () => {
  it("can_map_to_generated_user_type", () => {

    // arrange
    const pricesData = [
      {
        id: "PR-1",
        price: 2.99,
        currency: "EUR",
      },
      {
        id: "PR-2",
        price: 4.99,
        currency: "EUR",
      },
      {
        id: "PR-3",
        price: 2.49,
        currency: "EUR",
      },
    ];

    const productsData = [
      {
        id: "PROD-1",
        name: "Product 1",
        description: "Product 1 description",
        image: "https://www.example.com/product1.jpg",
        price: "PR-1",
      },
      {
        id: "PROD-2",
        name: "Product 2",
        description: "Product 2 description",
        image: "https://www.example.com/product2.jpg",
        price: "PR-2",
      },
      {
        id: "PROD-3",
        name: "Product 3",
        description: "Product 3 description",
        image: "https://www.example.com/product3.jpg",
        price: "PR-3",
      },
    ];

    const usersData = [
      {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com",
        "favorites": [
          "PROD-1",
          "PROD-2",
        ]
      },
      {
        "id": "2",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "favorites": [
          "PROD-2",
          "PROD-3",
        ]
      },
      {
        "id": "3",
        "name": "Mike Doe",
        "email": "mike@example.com",
        "favorites": [
          "PROD-1",
          "PROD-2",
          "PROD-3"
        ]
      }
    ]

    // act
    const prices: Price[] = pricesData.map(price => {
      return {
        id: price.id,
        price: price.price,
        currency: price.currency
      }
    });

    const products: Product[] = productsData
      .map(product => {
        const price = prices.find(p => p.id === product.price);
        if (price != undefined) {
          return { ...product, price };
        }
      })
      .filter(product => product != undefined) as Product[];

    const users: User[] = usersData.map(user => {
      const favorites = products.filter(product => user.favorites.includes(product.id));
      return { ...user, favorites };
    });

    // assert
    expect(users.length).eq(3);

  });
});
