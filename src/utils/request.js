import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = []) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, body = {}, options = {}) => {
    const response = await request.post(path, body, options);
    return response.data;
};

export default request;
