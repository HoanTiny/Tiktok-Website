import classNames from 'classnames/bind';
import styles from './ModalSignUp.module.scss';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

import { CloseIcon, GoogleIcon, FacebookIcon, UserIcon, LineIcon, KakaoIcon } from '~/components/Icons';
import ModalLogin from '../ModalLogin';
import ModalSignUpEmailorPhone from './SignUpEmailorPhone/ModalSignUpEmailorPhone';
// import ModalLoginEmail from '../ModalLogin/ModalLoginEmail';

const StyledPopup = styled(Popup)`
    // use your custom style for ".popup-overlay"
    &-overlay {
        background: rgba(0, 0, 0, 0.5);
    }
    // use your custom style for ".popup-content"
    &-content {
        width: 483px;
        border-radius: 8px;
        transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
        transform: none;
        margin: auto;
        position: relative;
        height: 642px;
        overflow: hidden;
        display: flex;
        background-color: rgb(255, 255, 255);
    }
`;

const cx = classNames.bind(styles);

function ModalSignUp({ close }) {
    return (
        <div className={cx('modal')}>
            <button className={cx('close')} onClick={close}>
                <CloseIcon width="20px" height="20px" />
            </button>
            <div className={cx('header')}> Đăng ký Tiktok </div>
            <div className={cx('content')}>
                <StyledPopup
                    trigger={
                        <div className={cx('content-item')}>
                            <UserIcon />
                            <span>Sử dụng số điện thoại hoặc email</span>
                        </div>
                    }
                    modal
                >
                    {(close) => <ModalSignUpEmailorPhone close={close} />}
                </StyledPopup>

                <div className={cx('content-item')}>
                    <GoogleIcon />
                    <span>Tiếp tục với Google</span>
                </div>

                <div className={cx('content-item')}>
                    <FacebookIcon />
                    <span>Tiếp tục với Facebook</span>
                </div>

                <div className={cx('content-item')}>
                    <LineIcon />
                    <span>Tiếp tục với Line</span>
                </div>
                <div className={cx('content-item')}>
                    <KakaoIcon />
                    <span>Tiếp tục với Kakao</span>
                </div>
            </div>

            <div className={cx('dieukhoan')}>
                <p>
                    Bằng việc tiếp tục với tài khoản có vị trí tại <a href="/signup/country-selector">Vietnam</a>, bạn
                    đồng ý với{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/legal/terms-of-use?lang=vi-VN"
                    >
                        Điều khoản Sử dụng
                    </a>
                    , đồng thời xác nhận rằng bạn đã đọc{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/legal/privacy-policy?lang=vi-VN"
                    >
                        Chính sách Quyền riêng tư
                    </a>{' '}
                    của chúng tôi.
                </p>
            </div>
            <div className={cx('footer')}>
                <span className={cx('footer-text')}>Bạn đã có tài khoản? </span>
                <StyledPopup
                    trigger={
                        <div href="facebook.com" className={cx('footer-link')}>
                            Đăng nhập
                        </div>
                    }
                    // modal
                >
                    {(close) => <ModalLogin close={close} />}
                </StyledPopup>
            </div>
        </div>
    );
}

export default ModalSignUp;
