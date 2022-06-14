const AUTHENTICATION_URL = "/tech/frontend/personal/request"
const CERTIFICATION_URL = "/tech/frontend/personal/submit"

export const postUserInfo = async (input) => {
    try {
        const response = await fetch(AUTHENTICATION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        })
        return response.json();

    }
    catch(e){
        return Promise.reject(e);
    }
}

export const postPhoneCode = async (input) => {
    try {
        const response = await fetch(CERTIFICATION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        })
        return response;

    }
    catch(e){
        return Promise.reject(e);
    }
}
