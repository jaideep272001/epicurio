import Markdown from 'react-markdown'

let ApiRecipeData = (props)=>{
    return(
        <section className='recipedata'>
            <h2>Epicurio Recommends : </h2>
            <Markdown>{props.recipe}</Markdown>

       </section>
    )
}

export default ApiRecipeData;