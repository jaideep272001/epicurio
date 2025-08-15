import React from "react";
import ApiRecipeData from "./ApiRecipeData";
import RecipeForm from "./RecipeForm";
import RecipeCTA from "./RecipeCTA";
import { getRecipeFromMistral } from "./AI";

let MainBody = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const ingredientslist = ingredients.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  let handleRecipeBtn = async () => {
    setLoading(true);
    setError("");
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  let handleSubmit = (formData) => {
    const newIngredient = formData.get("ingredients");
    if (newIngredient.trim() !== "") {
      setIngredients((prev) => [...prev, newIngredient]);
    }
  };

  return (
    <>
      <RecipeForm handleSubmit={handleSubmit} />
      <div>
        {ingredients.length > 0 && (
          <RecipeCTA
            ingredients={ingredients}
            ingredientslist={ingredientslist}
            handleRecipeBtn={handleRecipeBtn}
          />
        )}

        {loading && <p>Generating recipe...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {recipe && <ApiRecipeData recipe={recipe} />}
      </div>
    </>
  );
};

export default MainBody;
