import * as request from 'src/utils/request';

async function createComment(idVideo, value) {
    try {
        const token = localStorage.getItem('token');

        const res = await request.post(
            'videos/' + idVideo + '/comments',
            {
                comment: value,
            },
            {
                // Change the API endpoint here
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
                },
            },
        );
        console.log('Comments: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default createComment;
