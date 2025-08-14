import React from "react";
import ApiRecipeData from "./ApiRecipeData";
import RecipeForm from "./RecipeForm"
import RecipeCTA from "./RecipeCTA";
import { getRecipeFromMistral } from "./AI"

let MainBody = () => {
    const [ingredients, setIngredients] = React.useState([]);
    const ingredientslist = ingredients.map(items => {
        return (
            <li>{items}</li>
        )
    });

    const [isShown, setIsShown] = React.useState("");

    let handleRecipeBtn = async () => {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setIsShown(recipeMarkdown);
    }

    let handleSumbit = (formData) => {
        const newIngredient = formData.get("ingredients");
        if (newIngredient != "") setIngredients(prevSave => [...ingredients, newIngredient]);

    }
    
    return (
        <>
            <RecipeForm
                handleSubmit={handleSumbit}
            />
            <div>
                {ingredients.length > 0 && <RecipeCTA ingredients={ingredients}
                    ingredientslist={ingredientslist}
                    handleRecipeBtn={handleRecipeBtn}  />}
                {isShown && <ApiRecipeData 
                recipe = {isShown}/>}
            </div>
        </>

    )
}


export default MainBody;