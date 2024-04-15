import {
    AnalystIcon,
    CommentIcon,
    DropdownIconNoFill,
    DropdownIconNoFillActive,
    FeedbackIcon,
    HomeIcon,
    ImgThumbIcon,
    PostIcon,
    TagCommentIcon,
    TiktokLogo,
    UploadVideoIcon,
} from 'src/components/Icons';
import style from './Upload.module.scss';
import classNames from 'classnames/bind';
import Menu from 'src/components/Popper/Menu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Images from 'src/components/Images';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/Button';
import { useRef } from 'react';

const cx = classNames.bind(style);
function Upload() {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const videoRef = useRef(null);
    const inputRef = useRef(null);

    // Hàm xử lý sự kiện click trên phần tử "Phân tích"
    const handlePhanTichClick = () => {
        setShowSubmenu(!showSubmenu); // Đảo ngược trạng thái hiển thị submenu
    };

    // Hàm xử lý sự kiện khi người dùng nhấp vào nút "Chọn tập tin"
    const handleChooseFile = () => {
        inputRef.current.click(); // Kích hoạt sự kiện click trên input để chọn tập tin
    };

    // Hàm xử lý sự kiện khi người dùng chọn tập tin
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // Sử dụng useEffect để cập nhật src của video khi selectedFile thay đổi
    useEffect(() => {
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);

            // Tải URL của tập tin video lên để hiển thị
            console.log(videoRef.current);
            console.log(`selectedFile`, selectedFile);

            if (videoRef.current) {
                videoRef.current.src = fileURL;
            }
        }
    }, [selectedFile]);

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
                        <li className={cx('sidebar-list_item', 'item-submenu')}>
                            <div className={cx('item-submenu_parent')} onClick={handlePhanTichClick}>
                                <div className={cx('sidebar-list_item-icon')}>
                                    <AnalystIcon />
                                </div>
                                <span>Phân tích</span>

                                {showSubmenu ? (
                                    <DropdownIconNoFillActive width={12} height={12} className={cx('dropdown-icon')} />
                                ) : (
                                    <DropdownIconNoFill width={12} height={12} className={cx('dropdown-icon')} />
                                )}
                            </div>

                            {showSubmenu && (
                                <ul className={cx('submenu')}>
                                    <li className={cx('submenu-item')}>
                                        <span>Số liệu chính</span>
                                    </li>
                                    <li className={cx('submenu-item')}>
                                        <span>Nội dung</span>
                                    </li>
                                    <li className={cx('submenu-item')}>
                                        <span>Follower</span>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className={cx('sidebar-list_item')}>
                            <div className={cx('sidebar-list_item-icon')}>
                                <FeedbackIcon />
                            </div>
                            <span>Phản hồi</span>
                        </li>
                    </ul>

                    <div className={cx('space')}></div>

                    <div className={cx('sidebar-footer')}>
                        <Link to="/" className={cx('sidebar-footer-link')}>
                            Quay lại tiktok
                        </Link>
                        <hr />
                        <div className={cx('sidebar-footer-dk')}>
                            <a href="facebook.com">
                                <span>Điều khoản dịch vụ</span>
                            </a>
                            <a href="facebook.com">
                                <span>Chính sách quyền riêng tư</span>
                            </a>
                            <a href="facebook.com">
                                <span>Bản quyền © 2024 TikTok </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={cx('main')}>
                    <div className={cx('container-upload')}>
                        <div className={cx('main-upload')}>
                            <div className={cx('main-upload_video')}>
                                <UploadVideoIcon width={48} height={48} className={cx('upload-video_icon')} />
                                <div className={cx('select-title')}>
                                    <span>Chọn video để tải lên</span>
                                </div>
                                <div className={cx('draw-title')}>
                                    <span>Kéo và thả tập tin</span>
                                </div>
                                <div className={cx('box-text')}>
                                    <p>Hỗ trợ định dạng video mp4, avi, webm và mov</p>
                                    <p>Độ phân giải 720x1280 trở lên</p>
                                    <p>Tối đa 10 phut</p>
                                    <p>Nhỏ hơn 10GB</p>
                                    <p>Dưới 30 video</p>
                                </div>

                                <Button primary className={cx('btn-upload-video')} onClick={handleChooseFile}>
                                    Chọn tập tin
                                </Button>
                                {/* Input ẩn cho phép người dùng chọn tập tin */}
                                <input
                                    ref={inputRef}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {/* Hiển thị tên của tập tin đã chọn nếu có */}
                                {selectedFile && (
                                    <div>
                                        <video controls ref={videoRef} width="320" height="240">
                                            <source src="" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <p>Tệp đã chọn: {selectedFile.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={cx('container-upload-after')}>
                        <div className={cx('upload-left')}>
                            <div className={cx('upload-after_header')}>
                                <h3>Tải video lên</h3>
                                <span>Đăng video vào tài khoản của bạn</span>
                            </div>

                            <div className={cx('upload-after_des')}>
                                <div className={cx('des-header')}>
                                    <span>Chú thích</span>
                                    <span>0 / 2000</span>
                                </div>
                                <div className={cx('des-input')}>
                                    <input type="text" />
                                    <div>
                                        <TagCommentIcon />
                                    </div>
                                </div>
                                <div className={cx('thumb')}>
                                    <h3>Ảnh bìa</h3>

                                    <div className={cx('thumb-upload')}>
                                        <div className={cx('thumb-upload_btn')}>
                                            <ImgThumbIcon width={28} height={24} />
                                            <span>Sửa ảnh bìa</span>
                                            <input type="file" />
                                        </div>
                                        <div className={cx('thumb-upload_img')}>
                                            <img src="" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('tag')}>
                                    <h3>Ai có thể xem video này</h3>
                                    {/* Options select */}
                                    <select>
                                        <option value="1">Tất cả mọi người</option>
                                        <option value="2">Bạn bè</option>
                                        <option value="3">Chỉ mình bạn</option>
                                    </select>
                                </div>

                                {/* Tag cho phép người dùng  */}

                                <div className={cx('allow-user')}>
                                    <div>
                                        <input type="checkbox" name="allow-user" id="allow-user" />
                                        <label htmlFor="allow-user">Bình luận</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="allow-duet" id="allow-duet" />
                                        <label htmlFor="allow-duet">Duet</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="allow-connect" id="allow-connect" />
                                        <label htmlFor="allow-connect">Ghép nối</label>
                                    </div>
                                </div>

                                <div className={cx('upload-after_footer')}>
                                    <Button primary>Đăng</Button>
                                    <button>Hủy bỏ</button>
                                </div>
                            </div>
                        </div>

                        <div className={cx('upload-right')}>
                            <div className={cx('main-upload')}>
                                <div className={cx('main-upload_video')}>
                                    <UploadVideoIcon width={48} height={48} className={cx('upload-video_icon')} />
                                    <div className={cx('select-title')}>
                                        <span>Chọn video để tải lên</span>
                                    </div>
                                    <div className={cx('draw-title')}>
                                        <span>Kéo và thả tập tin</span>
                                    </div>
                                    <div className={cx('box-text')}>
                                        <p>Hỗ trợ định dạng video mp4, avi, webm và mov</p>
                                        <p>Độ phân giải 720x1280 trở lên</p>
                                        <p>Tối đa 10 phut</p>
                                        <p>Nhỏ hơn 10GB</p>
                                        <p>Dưới 30 video</p>
                                    </div>

                                    <Button primary className={cx('btn-upload-video')} onClick={handleChooseFile}>
                                        Chọn tập tin
                                    </Button>
                                    {/* Input ẩn cho phép người dùng chọn tập tin */}
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    {/* Hiển thị tên của tập tin đã chọn nếu có */}
                                    {selectedFile && (
                                        <div>
                                            <video controls ref={videoRef} width="320" height="240">
                                                <source src="" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <p>Tệp đã chọn: {selectedFile.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
