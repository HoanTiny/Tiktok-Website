import * as request from 'src/utils/request';

async function getCurrentUserService() {
    try {
        const token = localStorage.getItem('token');
        const res = await request.get(`auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
            },
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getCurrentUserService;
