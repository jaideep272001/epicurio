import React from "react"

let App = ()=>{
    const [contact, setContact] = React.useState({
        firstname : "Jaideep", 
        lastname : "Daswani", 
        phone : "79766 78211", 
        email : "jaideepdaswani0838@gmail.com",
        isFavourite : false 
    })

    let toggleFavourite = ()=>{
        console.log("Tooger Initiated")
    }

    return(
        <></>
    )
}

export default App; 