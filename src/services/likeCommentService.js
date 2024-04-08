import * as request from 'src/utils/request';

async function likeCommentService(idcomment) {
    try {
        const token = localStorage.getItem('token');

        const res = await request.post(
            'comments/' + idcomment + '/like',
            {},
            {
                // Change the API endpoint here
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
                },
            },
        );
        console.log('Like Comment Success: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default likeCommentService;
