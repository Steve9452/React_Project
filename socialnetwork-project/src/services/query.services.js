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

services.getOwned = async (token,limit, page) => {

    const response = await fetch(`${BASE_URL}/post/owned?limit=${limit}&page=${page}`,
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

services.CreatePost = async (token, title, description, image) => {
    const response = await fetch(`${BASE_URL}/post/create`,
    {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
            title: title,
            description: description,
            image: image
        })
    });

    if(response.ok){
        const data = await response.json();
        return data;
    }

    return {};
}

services.toggleActive = async (token, _postId) => {
    const response = await fetch(`${BASE_URL}/post/toggle/${_postId}`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method : "PATCH"
    });
    if(!response.ok){
        alert("Error el post que desea ocultar no pertenece a su dominio");
    }
    else{
        console.log(response)
    }
}

services.UpdatePost = async (token, _postId, title, description, image) => {
    const response = await fetch (`${BASE_URL}/post/update/${_postId}`,
    {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify({
            title: title,
            description: description,
            image: image
        })
    });
    if(!response.ok){
        alert("Error no fue posible realizar dicha acción")
    }
}

services.AddNewComment = async (token, _postId, description) => {
    const response = await fetch(`${BASE_URL}/post/comment/${_postId}`,
    {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        },
        method : "PATCH",
        body: JSON.stringify({
            description:description
        })
    });
    if(!response.ok){
        alert("Error no es posible realizar dicha acción");
    }
}
export default services;