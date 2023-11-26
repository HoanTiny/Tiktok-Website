import * as request from 'src/utils/request';

export const getVideoListForYou = async ({ type, perPage }) => {
    try {
        const res = await request.get(`videos`, {
            params: {
                type,
                page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
};
