import * as request from 'src/utils/request';

export const getAnUserService = async (user) => {
    try {
        const res = await request.get(`users`, {
            params: {
                username: user,
            },
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
};
