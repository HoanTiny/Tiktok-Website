import * as request from 'src/utils/request';

const updateProfile = async (formData) => {
    const token = localStorage.getItem('token');

    try {
        const res = await request.post('auth/me', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            params: {
                _method: 'PATCH',
            },
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
        return { errCode: err.response?.status };
    }
};

export default updateProfile;
