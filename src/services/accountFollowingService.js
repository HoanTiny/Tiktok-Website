import * as request from 'src/utils/request';

export const getfollowingsAccount = async ({ page }) => {
    try {
        // const token =
        //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTY5OTk0NDkwMCwiZXhwIjoxNzAyNTM2OTAwLCJuYmYiOjE2OTk5NDQ5MDAsImp0aSI6Ikg4QTJ6R2k0OUdZTm1HZ3oiLCJzdWIiOjY0NTIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.h2TiexZmK96pjofTBleCCg6jzbC_GXJCnKRNpAcBhfA';
        const res = await request.get(`me/followings`, {
            params: {
                page,
            },
            // headers: {
            //     Authorization: `Bearer ${token}`, // Thêm token vào header của yêu cầu
            // },
        });
        return res.data;
    } catch (error) {
        console.log(`error`, error);
    }
};
