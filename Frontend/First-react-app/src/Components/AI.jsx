export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to generate recipe");
    }

    return data.recipe;
  } catch (err) {
    console.error("Error getting recipe:", err.message);
    throw err;
  }
}
