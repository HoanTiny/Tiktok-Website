import classNames from 'classnames/bind';
import style from './DetailVideo.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from 'react-loading-skeleton';
import getVideoService from 'src/services/getVideoService';
import getCommentListService from 'src/services/getCommentsService';
import createComment from 'src/services/createCommentService';
import { createRef, useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BookMarkIcon,
    CloseIcon,
    CommentIcon,
    EnbedIcon,
    FlagIcon,
    MoreIcon,
    MusicIcon,
    PlayIconTranperant,
    Recycle,
    SendFriendIcon,
    ShareFBIcon,
    ShareIcon,
    TwitterIcon,
    TymActiveIcon,
    TymCommentIcon,
    TymIcon,
    WhatsAppIcon,
} from 'src/components/Icons';
import Search from 'src/layouts/components/Search';
import InputComment from 'src/components/InputComment';
import { UserAuth } from 'src/components/store';
import deleteComment from 'src/services/deleteCommentService';
import ModalDeleteComment from 'src/components/ModalDeleteComment';
import likeVideoServirvice from 'src/services/likeVideoService';
import unlikeVideoServirvice from 'src/services/unlikeVideoService';
import unlikeCommentService from 'src/services/unLikeCommentService';
import likeCommentService from 'src/services/likeCommentService';
import getVideoUserService from 'src/services/getVideoUserService';

const cx = classNames.bind(style);

const StyledPopup = styled(Popup)`
    // use your custom style for ".popup-overlay"
    &-overlay {
        background: rgba(0, 0, 0, 0.5);
    }
    // use your custom style for ".popup-content"
    &-content {
        border-radius: 8px;
        transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
        transform: none;
        margin: auto;
        position: relative;
        overflow: hidden;
        display: flex;
        background-color: rgb(255, 255, 255);
    }
`;

