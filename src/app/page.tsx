"use client";

import { IngredientInput } from "@/components/ingredient-input";
import { RecipeCard } from "@/components/recipe-card";
import { Skeleton } from "@/components/ui/skeleton";
import { RecipeAPI, type SearchResponse } from "@/lib/api";
import { ChefHat, Utensils } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);

  const handleSearch = async (ingredients: string[]) => {
    setIsLoading(true);
    setError(null);
    setSearchIngredients(ingredients);

    try {
      const results = await RecipeAPI.searchByIngredients(ingredients);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search recipes");
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="text-center py-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ChefHat className="h-8 w-8 text-orange-600" />
          <h1 className="text-4xl font-bold text-gray-900">Kwik Meal</h1>
          <Utensils className="h-8 w-8 text-orange-600" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Find delicious recipes based on ingredients you have at home. Just add
          your ingredients and discover what you can cook!
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <IngredientInput onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults && !isLoading && (
          <div className="max-w-6xl mx-auto">
            {/* Search Results Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Found {searchResults.search_metadata.total_results} recipes
              </h2>
              <p className="text-gray-600">
                Searched for:{" "}
                {searchResults.search_metadata.query_ingredients.join(", ")}
                <span className="text-sm ml-2">
                  ({searchResults.search_metadata.search_time_ms.toFixed(1)}ms)
                </span>
              </p>
            </div>

            {/* Recipe Grid */}
            {searchResults.results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.results.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    searchIngredients={searchIngredients}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No recipes found
                </h3>
                <p className="text-gray-600">
                  Try different ingredients or check your spelling
                </p>
              </div>
            )}
          </div>
        )}

        {/* Welcome State */}
        {!searchResults && !isLoading && !error && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <ChefHat className="h-24 w-24 text-orange-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to cook something amazing?
            </h2>
            <p className="text-gray-600 mb-8">
              Enter the ingredients you have available and we&apos;ll find the
              perfect recipes for you. Our search handles typos and finds
              recipes even with partial ingredient matches!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
              <div>
                <Utensils className="h-6 w-6 mx-auto mb-2 text-orange-400" />
                <p>10,000+ recipes</p>
              </div>
              <div>
                <ChefHat className="h-6 w-6 mx-auto mb-2 text-orange-400" />
                <p>Smart ingredient matching</p>
              </div>
              <div>
                <div className="h-6 w-6 mx-auto mb-2 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ⚡
                </div>
                <p>Fast search results</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
