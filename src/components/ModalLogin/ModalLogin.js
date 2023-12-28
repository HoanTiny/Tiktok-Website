import classNames from 'classnames/bind';
import styles from './ModalLogin.module.scss';

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

                <div className={cx('content-item')}>
                    <UserIcon />
                    <span>Số điện thoại / Email / TikTok ID</span>
                </div>

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
                <p class="css-sai453-PText e1sbfgbz1">
                    Bằng việc tiếp tục với tài khoản có vị trí tại{' '}
                    <a href="/signup/country-selector" class="css-t5chka-ALink epl6mg0">
                        Vietnam
                    </a>
                    , bạn đồng ý với{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/legal/terms-of-use?lang=vi-VN"
                        class="css-1w6usl4-ALink e1sbfgbz2"
                    >
                        Điều khoản Sử dụng
                    </a>
                    , đồng thời xác nhận rằng bạn đã đọc{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/legal/privacy-policy?lang=vi-VN"
                        class="css-1w6usl4-ALink e1sbfgbz2"
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
