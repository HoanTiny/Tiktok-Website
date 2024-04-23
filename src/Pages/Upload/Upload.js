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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Images from 'src/components/Images';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/Button';
import { useRef } from 'react';
import createVideo from 'src/services/createNewVideoService';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from 'src/components/store';

const cx = classNames.bind(style);
function Upload() {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [thumb, setThumb] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedValue, setSelectedValue] = useState('public');
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [allowComment, setAllowComment] = useState(false);
    const [allowDuet, setAllowDuet] = useState(false);
    const [allowConnect, setAllowConnect] = useState(false);
    const [allows, setAllows] = useState([]);
    const [active, setActive] = useState(false);
    const [loadings, setLoadings] = useState(false);
    const [succes, setSucces] = useState(true);
    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const canvasRef = useRef(null);
    const { userAuth } = UserAuth();

    useEffect(() => {
        if (thumb) {
            handleCaptureThumbnail(); // Capture thumbnail at 10 seconds
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thumb]); // Call handleCaptureThumbnail whenever thumb changes

    const handleCaptureThumbnail = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const currentTime = video.currentTime;
        if (video && canvas) {
            // video.currentTime = timeInSeconds;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // làm tròn số nguyên

            setThumbnailFile(currentTime);
            console.log(currentTime.toFixed());
        }
    };

    const handleThumbClick = () => {
        setThumb(!thumb);
    };

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
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            console.log('videoUrl', videoUrl);
            setSelectedFile(file);
        }
    };

    // Hàm xử lý khi người dùng hủy video
    const handleCancelVideo = () => {
        setThumb(false);
        setSelectedFile(null);
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

    // Handle change description
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
        if (e.target.value !== '') {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    // Handle change select option

    const handleChangeOption = (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value !== '') {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    // Handle change checkbox
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        switch (name) {
            case 'comment':
                if (checked) {
                    setAllows((prevAllows) => [...prevAllows, name]);
                } else {
                    if (allows.indexOf(name) !== -1) {
                        allows.splice(allows.indexOf(name), 1);
                    }
                }

                setAllowComment(checked);
                console.log('allows', allows);
                break;
            case 'duet':
                if (checked) {
                    setAllows((prevAllows) => [...prevAllows, name]);
                } else {
                    if (allows.indexOf(name) !== -1) {
                        allows.splice(allows.indexOf(name), 1);
                    }
                }
                setAllowDuet(checked);
                console.log('allows', allows);
                break;
            case 'stitch':
                if (checked) {
                    setAllows((prevAllows) => [...prevAllows, name]);
                } else {
                    if (allows.indexOf(name) !== -1) {
                        allows.splice(allows.indexOf(name), 1);
                    }
                }
                setAllowConnect(checked);
                console.log('allows', allows);
                break;
            default:
                break;
        }
    };

    //Handle reset state
    const handleReset = () => {
        setAllowComment(false);
        setAllowDuet(false);
        setAllowConnect(false);
        setAllows([]);
        setDescription('');
        setSelectedFile(null);
        setThumbnailFile(null);
        setThumb(false);
        setSelectedValue('public');
        setSucces(false);
    };

    // Handle post data changes
    const handleSubmit = async () => {
        // Tạo một đối tượng FormData mới
        const formData = new FormData();

        // Thêm dữ liệu vào formData
        formData.append('description', description);
        formData.append('upload_file', selectedFile);
        formData.append('thumbnail_time', thumbnailFile);
        formData.append('music', 'Hot Trend Tiktok 2023 Music!');
        formData.append('viewable', selectedValue);
        for (let i = 0; i < allows.length; i++) {
            formData.append('allows[]', allows[i]);
        }
        console.log(allows);
        console.log('Dữ liệu', description, selectedFile, thumbnailFile, '', selectedValue, allows);
        // Gọi hàm tạo video mới từ service
        const result = await createVideo(formData);
        console.log('result', result);
        if (result) {
            setSucces(true);
        }
        setLoadings(false);
    };

    const handleClick = () => {
        if (active) {
            setLoadings(true);
            handleSubmit();
        }
    };

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
                        <Link to={`/`} className={cx('sidebar-list_item')}>
                            <div className={cx('sidebar-list_item-icon')}>
                                <HomeIcon />
                            </div>
                            <span>Trang chủ</span>
                        </Link>
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
                    {!selectedFile ? (
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
                    ) : (
                        <div className={cx('container-upload-after')}>
                            <div className={cx('upload-left')}>
                                <div className={cx('upload-after_header')}>
                                    <h3>Tải video lên</h3>
                                    <span>Đăng video vào tài khoản của bạn</span>
                                </div>

                                <div className={cx('upload-after_des')}>
                                    <div className={cx('des-header')}>
                                        <span>Chú thích</span>
                                        <span>{description.length} / 2000</span>
                                    </div>
                                    <div className={cx('des-input')}>
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => handleChangeDescription(e)}
                                        />
                                        <div>
                                            <TagCommentIcon />
                                        </div>
                                    </div>
                                    <div className={cx('thumb')}>
                                        <h3>Ảnh bìa</h3>

                                        <div className={cx('thumb-upload')}>
                                            {!thumb ? (
                                                <div onClick={handleThumbClick} className={cx('thumb-upload_btn')}>
                                                    <ImgThumbIcon width={28} height={24} />
                                                    <span>Sửa ảnh bìa</span>
                                                    <input type="file" />
                                                </div>
                                            ) : (
                                                <div onClick={handleThumbClick} className={cx('thumb-upload_btn')}>
                                                    <canvas
                                                        ref={canvasRef}
                                                        style={{ width: '100%', height: '100%' }}
                                                    ></canvas>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <ImgThumbIcon width={28} height={24} />
                                                        <span>Sửa ảnh bìa</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={cx('tag')}>
                                        <h3>Ai có thể xem video này</h3>
                                        <select
                                            className={cx('form-select')}
                                            aria-label="Default select example"
                                            value={selectedValue}
                                            onChange={handleChangeOption}
                                        >
                                            <option value="public">Tất cả mọi người</option>
                                            <option value="friends" className={cx('option-friend')}>
                                                Bạn bè
                                            </option>
                                            <option value="private">Chỉ mình bạn</option>
                                        </select>
                                        {/* Options select */}
                                    </div>

                                    {/* Tag cho phép người dùng  */}

                                    <div className={cx('allow-user')}>
                                        <div className={cx('allow-user-item')}>
                                            <input
                                                type="checkbox"
                                                name="comment"
                                                id="comment"
                                                checked={allowComment}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor="comment">Bình luận</label>
                                        </div>
                                        <div className={cx('allow-user-item')}>
                                            <input
                                                type="checkbox"
                                                name="duet"
                                                id="duet"
                                                checked={allowDuet}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor="duet">Duet</label>
                                        </div>
                                        <div className={cx('allow-user-item')}>
                                            <input
                                                type="checkbox"
                                                name="stitch"
                                                id="stitch"
                                                checked={allowConnect}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor="stitch">Ghép nối</label>
                                        </div>
                                    </div>

                                    <div className={cx('upload-after_footer')}>
                                        <Button outline className={cx('btn-cancel')} onClick={handleReset}>
                                            Hủy bỏ
                                        </Button>
                                        <Button
                                            primary
                                            className={cx('btn-sub', { active: active }, { disable: !active })}
                                            onClick={handleClick}
                                        >
                                            Đăng
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('upload-right')}>
                                <div className={cx('main-upload')}>
                                    <div>
                                        {/* Hiển thị tên của tập tin đã chọn nếu có */}
                                        {selectedFile ? (
                                            <div className={cx('main-upload_video', 'video')}>
                                                <video controls ref={videoRef} width="320" height="240">
                                                    <source src="" type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                {/* <p>Tệp đã chọn: {selectedFile.name}</p> */}
                                                <Button onClick={handleCancelVideo} className={cx('btn-cancel-video')}>
                                                    Hủy
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className={cx('main-upload_video')}>
                                                <UploadVideoIcon
                                                    width={48}
                                                    height={48}
                                                    className={cx('upload-video_icon')}
                                                />
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

                                                <Button
                                                    primary
                                                    className={cx('btn-upload-video')}
                                                    onClick={handleChooseFile}
                                                >
                                                    Chọn tập tin
                                                </Button>
                                                {/* Input ẩn cho phép người dùng chọn tập tin */}
                                                <input
                                                    ref={inputRef}
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={cx('loading')}>
                                {loadings && (
                                    <div className={cx('loading-overlay')}>
                                        <FontAwesomeIcon icon={faSpinner} spin className={cx('loading-overlay_icon')} />
                                    </div>
                                )}
                            </div>

                            {succes && (
                                <div className={cx('upload-success')}>
                                    <h3>Đăng video thành công</h3>
                                    <Button primary className={cx('btn-manage_video')}>
                                        <Link to={`/@${userAuth}`}>Quản lý video</Link>
                                    </Button>
                                    <Button outline className={cx('btn-continune_upload')} onClick={handleReset}>
                                        Tiếp tục đăng video
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Upload;
