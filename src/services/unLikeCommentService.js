import * as request from 'src/utils/request';

async function unlikeCommentService(idcomment) {
    try {
        const token = localStorage.getItem('token');

        const res = await request.post(
            'comments/' + idcomment + '/unlike',
            {},
            {
                // Change the API endpoint here
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
                },
            },
        );
        console.log('success Un Like Comment: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default unlikeCommentService;
