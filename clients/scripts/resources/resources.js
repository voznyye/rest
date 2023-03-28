import getToken from "../verification/verification";


async function postRequest(url, data, header = getToken("token")) {
    const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...header
        }
    })

    console.log(result);

    return await result.json();

}   

async function getDataRequest(url, header){

    if(!getToken("token")){
        alert("Вы не зарегстрированы или не авторизованы");
        return;
    }

    const result = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...header
        }
    })

    return await result.json();

}

async function deleteUser(url, header){
        if(!getToken("token")){
            alert("Вы не зарегстрированы или не авторизованы");
            return;
        }

        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                ...header
            }
        })

        if(!result.ok){
            console.log(result.statusText);
        } 
           
        return await result.json();
}


async function changeData(url, data, header){
    if(!getToken("token")){
        alert("Вы не зарегистрированы или не авторизованы");
        return;
    }

    const result = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            ...header
        }
    })

    return await result.json();
}

export {getDataRequest};
export {postRequest};

export {deleteUser};

export {changeData};
