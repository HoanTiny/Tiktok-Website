import * as request from 'src/utils/request';

export const getfollowingsAccount = async ({ page }) => {
    try {
        const token = localStorage.getItem('token');
        const res = await request.get(`me/followings`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
            },
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
};
