import * as request from 'src/utils/request';

export const login = async (email, password) => {
    try {
        const res = await request.post(`auth/login`, { email, password });
        return res;
    } catch (error) {
        console.log(`error`, error);
    }
};
