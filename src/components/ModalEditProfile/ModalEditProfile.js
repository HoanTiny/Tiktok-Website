import classNames from 'classnames/bind';
import styles from './ModalEditProfile.module.scss';
// import Popup from 'reactjs-popup';
// import styled from 'styled-components';
import { CloseIcon } from '../Icons';

// const StyledPopup = styled(Popup)`
//     // use your custom style for ".popup-overlay"
//     &-overlay {
//         background: rgba(0, 0, 0, 0.5);
//     }
//     // use your custom style for ".popup-content"
//     &-content {
//         max-width: 100vw;
//         max-height: 100vh;
//         border-radius: 8px;
//         transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
//         transform: none;
//         margin: auto;
//         position: relative;
//         overflow: hidden;
//         display: flex;
//         background-color: rgb(255, 255, 255);
//     }
// `;

const cx = classNames.bind(styles);

function ModalLogin({ close }) {
    return (
        <div className={cx('modal-edit-profile')}>
            <div className={cx('header-modal')}>
                <h1 className={cx('title')}>Chỉnh sửa trang cá nhân</h1>
                <button className={cx('btn-close')} onClick={close}>
                    <CloseIcon width="24px" height="24px" />
                </button>
            </div>
            <div className={cx('modal-content')}>
                <div className={cx('modal-avatar')}>
                    <div className={cx('modal-avatar_title')}>
                        <span>Ảnh hồ sơ</span>
                    </div>

                    <div className={cx('modal-avatar_change')}>
                        <img
                            src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-9/241164667_102334408188582_7471927689161966549_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=3Bz4ZQ0wz6EAX9J5WzR&_nc_ht=scontent.fhan3-1.fna&oh=3a1f1e7d3d4d6e7a6f7f3f3c3b3c3f3f&oe=615E3E5D"
                            alt="avatar"
                        />
                        <button type="">
                            <span>Thay đổi ảnh</span>
                        </button>
                    </div>
                </div>
                <div className={cx('modal-username')}>
                    <div className={cx('modal-username_title')}>
                        <span>TikTok ID</span>
                    </div>
                    <div className={cx('modal-username_change')}>
                        <input type="text" placeholder="Nhập tên người dùng" />
                        <span>www.tiktok.com/@imhoan24</span>
                        <span>
                            TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi TikTok
                            ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.
                        </span>
                    </div>
                </div>
                <div className={cx('modal-nickname')}>
                    <div className={cx('modal-nickname_title')}>
                        <span>Tên</span>
                    </div>
                    <div className={cx('modal-nickname_change')}>
                        <input type="text" placeholder="Nhập tên hiển thị" />
                        <span>Bạn chỉ có thể thay đổi biệt danh 7 ngày 1 lần</span>
                    </div>
                </div>
                <div className={cx('modal-bio')}>
                    <div className={cx('modal-bio_title')}>
                        <span>Bio</span>
                    </div>
                    <div className={cx('modal-bio_change')}>
                        <textarea placeholder="Nhập bio" />
                    </div>
                </div>
            </div>
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
