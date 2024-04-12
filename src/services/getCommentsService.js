import * as request from 'src/utils/request';

async function getCommentListService(idVideo) {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
        console.log(token, headers);

        headers.Authorization = `Bearer ${token}`;
    }
    console.log(headers);
    try {
        const res = await request.get(`videos/${idVideo}/comments`, {
            headers,
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getCommentListService;
