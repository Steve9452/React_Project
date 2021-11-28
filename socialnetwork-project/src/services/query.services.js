import { useUserContext } from "../context/UserContext";

const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";
const services = {};



services.getAll = async (token,limit, page) => {

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

services.like = async (token, _postId) => {
    const response = await fetch(`${BASE_URL}/post/like/${_postId}`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method : "PATCH"
    });
    if(!response.ok){
        alert("Error no es posible realizar dicha acción");
    }
}

services.patchFav = async (token, _postId) => {
    const response = await fetch(`${BASE_URL}/post/fav/${_postId}`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method : "PATCH"
    });
    if(!response.ok){
        alert("Error no es posible realizar dicha acción");
    }
    else{
        console.log("Post agregado a favoritos")
    }
}


services.getFavs = async (token ) => {
    const response = await fetch(`${BASE_URL}/post/fav`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method : "GET"
    });
    if(response.ok){
        const data = await response.json();
        console.log(data);
    }

}
export default services;