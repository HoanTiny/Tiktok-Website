import classNames from 'classnames/bind';
import styles from './ModalLoginEmail.module.scss';

import { CloseIcon, BackIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function ModalLoginEmail({ close }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal-header')}>
                <button className={cx('back')}>
                    <BackIcon width="20px" height="20px" />
                </button>
                <button className={cx('close')} onClick={close}>
                    <CloseIcon width="20px" height="20px" />
                </button>
            </div>
            <div className={cx('header')}> Đăng nhập</div>
            <div className={cx('content')}>
                <div className={cx('content-header')}>
                    <div className={cx('content-header_phone')}>Điện thoại</div>
                    <a href="facebook.com" className={cx('content-header_text')}>
                        Đăng nhập bằng email hoặc TikTok ID
                    </a>
                </div>

                <div className={cx('content-input')}>
                    <select id="cars" name="cars">
                        <option value="volvo">Volvo XC90</option>
                        <option value="saab">Saab 95</option>
                        <option value="mercedes">Mercedes SLK</option>
                        <option value="audi">Audi TT</option>
                    </select>
                    <input type="text" className={cx('input-text')} placeholder="Số điện thoại" />
                </div>
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

export default ModalLoginEmail;
