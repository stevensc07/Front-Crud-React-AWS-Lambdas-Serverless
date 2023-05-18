import axios from 'axios';


const BASE_URL = "https://9jt296qafb.execute-api.us-east-1.amazonaws.com/dev/"


const getCompaniesService = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    };
    try {
        const response = await axios.post(`${BASE_URL}getCompanies`, {}, { headers })
        return response.data
    } catch (error) {
        return error
    }
}

const createOrUpdateCompanyService = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    };
    try {
        const response = await axios.post(`${BASE_URL}company`, data, { headers })
        return response.data
    } catch (error) {
        return error
    }
}

const deleteCompanyService = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    };
    try {
        const response = await axios.post(`${BASE_URL}deleteCompany`, data, { headers })

        console.log("este es el reponsee");
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

export default { getCompaniesService, createOrUpdateCompanyService, deleteCompanyService };
