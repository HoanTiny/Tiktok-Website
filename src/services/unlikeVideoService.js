import * as request from 'src/utils/request';

async function unlikeVideoServirvice(idvideo) {
    try {
        const token = localStorage.getItem('token');

        const res = await request.post(
            'videos/' + idvideo + '/unlike',
            {},
            {
                // Change the API endpoint here
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
                },
            },
        );
        console.log('successLikeVideo: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default unlikeVideoServirvice;
