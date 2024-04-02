import * as request from 'src/utils/request';

async function getCommentListService(idVideo) {
    const token = localStorage.getItem('token');

    try {
        const res = await request.get(`videos/${idVideo}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
            },
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getCommentListService;
