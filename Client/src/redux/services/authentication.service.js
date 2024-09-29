

export const registerUserFromApi = async (user) => {

    try {
        await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/register`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(user)
        })


    } catch (error) {
        throw new Error ('Something went wrong')
    }

}

export const loginUserFromApi = async (user) => {

    try {
        
       
      let response =  await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {

            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(user)
        })

        return await response.json()

       

    } catch (error) {
        throw new Error ('Something went wrong')
    }

}
