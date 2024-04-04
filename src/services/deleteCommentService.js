import * as request from 'src/utils/request';

async function deleteComment(idComment) {
    try {
        const token = localStorage.getItem('token');
        console.log(`Deleting ${idComment}`, token);
        const res = await request.del(`comments/${idComment}`, {
            // Change the API endpoint here
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
            },
        });
        console.log('Xóa Comments: ', res);
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
}

export default deleteComment;
