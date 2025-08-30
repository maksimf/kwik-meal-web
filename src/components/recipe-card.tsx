import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Clock, Star, Users } from "lucide-react";

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

interface RecipeCardProps {
  recipe: Recipe;
  searchIngredients: string[];
}

export function RecipeCard({ recipe, searchIngredients }: RecipeCardProps) {
  // Ensure numeric fields are numbers
  const cookTime =
    typeof recipe.cook_time === "number"
      ? recipe.cook_time
      : parseInt(recipe.cook_time?.toString() || "0") || 0;
  const prepTime =
    typeof recipe.prep_time === "number"
      ? recipe.prep_time
      : parseInt(recipe.prep_time?.toString() || "0") || 0;
  const totalTime = cookTime + prepTime;

  // Ensure ingredients is an array and handle different data formats
  const ingredientsArray = (() => {
    if (Array.isArray(recipe.ingredients)) {
      return recipe.ingredients;
    }

    if (typeof recipe.ingredients === "string") {
      // Try to parse as JSON first (in case it's a JSON string)
      try {
        const parsed = JSON.parse(recipe.ingredients);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // If JSON parsing fails, fall back to comma splitting
      }

      // Split by comma as fallback
      return recipe.ingredients.split(",").map((i) => i.trim());
    }

    return [];
  })();

  // Ensure ratings is a number
  const ratingsNumber =
    typeof recipe.ratings === "number"
      ? recipe.ratings
      : parseFloat(recipe.ratings?.toString() || "0") || 0;

  // Highlight ingredients that match search terms
  const highlightedIngredients = ingredientsArray.map((ingredient) => {
    const isMatch = searchIngredients.some((searchTerm) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ingredient, isMatch };
  });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video relative overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`${
            recipe.image ? "hidden" : ""
          } w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center`}
        >
          <ChefHat className="h-16 w-16 text-orange-400" />
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">
            {ratingsNumber.toFixed(1)}
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-lg">{recipe.title}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.author}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex gap-2">
          {recipe.cuisine && <Badge variant="outline">{recipe.cuisine}</Badge>}
          {recipe.category && (
            <Badge variant="outline">{recipe.category}</Badge>
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {highlightedIngredients
              .slice(0, 8)
              .map(({ ingredient, isMatch }, index) => (
                <Badge
                  key={index}
                  variant={isMatch ? "default" : "secondary"}
                  className={`text-xs ${
                    isMatch
                      ? "bg-green-100 text-green-800 border-green-200"
                      : ""
                  }`}
                >
                  {ingredient}
                </Badge>
              ))}
            {ingredientsArray.length > 8 && (
              <Badge variant="secondary" className="text-xs">
                +{ingredientsArray.length - 8} more
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Prep: </span>
            <span className="font-medium">{prepTime}m</span>
          </div>
          <div>
            <span className="text-muted-foreground">Cook: </span>
            <span className="font-medium">{cookTime}m</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