export default function DetailsVideo() {
    const [video, setVideo] = useState({});
    const [comments, setComment] = useState({});
    const [value, setValue] = useState(0);
    const [activeReplyIndex, setActiveReplyIndex] = useState(null);
    const [likeCount, setLikeCount] = useState(video.likes_count);
    const [isLiked, setIsLiked] = useState(video.is_liked);
    const [loading, setLoading] = useState(true);
    const [currentHoveredVideoId, setCurrentHoveredVideoId] = useState(null);
    const [videoUsers, setVideoUser] = useState();
    const [hideComment, setHideComment] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [totalTime, setTotalTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const { userAuth } = UserAuth();
    const currentURL = window.location.href;
    const inputRefs = useRef([]);
    const videoRef = useRef();

    const handleLoadedMetadata = () => {
        const duration = videoRef.current.duration;
        console.log(`Loading metadata`, duration);
        setTotalTime(duration);
    };

    const handleTimeUpdate = () => {
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime / videoRef.current.duration) * 100;
        setCurrentTime(Math.floor(videoRef.current.currentTime));
        // setSliderValue((videoRef.current.currentTime / totalTime) * 100);
        console.log(`totalTime`, totalTime);
        setSliderValue(progress);
    };

    const handleSliderChange = (event) => {
        const tempSliderValue = event.target.value;
        setSliderValue(tempSliderValue);

        const time = (tempSliderValue / 100) * videoRef.current.duration;
        videoRef.current.currentTime = time;

        const progress = (tempSliderValue / 100) * 100;
        event.target.style.background = `linear-gradient(to right, #fff ${progress}%, rgba(255, 255, 255, 0.34) ${progress}%)`;
    };

    const formatTime = (currentTime) => {
        console.log('currentTime', currentTime);
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };
    // Lấy đoạn cuối cùng của đường dẫn URL
    const pathSegments = currentURL.split('/');
    const videoId = pathSegments[pathSegments.length - 1];

    const notifyComment = () => {
        toast.success('Comment thành công !', {
            position: 'top-center',
            autoClose: 1000,
        });
    };

    const notifyDelComment = () => {
        toast.success('Xóa thành công !', {
            position: 'top-center',
            autoClose: 1000,
        });
    };

    const StyledTabs = styled((props) => (
        <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
    ))({
        borderBottom: '1px solid #e8e8e8',
        padding: '0 32px',
        marginTop: '16px',
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#1890ff',
        },
        '& .MuiTabs-indicatorSpan': {
            // maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    });

    const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: '16px',
        marginRight: theme.spacing(1),
        color: 'rgba(0, 0, 0, 0.7)',
        '&.Mui-selected': {
            color: '#000',
            fontSize: '16px',
            fontWeight: '700',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
        '&:hover': {
            color: '#000',
            opacity: 1,
        },
        display: 'flex',
        flex: 1,
    }));

    useEffect(() => {
        getVideoService(videoId)
            .then((res) => {
                setVideo(res);
                setLikeCount(res.likes_count);
                // console.log('Check video: ', video);
            })
            .catch((error) => {
                console.log('error', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Bắt đầu loading
                const response = await getCommentListService(videoId);
                setComment(response);
                console.log('Comments: ', response);
            } catch (error) {
                console.log('error', error);
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    // Yêu thích video
    const handleLikeVideo = (id) => {
        console.log(`id`, id);
        if (video.is_liked) {
            unlikeVideoServirvice(id)
                .then((data) => {
                    setIsLiked(false);
                    setLikeCount(data.likes_count);
                })
                .catch((error) => {
                    console.error('Error while fetching like video:', error);
                });
            return;
        } else {
            likeVideoServirvice(id)
                .then((data) => {
                    setIsLiked(true);
                    setLikeCount(data.likes_count);
                })
                .catch((error) => {
                    console.error('Error while fetching like video:', error);
                });
        }
    };

    useEffect(() => {
        if (video.is_liked) {
            setIsLiked(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.is_liked]);

    // Get list video user
    useEffect(() => {
        // console.log('Listing video', video);
        if (video.user && video.user.nickname) {
            // Kiểm tra xem video.user và video.user.nickname có tồn tại hay không
            getVideoUserService(video.user.nickname)
                .then((res) => {
                    setVideoUser(res);
                    console.log('Video User: ', res);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.user]);

    // Fuc update comment after user like comment

    //Like comment
    const handleLikeComment = (id) => {
        comments.forEach((comment) => {
            if (comment.id === id) {
                if (comment.is_liked) {
                    unlikeCommentService(id)
                        .then((data) => {
                            setComment((prevComments) => {
                                return prevComments.map((comment) => {
                                    if (comment.id === id) {
                                        return {
                                            ...comment,
                                            is_liked: !comment.is_liked,
                                            likes_count: data.likes_count,
                                        };
                                    }
                                    return comment;
                                });
                            });
                        })
                        .catch((error) => {
                            console.error('Error while fetching like video:', error);
                        });
                } else {
                    likeCommentService(id)
                        .then((data) => {
                            setComment((prevComments) => {
                                return prevComments.map((comment) => {
                                    if (comment.id === id) {
                                        return {
                                            ...comment,
                                            is_liked: !comment.is_liked,
                                            likes_count: data.likes_count,
                                        };
                                    }
                                    return comment;
                                });
                            });
                        })
                        .catch((error) => {
                            console.error('Error while fetching like video:', error);
                        });
                }
            }
        });
    };

    useEffect(() => {
        // Reset refs array
        inputRefs.current = Array(comments.length)
            .fill()
            .map((_, i) => inputRefs.current[i] || createRef());
    }, [comments]);

    // Tạo bình luận
    const handleCreateComment = (value) => {
        // Thực hiện các thao tác cần thiết với giá trị valueInput
        // console.log('Comments: ', value);
        createComment(videoId, value)
            .then((res) => {
                console.log('Comments: ', value);
                setTimeout(() => {
                    notifyComment();
                    setComment([...comments, res]);
                }, 2000);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    // Xóa comments
    const handleDeletComments = (idComment) => {
        deleteComment(idComment)
            .then((comment) => {
                console.log('comment', idComment);
                const updatedComments = comments.filter((comment) => comment.id !== idComment);
                setComment(updatedComments);
                notifyDelComment();
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    // Handle hover video
    const handleHoverVideo = (idVideo) => {
        setCurrentHoveredVideoId(idVideo);
    };

    const handleLeaveHoverVideo = () => {
        setCurrentHoveredVideoId();
    };

    const urlVideo = video.file_url;

    function getDate(dateInput) {
        var date = new Date(dateInput);
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    //Tính toán thời gian comments

    function getDistanceTime(index) {
        var commentTime;
        if (comments && comments.length > 0) {
            commentTime = new Date(comments[index].updated_at);
        }

        // Sử dụng moment và định dạng tiếng Việt
        const distance = moment(commentTime).locale('vi').fromNow();

        // Tính số ngày chênh lệch
        const secondsDiff = moment().diff(commentTime, 'seconds');
        const daysDiff = moment().diff(commentTime, 'days');
        const yearsDiff = moment().diff(commentTime, 'years');

        // Tùy chỉnh hiển thị cho khoảng thời gian từ 0 đến 44 giây

        if (secondsDiff < 60) {
            return `${secondsDiff} giây trước`;
        }

        // Nếu số ngày chênh lệch lớn hơn 7, hiển thị ngày tháng bình luận
        if (daysDiff > 7) {
            return moment(commentTime).format('DD-MM');
        }

        // Nếu số ngày chênh lệch là 7, hiển thị "1 tuần trước"
        if (daysDiff === 7) {
            return '1 tuần trước';
        }

        // Nếu số năm chênh lệch lớn hơn 1, hiển thị ngày tháng năm bình luận
        if (yearsDiff > 1) {
            return moment(commentTime).format('DD-MM-YYYY');
        }

        // Chuyển đổi kết quả từ tiếng Anh sang tiếng Việt
        const vietnameseDistance = distance
            .replace('a few seconds ago', 'vài giây trước')
            .replace('a minute ago', 'một phút trước')
            .replace('minutes ago', 'phút trước')
            .replace('an hour ago', 'một giờ trước')
            .replace('hours ago', 'giờ trước')
            .replace('a day ago', 'một ngày trước')
            .replace('days ago', 'ngày trước')
            .replace('a month ago', 'một tháng trước')
            .replace('months ago', 'tháng trước')
            .replace('a year ago', 'một năm trước')
            .replace('years ago', 'năm trước');

        return vietnameseDistance;
    }

    function copyText() {
        // Get the text field
        var copyText = document.querySelector('.text-url');
        // Create a range object
        const range = document.createRange();
        range.selectNode(copyText);
        console.log(range);
        // Select the range
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Copy the selected text
        document.execCommand('copy');

        // Deselect the text
        window.getSelection().removeAllRanges();

        // Log a message or perform any action to indicate successful copying
        console.log('Link copied to clipboard:', copyText.textContent);

        // Alert the copied text
        alert('Copied the text: ' + copyText.textContent);
    }

    function replyComments(index) {
        // setActiveReply(true);
        setActiveReplyIndex(index);

        // setTimeout(() => {
        //     console.log('Reply', inputRefs.current);
        //     inputRefs.current[index]?.current?.focus();
        // }, 100);
        // setTimeout(() => {
        //     inputRefs.current[index].focusInput();
        // }, 100);
    }

    useEffect(() => {
        if (activeReplyIndex !== null) {
            inputRefs.current[activeReplyIndex]?.focusInput();
        }
    }, [activeReplyIndex]);

    function closeComment() {
        setActiveReplyIndex(null);
    }

    // function viewComment() {
    //     setMoreComment(true);
    // }

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 2 }}>
                        <Typography component="div">{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <header className={cx('video-container__header')}>
                    <div className={cx('icon-close')}>
                        <CloseIcon width="40px" height="40px" />
                    </div>

                    <Search className={cx('input-search')} bgrInput={true} placeholder={true} />
                    <MoreIcon width="48px" height="48px" className={cx('icon-more')} />
                </header>
                {video && video.user && (
                    <>
                        <div className={cx('video-container_imgBlur')}>
                            <span className={cx('video-thumb')}>
                                <picture>
                                    <img
                                        alt=""
                                        decoding="async"
                                        srcSet={video.thumb_url}
                                        src={video.thumb_url}
                                        imagex-type="react"
                                        imagex-version="0.3.10"
                                    />
                                </picture>
                            </span>
                        </div>
                        <div className={cx('video-container_img')}>
                            <div className={cx('video-container_img--video')}>
                                <video
                                    autoPlay
                                    src={urlVideo}
                                    ref={videoRef}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onTimeUpdate={handleTimeUpdate}
                                >
                                    <source src={urlVideo} type="video/mp4" />
                                </video>
                                <div className={cx('range')}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={sliderValue}
                                        onChange={handleSliderChange}
                                        style={{
                                            background: `linear-gradient(to right, #fff ${sliderValue}%, rgba(255, 255, 255, 0.34) ${sliderValue}%)`,
                                        }}
                                    />
                                    <div className={cx('value')}>
                                        {formatTime(currentTime)}/{formatTime(totalTime)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {video && video.user && (
                <div className={cx('detail-video-right')}>
                    <div className={cx('video-info')}>
                        <div className={cx('video-author')}>
                            <div className={cx('video-author__header')}>
                                <div className={cx('video-author__header')}>
                                    <img
                                        className={cx('video-author__header-avatar')}
                                        alt="Ảnh đại diện của người đăng video"
                                        src={video.user.avatar || 'Đường dẫn đến ảnh thay thế'}
                                    />
                                    <a href="hi" className={cx('video-author__header-info')}>
                                        <h4>{video.user.nickname}</h4>
                                        <p>
                                            {`${video.user.first_name || 'First Name'} ${
                                                video.user.last_name || 'Last Name'
                                            }`}
                                            <span className={cx('dot')}> · </span>
                                            <span>{getDate(video.created_at)}</span>
                                        </p>
                                    </a>
                                </div>
                            </div>

                            <div className={cx('video-author__info')}>
                                <div className={cx('video-description')}>
                                    <p>{video.description}</p>
                                </div>
                                <div className={cx('video-music')}>
                                    <MusicIcon className={cx('video-music__icon')} />
                                    <span>{video.music || `Nhạc của ${video.user.nickname}`}</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('video-irt')}>
                            <div className={cx('video-irt__main')}>
                                <div className={cx('video-irt__main-like')}>
                                    <div className={cx('irt-icon')} onClick={() => handleLikeVideo(video.uuid)}>
                                        {video.is_liked}
                                        {isLiked ? <TymActiveIcon /> : <TymIcon />}
                                    </div>
                                    <div>{likeCount}</div>
                                </div>
                                <div className={cx('video-irt__main-comment')}>
                                    <div className={cx('irt-icon')}>
                                        <CommentIcon />
                                    </div>
                                    <div>{video.comments_count}</div>
                                </div>
                                <div className={cx('video-irt__main-bookmark')}>
                                    <div className={cx('irt-icon')}>
                                        <BookMarkIcon />
                                    </div>
                                    <div>1</div>
                                </div>
                            </div>

                            <div className={cx('video-irt__share')}>
                                <EnbedIcon />
                                <SendFriendIcon />
                                <ShareFBIcon />
                                <WhatsAppIcon />
                                <TwitterIcon />
                                <ShareIcon />
                            </div>
                        </div>

                        <div className={cx('video-link')}>
                            <span className={cx('text-url')}>{currentURL}</span>
                            <button type="button" onClick={copyText}>
                                Sao chép liên kết
                            </button>
                        </div>

                        <div>
                            <Box
                                className={cx('tab-cm')}
                                sx={{
                                    maxWidth: { xs: 320, sm: 100 + '%' },
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <StyledTabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="styled scrollable auto tabs example"
                                    centered
                                >
                                    <StyledTab
                                        label={`Bình Luận (${comments.length})`}
                                        onClick={() => setHideComment(false)}
                                    />
                                    <StyledTab
                                        label="Video của nhà sáng tạo"
                                        iconPosition="start"
                                        onClick={() => setHideComment(true)}
                                    />
                                </StyledTabs>
                                <CustomTabPanel value={value} index={0}>
                                    <div className={cx('comment-container')}>
                                        <div className={cx('comment-container__list')}>
                                            {loading ? (
                                                // Hiển thị skeleton khi đang tải dữ liệu
                                                [...Array(5)].map((_, index) => (
                                                    <div className={cx('comment-container__list-item')} key={index}>
                                                        <div className={cx('comment-container__list-item-info')}>
                                                            <h4 className={cx('comment-username')}>
                                                                <Skeleton height={20} width={200} />
                                                            </h4>
                                                            <p className={cx('comment-value')}>
                                                                <Skeleton count={3} />
                                                            </p>
                                                            <div className={cx('comment-irt')}>
                                                                <span className={cx('comment-irt__time')}>
                                                                    <Skeleton height={20} width={100} />
                                                                </span>
                                                                <span className={cx('comment-irt__reply')}>
                                                                    <Skeleton height={20} width={100} />
                                                                </span>
                                                            </div>
                                                            <div className={cx('comment-user')}>
                                                                <div className={cx('comment-user__input')}>
                                                                    <input placeholder="Thêm câu trả lời..." />
                                                                    <Skeleton height={20} width={20} />
                                                                    <Skeleton height={20} width={20} />
                                                                </div>
                                                                <button type="button" className={cx('btn-submit')}>
                                                                    <Skeleton height={20} width={50} />
                                                                </button>
                                                                <div className={cx('close-icon')}>
                                                                    <Skeleton height={20} width={20} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('comment-container__list-item-like')}>
                                                            <MoreIcon
                                                                className={cx('more-icon')}
                                                                width="32px"
                                                                height="32px"
                                                            />
                                                            <TymCommentIcon className={cx('tym-cm-icon')} />
                                                            <p>
                                                                <Skeleton height={20} width={20} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : comments && comments.length > 0 ? (
                                                comments.map((comment, index) => (
                                                    <div className={cx('comment-container__list-item')} key={index}>
                                                        <img
                                                            className={cx('comment-container__list-item-avatar')}
                                                            alt="Ảnh đại diện của người dùng"
                                                            src={comment.user.avatar || 'Đường dẫn đến ảnh thay thế'}
                                                        />
                                                        <div className={cx('comment-container__list-item-info')}>
                                                            <h4 className={cx('comment-username')}>
                                                                {comment.user.nickname}
                                                            </h4>
                                                            <p className={cx('comment-value')}>{comment.comment}</p>
                                                            <div className={cx('comment-irt')}>
                                                                <span className={cx('comment-irt__time')}>
                                                                    {getDistanceTime(index)}
                                                                </span>
                                                                <span
                                                                    className={cx('comment-irt__reply')}
                                                                    onClick={() => replyComments(index)}
                                                                >
                                                                    Trả lời
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    'comment-user',
                                                                    activeReplyIndex === index ? 'active' : '',
                                                                )}
                                                            >
                                                                <InputComment
                                                                    handleCreateComment={handleCreateComment}
                                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                                />
                                                                /
                                                                {/* <div className={cx('comment-user__input')}>
                                                                          <input
                                                                              ref={inputRefs.current[index]}
                                                                              placeholder="Thêm câu trả lời..."
                                                                              onInput={(e) => {
                                                                                  handleActiveBtn(e, index);
                                                                              }}
                                                                          />
                                                                          <TagCommentIcon
                                                                              className={cx('comment-user__input-icon')}
                                                                          />
                                                                          <EmojiIcon
                                                                              className={cx('comment-user__input-icon')}
                                                                          />
                                                                      </div> */}
                                                                {/* <button
                                                                          type="button"
                                                                          className={cx(
                                                                              'btn-submit',
                                                                              activeBtn ? 'active' : '',
                                                                          )}
                                                                      >
                                                                          Đăng
                                                                      </button> */}
                                                                <div
                                                                    className={cx('close-icon')}
                                                                    onClick={closeComment}
                                                                >
                                                                    <CloseIcon width="20px" height="20px" />
                                                                </div>
                                                            </div>
                                                            {/* <div className={cx('comment-count')}>
                                                                <div
                                                                    className={cx(
                                                                        'comment-count__main',
                                                                        moreComment ? 'active' : '',
                                                                    )}
                                                                >
                                                                    <img
                                                                        className={cx(
                                                                            'comment-container__list-item-avatar',
                                                                        )}
                                                                        alt="Ảnh đại diện của người dùng"
                                                                        src={
                                                                            video.user.avatar ||
                                                                            'Đường dẫn đến ảnh thay thế'
                                                                        }
                                                                    />
                                                                    <div
                                                                        className={cx('comment-container__list-item-info')}
                                                                    >
                                                                        <h4 className={cx('comment-username')}>
                                                                            Lựu đạn xào xả ớt
                                                                        </h4>
                                                                        <p className={cx('comment-value')}>
                                                                            Chào mọi người nhé, mình là Hoàn
                                                                        </p>
                                                                        <div className={cx('comment-irt')}>
                                                                            <span className={cx('comment-irt__time')}>
                                                                                1 ngày trước
                                                                            </span>
                                                                            <span
                                                                                className={cx('comment-irt__reply')}
                                                                                onClick={replyComments}
                                                                            >
                                                                                Trả lời
                                                                            </span>
                                                                        </div>
                                                                        <div
                                                                            className={cx(
                                                                                'comment-user',
                                                                                activeReplyIndex === index ? 'active' : '',
                                                                            )}
                                                                        >
                                                                            <div className={cx('comment-user__input')}>
                                                                                <input
                                                                                    ref={(el) =>
                                                                                        (inputRefs.current[index] = el)
                                                                                    }
                                                                                    placeholder="Thêm câu trả lời..."
                                                                                />
                                                                                <TagCommentIcon
                                                                                    className={cx(
                                                                                        'comment-user__input-icon',
                                                                                    )}
                                                                                />
                                                                                <EmojiIcon
                                                                                    className={cx(
                                                                                        'comment-user__input-icon',
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                className={cx('btn-submit')}
                                                                            >
                                                                                Đăng
                                                                            </button>
                                                                            <div
                                                                                className={cx('close-icon')}
                                                                                onClick={closeComment}
                                                                            >
                                                                                <CloseIcon width="20px" height="20px" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p
                                                                    className={cx('comment-count__more')}
                                                                    onClick={viewComment}
                                                                >
                                                                    Xem 13 câu trả lời{' '}
                                                                    <ArrowIcon width="10px" height="10px" />
                                                                </p>
                                                            </div> */}
                                                        </div>
                                                        <div className={cx('comment-container__list-item-like')}>
                                                            <MoreIcon
                                                                className={cx('more-icon')}
                                                                width="32px"
                                                                height="32px"
                                                            />

                                                            <div className={cx('popup-comment')}>
                                                                {comment.user.nickname === userAuth ? (
                                                                    <div className={cx('popup-comment_item')}>
                                                                        <StyledPopup
                                                                            trigger={
                                                                                <button>
                                                                                    <Recycle />
                                                                                    <p>Xóa</p>
                                                                                </button>
                                                                            }
                                                                            modal
                                                                        >
                                                                            {(close) => (
                                                                                <ModalDeleteComment
                                                                                    close={close}
                                                                                    data={comment}
                                                                                    handleDeletComments={
                                                                                        handleDeletComments
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </StyledPopup>
                                                                    </div>
                                                                ) : (
                                                                    <div className={cx('popup-comment_item')}>
                                                                        <FlagIcon />
                                                                        <p>Báo cáo</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {comment.is_liked ? (
                                                                <div onClick={() => handleLikeComment(comment.id)}>
                                                                    <TymActiveIcon
                                                                        width="20"
                                                                        height="20"
                                                                        className={cx('tym-cm-icon')}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div onClick={() => handleLikeComment(comment.id)}>
                                                                    <TymCommentIcon className={cx('tym-cm-icon')} />
                                                                </div>
                                                            )}
                                                            <p>{comment.likes_count}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className={cx('no-comment')}>Hãy là người bình luận đầu tiên</div>
                                            )}
                                        </div>
                                    </div>
                                </CustomTabPanel>

                                <CustomTabPanel value={value} index={1}>
                                    <div className={cx('video-list')}>
                                        {videoUsers &&
                                            videoUsers.videos.map((item, index) => (
                                                <div
                                                    className={cx('video-list_item')}
                                                    onMouseEnter={
                                                        () => handleHoverVideo(item.id)
                                                        // setIsHovered(true)
                                                    }
                                                    onMouseLeave={() => handleLeaveHoverVideo(null)}
                                                    key={index}
                                                >
                                                    <img src={item.thumb_url} alt="Thumb" />
                                                    {currentHoveredVideoId === item.id && (
                                                        <div className={cx('video-list_item--video')}>
                                                            <video autoPlay muted>
                                                                <source src={item.file_url} type="video/mp4" />
                                                            </video>
                                                        </div>
                                                    )}
                                                    <div className={cx('video-list_item--count')}>
                                                        <PlayIconTranperant />
                                                        <span>99K</span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </CustomTabPanel>
                            </Box>
                        </div>
                    </div>

                    {!hideComment && <InputComment handleCreateComment={handleCreateComment} border={true} />}
                    <ToastContainer />
                </div>
            )}
        </div>
    );
}
