interface Recipe {
  id: number;
  title: string;
  cook_time: number | string;
  prep_time: number | string;
  ingredients: string[] | string;
  ratings: number | string;
  cuisine: string;
  category: string;
  author: string;
  image: string;
}

interface SearchResponse {
  results: Recipe[];
  search_metadata: {
    query_ingredients: string[];
    total_results: number;
    search_time_ms: number;
    limit: number;
  };
}

// Default to localhost for development, can be overridden via environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export class RecipeAPI {
  static async searchByIngredients(
    ingredients: string[],
    limit: number = 20
  ): Promise<SearchResponse> {
    const params = new URLSearchParams();
    ingredients.forEach((ingredient) => {
      params.append("ingredients[]", ingredient);
    });
    params.append("limit", limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/recipes/search?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to search recipes: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  static async getAllRecipes(page: number = 1, perPage: number = 10) {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/recipes?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch recipes: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }
}

export type { Recipe, SearchResponse };
