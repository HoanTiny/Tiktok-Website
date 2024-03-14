import * as request from 'src/utils/request';

async function followService(idUser) {
    try {
        const token = localStorage.getItem('token');

        const res = await request.post(
            'users/' + idUser + '/follow',
            {},
            {
                // Change the API endpoint here
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
                },
            },
        );
        console.log('Follow: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default followService;
