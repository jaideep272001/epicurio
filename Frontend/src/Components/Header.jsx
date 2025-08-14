import ChefLogo from "../assets/chef-logo.svg"

let Header = ()=>{
  return(
    <div className="headerdiv">
      <img src={ChefLogo} alt="ChefLogo"/>
      <p >Epicurio</p>
    </div>
  )
}

export default Header;