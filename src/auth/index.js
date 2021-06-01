const isLogged =() =>  !!localStorage.getItem('token') 
export {isLogged};