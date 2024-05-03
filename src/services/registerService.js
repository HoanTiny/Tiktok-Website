import * as request from 'src/utils/request';

export const register = async (type, email, password) => {
    try {
        const res = await request.post(`auth/register`, { type, email, password });
        return res;
    } catch (error) {
        console.log(`error`, error);
    }
};
