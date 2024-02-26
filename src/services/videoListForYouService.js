import * as request from 'src/utils/request';

export const getVideoListForYou = async ({ type, perPage }) => {
    try {
        const token = localStorage.getItem('token');

        const res = await request.get(`videos`, {
            params: {
                type,
                page: perPage,
            },
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
            },
        });
        console.log('Check data: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
};
