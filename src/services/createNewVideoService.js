import * as request from 'src/utils/request';

async function createVideo(formData) {
    try {
        const token = localStorage.getItem('token');

        const res = await request.post('videos', formData, {
            // Change the API endpoint here
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
            },
        });
        console.log('Create Video: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default createVideo;
