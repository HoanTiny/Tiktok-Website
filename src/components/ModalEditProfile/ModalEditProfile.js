import classNames from 'classnames/bind';
import styles from './ModalEditProfile.module.scss';
import { CloseIcon, EditAvatarBtnIcon } from '../Icons';
import { useState } from 'react';
import updateProfile from 'src/services/updateUserService';
const cx = classNames.bind(styles);

function ModalLogin({ close, data }) {
    const [tiktokId, setTiktokId] = useState(data.nickname);
    const [name, setName] = useState(data.last_name);
    const [bio, setBio] = useState(data.bio);
    const [active, setActive] = useState(false);
    const [avatar, setAvatar] = useState(data.avatar);
    const [urlAvatar, setUrlAvatar] = useState(data.avatar);

    console.log('tiktokId', tiktokId);
    const handleChaneTiktokId = (e) => {
        const newValue = e.target.value;
        setTiktokId(newValue);
        if (newValue !== data.nickname) {
            setActive(true);
            console.log('tiktokId', newValue);
        } else {
            setActive(false);
        }
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
        if (e.target.value !== data.last_name) {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    const handleChangeBio = (e) => {
        setBio(e.target.value);
        if (e.target.value !== data.bio) {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(file); // Lưu trữ tệp trong state thay vì URL
            setUrlAvatar(imageUrl);
        }
    };

    const handleSave = async () => {
        // Tạo một đối tượng FormData mới
        const formData = new FormData();

        if (avatar !== data.avatar) {
            formData.append('avatar', avatar);
        }

        formData.append('last_name', name);
        formData.append('nickname', tiktokId);
        formData.append('bio', bio);
        localStorage.setItem('username', tiktokId);

        const result = await updateProfile(formData);
        console.log('result update profile: ', result);
        setActive(false); // Reset active state after successful save

        setTimeout(() => {
            window.location.href = `http://localhost:3000/@${tiktokId}`;
        }, 1500);
    };

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
                            <img src={urlAvatar} alt="avatar" />
                            <button className={cx('btn-change-avatar')}>
                                <label htmlFor="avatar-input" className={cx('btn-change-avatar')}>
                                    <EditAvatarBtnIcon width="16px" height="16px" />
                                </label>
                                <input
                                    id="avatar-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeAvatar}
                                    className={cx('input-file')}
                                />
                            </button>
                        </div>
                    </div>
                    <div className={cx('modal-username')}>
                        <div className={cx('modal-username_title')}>
                            <span>TikTok ID</span>
                        </div>
                        <div className={cx('modal-username_change')}>
                            <input
                                type="text"
                                placeholder="Nhập tên người dùng"
                                onChange={(e) => handleChaneTiktokId(e)}
                                value={tiktokId}
                            />
                            <span className={cx('modal-username_change-url')}>www.tiktok.com/@{tiktokId}</span>
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
                                onChange={(e) => handleChangeName(e)}
                                value={name}
                            />
                            <span>Bạn chỉ có thể thay đổi biệt danh 7 ngày 1 lần</span>
                        </div>
                    </div>
                    <div className={cx('modal-bio')}>
                        <div className={cx('modal-bio_title')}>
                            <span>Tiểu sử</span>
                        </div>
                        <div className={cx('modal-bio_change')}>
                            <textarea placeholder="Nhập bio" onChange={(e) => handleChangeBio(e)} value={bio} />

                            <div className={cx('modal-bio_couter')}>
                                <span>{bio.length}/80</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx('modal-button')}>
                <button className={cx('button-cancel')} onClick={close}>
                    <span>Hủy</span>
                </button>
                <button className={cx('button-save', { active: active }, { disable: !active })} onClick={handleSave}>
                    <span>Lưu</span>
                </button>
            </div>
        </div>
    );
}

export default ModalLogin;
