import * as request from 'src/utils/request';

const updateProfile = async (avatar, nickname, lastName, bio) => {
    const token = localStorage.getItem('token');
    console.log(avatar, nickname, lastName, bio);
    try {
        const res = await request.patch(
            'auth/me',
            {
                avatar: avatar,
                nickname: nickname,
                last_name: lastName,
                bio: bio,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    _method: 'PATCH',
                },
            },
        );
        console.log(res.data);
        return res.data;
    } catch (err) {
        return { errCode: err.response.status };
    }
};

export default updateProfile;
