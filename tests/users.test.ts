import { describe, expect, it } from "vitest";
import { Price } from "../src/resolvers-types";

describe("users", () => {
  it("can_map_to_generated_user_type", () => {
    
    // arrange
    const prices = [
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

    const products = [
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

    const users = [
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

  });
});
