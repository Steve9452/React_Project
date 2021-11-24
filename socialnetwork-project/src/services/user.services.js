const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";
const services = {};


services.login = async (username, password) => {

    const response = await fetch(`${BASE_URL}/auth/signin`, 
    {
        headers: {
            "Content-type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if(response.ok)
    {
        const data = await response.json();
        return data;
    }

    return {};
};

services.verifyToken = async (token) => {

    //Prevent error message
    if(localStorage.getItem("token") === "undefined"){
        return {}
    }
    
    const response = await fetch(`${BASE_URL}/auth/whoami`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });

       
    if(response.ok) {
        const data = await response.json();
        return data;
    }
    return {};
}

export default services;