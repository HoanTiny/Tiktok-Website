import classNames from 'classnames/bind';
import styles from './ModalEditProfile.module.scss';
import { CloseIcon, EditAvatarBtnIcon } from '../Icons';

const cx = classNames.bind(styles);

function ModalLogin({ close, data }) {
    return (
        <div className={cx('modal-edit-profile')}>
            <div className={cx('header-modal')}>
                <h1 className={cx('title')}>Chỉnh sửa trang cá nhân</h1>
                <button className={cx('btn-close')} onClick={close}>
                    <CloseIcon width="24px" height="24px" />
                </button>
            </div>
            {data && (
                <div className={cx('modal-content')}>
                    <div className={cx('modal-avatar')}>
                        <div className={cx('modal-avatar_title')}>
                            <span>Ảnh hồ sơ</span>
                        </div>

                        <div className={cx('modal-avatar_change')}>
                            <img src={data.avatar} alt="avatar" />
                            <button className={cx('btn-change-avatar')}>
                                <EditAvatarBtnIcon width="16px" height="16px" />
                            </button>
                        </div>
                    </div>
                    <div className={cx('modal-username')}>
                        <div className={cx('modal-username_title')}>
                            <span>TikTok ID</span>
                        </div>
                        <div className={cx('modal-username_change')}>
                            <input type="text" placeholder="Nhập tên người dùng" value={data.nickname} />
                            <span className={cx('modal-username_change-url')}>www.tiktok.com/@imhoan24</span>
                            <span className={cx('modal-username_change-des')}>
                                TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi
                                TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.
                            </span>
                        </div>
                    </div>
                    <div className={cx('modal-nickname')}>
                        <div className={cx('modal-nickname_title')}>
                            <span>Tên</span>
                        </div>
                        <div className={cx('modal-nickname_change')}>
                            <input
                                type="text"
                                placeholder="Nhập tên hiển thị"
                                value={data.first_name + ' ' + data.last_name}
                            />
                            <span>Bạn chỉ có thể thay đổi biệt danh 7 ngày 1 lần</span>
                        </div>
                    </div>
                    <div className={cx('modal-bio')}>
                        <div className={cx('modal-bio_title')}>
                            <span>Tiểu sử</span>
                        </div>
                        <div className={cx('modal-bio_change')}>
                            <textarea placeholder="Nhập bio" value={data.bio} />

                            <div className={cx('modal-bio_couter')}>
                                <span>27/80</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx('modal-button')}>
                <button className={cx('button-cancel')} onClick={close}>
                    <span>Hủy</span>
                </button>
                <button className={cx('button-save')}>
                    <span>Lưu</span>
                </button>
            </div>
        </div>
    );
}

export default ModalLogin;
