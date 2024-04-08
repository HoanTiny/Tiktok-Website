import * as request from 'src/utils/request';

async function getVideoService(idVideo) {
    const token = localStorage.getItem('token');
    const headers = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    try {
        const res = await request.get('videos/' + idVideo, {
            headers,
        });
        console.log('get Video: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getVideoService;
