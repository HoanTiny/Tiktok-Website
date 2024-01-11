import classNames from 'classnames/bind';
import styles from './ModalLoginEmail.module.scss';

import { CloseIcon, BackIcon, EyePass, EyePassActive } from '~/components/Icons';
import Button from 'src/components/Button';
import { useState, useEffect } from 'react';
import { login } from 'src/services/loginAccountService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ModalLoginEmail({ close }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterMode, setRegisterMode] = useState(false);
    const [isActiveEye, setActiveEye] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [animation, setAnimation] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        // Kiểm tra nếu email và password không rỗng thì bỏ disable button
        if (email && password) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [email, password]);

    const handleLogin = async () => {
        setAnimation(true);
        if (!email || !password) {
            console.log(`Email và mật khẩu là bắt buộc`);
            return;
        }
        let res = await login(email, password);
        console.log(res);
        if (res && res.meta.token) {
            setPasswordValid(true);
            setErrorMessage('');
            localStorage.setItem('token', res.meta.token);

            // Reload the page
            window.location.reload();
            navigate('/');
        } else {
            setPasswordValid(false);
            setErrorMessage('Sai mật khẩu hoặc tài khoản');
        }

        setAnimation(false);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const toggleMode = () => {
        setRegisterMode((prevMode) => !prevMode);
    };

    const toggleEyePass = () => {
        setActiveEye((prevMode) => !prevMode);
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
            <div className={cx('header')}>{isRegisterMode ? 'Đăng nhập' : 'Đăng ký'}</div>
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
                    <form>
                        <div className={cx('content-input')}>
                            <div className={cx('content-input-phone')}>
                                {/* Input cho số điện thoại */}
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    value={email}
                                    onChange={handleChangeEmail}
                                    placeholder="Email"
                                    autoComplete="username"
                                />
                            </div>

                            <div
                                className={cx('content-input-phone', 'content-input-phone2', {
                                    active2: !isPasswordValid,
                                })}
                            >
                                <input
                                    type={isActiveEye ? 'password' : 'text'}
                                    className={cx('input-text')}
                                    value={password}
                                    onChange={handleChangePassword}
                                    placeholder="Mật khẩu"
                                    autoComplete="current-password"
                                />
                                {/* Code error message when not true password */}
                                <div onClick={toggleEyePass}>{isActiveEye ? <EyePass /> : <EyePassActive />}</div>
                            </div>
                            {errorMessage && <div className={cx('error-message')}>{errorMessage}</div>}
                        </div>
                    </form>
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

                <Button primary className={cx('content-btn-submit')} onClick={handleLogin} disabled={disabledBtn}>
                    {animation ? (
                        <FontAwesomeIcon className={cx('animate-spin')} icon={faSpinner} />
                    ) : isRegisterMode ? (
                        'Đăng nhập'
                    ) : (
                        'Đăng ký'
                    )}
                </Button>
            </div>

            <div className={cx('footer')}>
                <span className={cx('footer-text')}>
                    {isRegisterMode ? 'Bạn đã có tài khoản? ' : 'Bạn chưa có tài khoản? '}
                </span>
                <a href="facebook.com" className={cx('footer-link')} onClick={toggleMode}>
                    {isRegisterMode ? 'Đăng nhập' : 'Đăng ký'}
                </a>
            </div>
        </div>
    );
}

export default ModalLoginEmail;
