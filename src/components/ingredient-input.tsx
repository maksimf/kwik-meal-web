"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash, X } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface IngredientInputProps {
  onSearch: (ingredients: string[]) => void;
  isLoading?: boolean;
}

export function IngredientInput({
  onSearch,
  isLoading = false,
}: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<string[]>([
    "basil",
    "tomato",
    "pasta",
  ]);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = (ingredient: string) => {
    const trimmedIngredient = ingredient.trim().toLowerCase();
    if (trimmedIngredient && !ingredients.includes(trimmedIngredient)) {
      const newIngredients = [...ingredients, trimmedIngredient];
      setIngredients(newIngredients);
      setInputValue("");
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    setIngredients(newIngredients);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addIngredient(inputValue);
    } else if (e.key === "Backspace" && !inputValue && ingredients.length > 0) {
      removeIngredient(ingredients[ingredients.length - 1]);
    }
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <div className="min-h-12 p-3 border border-input rounded-md bg-background flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          {ingredients.map((ingredient) => (
            <Badge
              key={ingredient}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              ingredients.length === 0
                ? "Type ingredients and press Enter..."
                : "Add more ingredients..."
            }
            className="flex-1 border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleSearch}
          disabled={ingredients.length === 0 || isLoading}
          size="lg"
          className="w-32"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-32 ml-4"
          onClick={() => setIngredients([])}
          disabled={ingredients.length === 0}
        >
          <Trash className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      {ingredients.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Press Enter to add ingredients • Backspace to remove • Click X to
          remove specific ingredients
        </p>
      )}
    </div>
  );
}
