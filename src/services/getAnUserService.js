import * as request from 'src/utils/request';

async function getAnUserService(user) {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    try {
        const res = await request.get(`users/@${user}`, {
            headers,
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getAnUserService;
