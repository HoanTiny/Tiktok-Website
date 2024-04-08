import * as request from 'src/utils/request';

async function getVideoUserService(nickname) {
    // const token = localStorage.getItem('token');

    try {
        const res = await request.get('users/@' + nickname, {});
        console.log('get Video User: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getVideoUserService;
