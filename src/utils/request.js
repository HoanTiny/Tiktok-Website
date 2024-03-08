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

export const put = async (path, body = {}, options = {}) => {
    const response = await request.put(path, body, options);
    return response.data;
};

export const patch = async (path, data, options) => {
    const response = await request.patch(path, data, options);

    return response;
};

export default request;
