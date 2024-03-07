import * as request from 'src/utils/request';

async function getAnUserService(user) {
    try {
        const res = await request.get(`users/@${user}`, {});
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default getAnUserService;
