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

services.getAll = async (token, limit, page) => {
    const response = await fetch(`${BASE_URL}/post/all?limit=${limit}&page=${page}`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(response.ok){
        const data = await response.json();
        return data;
    }

    return {};
}

services.getAllFavorites = async (token) => {
    const response = await fetch(`${BASE_URL}/post/fav`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(response.ok){
        const data = await response.json();
        return data;
    }

    return {};
}

services.getOne = async (token, id) => {
    const response = await fetch(`${BASE_URL}/post/one/${id}`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(response.ok){
        const data = await response.json();
        return data;
    }

    return {};
}

export default services;