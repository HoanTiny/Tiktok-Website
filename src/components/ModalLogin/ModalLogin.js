import classNames from 'classnames/bind';
import styles from './ModalLogin.module.scss';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

import {
    CloseIcon,
    GoogleIcon,
    FacebookIcon,
    QRIcon,
    UserIcon,
    TwitterIcon,
    LineIcon,
    KakaoIcon,
    AppleIcon,
} from '~/components/Icons';
import ModalLoginEmail from './ModalLoginEmail';

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

function ModalLogin({ close }) {
    return (
        <div className={cx('modal')}>
            <button className={cx('close')} onClick={close}>
                <CloseIcon width="20px" height="20px" />
            </button>
            <div className={cx('header')}> Đăng nhập vào Tiktok </div>
            <div className={cx('content')}>
                <div className={cx('content-item')}>
                    <QRIcon />
                    <span>Sử dụng mã QR</span>
                </div>
                <StyledPopup
                    trigger={
                        <div className={cx('content-item')}>
                            <UserIcon />
                            <span>Số điện thoại / Email / TikTok ID</span>
                        </div>
                    }
                    modal
                >
                    {(close) => <ModalLoginEmail close={close} />}
                </StyledPopup>

                <StyledPopup
                    trigger={
                        <div className={cx('content-item')}>
                            <GoogleIcon />
                            <span>Tiếp tục với Google</span>
                        </div>
                    }
                    modal
                >
                    {(close) => <ModalLoginEmail close={close} />}
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
                    <TwitterIcon />
                    <span>Tiếp tục với Twitter</span>
                </div>

                <div className={cx('content-item')}>
                    <LineIcon />
                    <span>Tiếp tục với Line</span>
                </div>
                <div className={cx('content-item')}>
                    <KakaoIcon />
                    <span>Tiếp tục với Kakao</span>
                </div>

                <div className={cx('content-item')}>
                    <AppleIcon />
                    <span>Tiếp tục với Apple</span>
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
                <span className={cx('footer-text')}>Bạn không có tài khoản? </span>
                <a href="facebook.com" className={cx('footer-link')}>
                    Đăng ký
                </a>
            </div>
        </div>
    );
}

export default ModalLogin;
