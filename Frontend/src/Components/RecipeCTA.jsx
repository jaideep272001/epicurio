let RecipeCTA = (props) => {
    return (

        < section >
            <div className="ingredientsdiv">
                <h2 className="ingredientsHeading">Ingredients on Hand : </h2>
                <ul>
                    {props.ingredientslist}
                </ul>
            </div>
            {
                props.ingredients.length > 3 && <div className="recipectadiv">
                    <div className="insiderecipediv">
                        <div className="recipehead"><h2>Ready for a Recipe?</h2></div>
                        <div className="recipepara">Generate a Recipe from your list of ingredients</div>
                    </div>
                    <div className="recipebtn">
                        <button onClick={props.handleRecipeBtn}>Get a Recipe</button>
                    </div>
                </div>
            }
        </section >

    )
}

export default RecipeCTA;

