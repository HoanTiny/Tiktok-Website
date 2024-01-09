import classNames from 'classnames/bind';
import styles from './ModalLoginEmail.module.scss';

import { CloseIcon, BackIcon, EyePass, EyePassActive } from '~/components/Icons';
import Button from 'src/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ModalLoginEmail({ close }) {
    const [isRegisterMode, setRegisterMode] = useState(false);
    const [isActiveEye, setActiveEye] = useState(false);

    const toggleMode = () => {
        setRegisterMode((prevMode) => !prevMode);
    };

    const toggleEyePass = () => {
        setActiveEye((prevMode) => !prevMode);
    };

    const handelChangeEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };

    const handelChangePassword = (e) => {
        console.log(e.target.value);

        setPassword(e.target.value);
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-header')}>
                <button className={cx('back')} onClick={close}>
                    <BackIcon width="20px" height="20px" />
                </button>
                <button className={cx('close')} onClick={close}>
                    <CloseIcon width="20px" height="20px" />
                </button>
            </div>
            <div className={cx('header')}>{isRegisterMode ? 'Đăng ký' : 'Đăng nhập'}</div>
            <div className={cx('content')}>
                <div className={cx('content-header')}>
                    <div className={cx('content-header_phone')}>
                        {isRegisterMode ? 'Email hoặc Tiktok ID' : 'Điện thoại'}
                    </div>
                    <div className={cx('content-header_text')} onClick={toggleMode}>
                        {isRegisterMode ? 'Đăng nhập bằng số điện thoại' : 'Đăng nhập bằng email hoặc Tiktok ID'}
                    </div>
                </div>

                {isRegisterMode ? (
                    // Phần đăng ký
                    <div className={cx('content-input')}>
                        <div className={cx('content-input-phone')}>
                            {/* Input cho số điện thoại */}
                            <input type="text" className={cx('input-text')} placeholder="Số điện thoại" />
                        </div>

                        <div className={cx('content-input-phone', 'content-input-phone2')}>
                            <input type="text" className={cx('input-text')} placeholder="Mật khẩu" />
                            <div onClick={toggleEyePass}>{isActiveEye ? <EyePass /> : <EyePassActive />}</div>
                        </div>
                    </div>
                ) : (
                    // Phần đăng nhập
                    <div className={cx('content-input')}>
                        <div className={cx('content-input-phone', 'active')}>
                            {/* Thẻ select cho việc chọn loại xe */}
                            <select id="cars" name="cars">
                                <option value="volvo">+84</option>
                                <option value="saab">+233</option>
                                <option value="mercedes">+444</option>
                                <option value="audi">+102</option>
                            </select>
                            {/* Input cho số điện thoại */}
                            <input type="text" className={cx('input-text')} placeholder="Số điện thoại" />
                        </div>

                        <div className={cx('content-input-ma')}>
                            <input type="number" className={cx('input-number')} placeholder="Nhập mã gồm 6 số" />
                            <button className={cx('btn-sibmit-send')}>Gửi mã</button>
                        </div>
                    </div>
                )}

                {isRegisterMode ? (
                    <a href="facebook.com" className={cx('content-link')}>
                        Quên mật khẩu
                    </a>
                ) : (
                    <a href="facebook.com" className={cx('content-link')}>
                        Đăng nhập với mật khẩu
                    </a>
                )}

                <Button primary className={cx('content-btn-submit')} disabled>
                    {isRegisterMode ? 'Đăng ký' : 'Đăng nhập'}
                </Button>
            </div>

            <div className={cx('footer')}>
                <span className={cx('footer-text')}>
                    {isRegisterMode ? 'Bạn chưa có tài khoản? ' : 'Bạn đã có tài khoản? '}
                </span>
                <a href="facebook.com" className={cx('footer-link')} onClick={toggleMode}>
                    {isRegisterMode ? 'Đăng ký' : 'Đăng nhập'}
                </a>
            </div>
        </div>
    );
}

export default ModalLoginEmail;
