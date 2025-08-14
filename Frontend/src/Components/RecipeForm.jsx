let RecipeForm = ({handleSubmit}) => {

    return (
        <div className="main">
            <div className="mainbody">
                <form action={handleSubmit}>
                    <input type="text" placeholder="e.g. Oregano" className="forminput" size={80} name="ingredients" />
                    <button className="btnsubmit"> + Add ingredients </button>
                </form>
            </div>
        </div>
    )
}

export default RecipeForm

