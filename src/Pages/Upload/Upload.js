import { AnalystIcon, CommentIcon, FeedbackIcon, HomeIcon, PostIcon, TiktokLogo } from 'src/components/Icons';
import style from './Upload.module.scss';
import classNames from 'classnames/bind';
import Menu from 'src/components/Popper/Menu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Images from 'src/components/Images';

const cx = classNames.bind(style);
function Upload() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <TiktokLogo width={118} height={42} />
                <Menu>
                    <Images
                        src="https://p9-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/0091491d08933640cab7dfc531072b53.jpeg?lk3s=a5d48078&x-expires=1713081600&x-signature=anpdtrdN6xRnog6BLtjMZE%2BZKB0%3D"
                        className={cx('user-avatar')}
                        alt="Nguyen Van A"
                        fallback="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                    />
                </Menu>
            </header>

            <div className={cx('content')}>
                <div className={cx('sidebar')}>
                    <ul className={cx('sidebar-list')}>
                        <li className={cx('sidebar-list_item')}>
                            <button className={cx('btn-upload')}>Tải lên</button>
                        </li>
                        <li className={cx('sidebar-list_item')}>
                            <div className={cx('sidebar-list_item-icon')}>
                                <HomeIcon />
                            </div>
                            <span>Trang chủ</span>
                        </li>
                        <li className={cx('sidebar-list_item')}>
                            <div className={cx('sidebar-list_item-icon')}>
                                <PostIcon />
                            </div>
                            <span>Bài đăng</span>
                        </li>
                        <li className={cx('sidebar-list_item')}>
                            <div className={cx('sidebar-list_item-icon')}>
                                <CommentIcon />
                            </div>
                            <span>Bình luận</span>
                        </li>
                        <li className={cx('sidebar-list_item')}>
                            <div className={cx('sidebar-list_item-icon')}>
                                <AnalystIcon />
                            </div>
                            <span>Phân tích</span>

                            <ul className={cx('submenu')}>
                                <li className={cx('submenu-item')}>
                                    <span>Follower</span>
                                </li>
                                <li className={cx('submenu-item')}>
                                    <span>Nội dung chính</span>
                                </li>
                            </ul>
                        </li>
                        <li className={cx('sidebar-list_item')}>
                            <div className={cx('sidebar-list_item-icon')}>
                                <FeedbackIcon />
                            </div>
                            <span>Phản hồi</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('main')}>
                    <h1>Upload</h1>
                </div>
            </div>
        </div>
    );
}

export default Upload;
