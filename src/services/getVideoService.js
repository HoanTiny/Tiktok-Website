import * as request from 'src/utils/request';

async function getVideoService(idVideo) {
    try {
        const res = await request.get('videos/' + idVideo, {}, {});
        console.log('get Video: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getVideoService;
