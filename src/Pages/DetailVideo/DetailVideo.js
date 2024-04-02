import classNames from 'classnames/bind';
import style from './DetailVideo.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
// import Skeleton from 'react-loading-skeleton';
import getVideoService from 'src/services/getVideoService';
import getCommentListService from 'src/services/getCommentsService';

import { createRef, useEffect, useRef, useState } from 'react';
import {
    // ArrowIcon,
    BookMarkIcon,
    CloseIcon,
    CommentIcon,
    EmojiIcon,
    EnbedIcon,
    MoreIcon,
    MusicIcon,
    SendFriendIcon,
    ShareFBIcon,
    ShareIcon,
    TagCommentIcon,
    TwitterIcon,
    TymCommentIcon,
    TymIcon,
    WhatsAppIcon,
} from 'src/components/Icons';
import Search from 'src/layouts/components/Search';

const cx = classNames.bind(style);

export default function DetailsVideo() {
    const [video, setVideo] = useState({});
    const [comments, setComment] = useState({});
    const [value, setValue] = useState(0);
    // const [activeReply, setActiveReply] = useState(false);
    const [activeReplyIndex, setActiveReplyIndex] = useState(null);
    // const [moreComment, setMoreComment] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);
    // const [valueInput, setValueInput] = useState('');
    const currentURL = window.location.href;
    const inputRefs = useRef([]);
    // Lấy đoạn cuối cùng của đường dẫn URL
    const pathSegments = currentURL.split('/');
    const videoId = pathSegments[pathSegments.length - 1];
    console.log('Video ID:', videoId);

    useEffect(() => {
        getVideoService(videoId)
            .then((res) => {
                setVideo(res);
                console.log('Check video: ', video);
            })
            .catch((error) => {
                console.log('error', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]); // Ensure that videoId is added to the dependency array

    // Lấy danh sách bình luận
    useEffect(() => {
        getCommentListService(videoId)
            .then((res) => {
                setComment(res);
                console.log('Check comment: ', res);
            })
            .catch((error) => {
                console.log('error', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]); // Ensure that videoId is added to the dependency array

    useEffect(() => {
        // Reset refs array
        inputRefs.current = Array(comments.length)
            .fill()
            .map((_, i) => inputRefs.current[i] || createRef());
    }, [comments]);

    // Set active button when the user wirte in input
    function handleActiveBtn(e, index) {
        console.log(e.target.value);
        // setValueInput(e.target.value);
        if (e.target.value !== '') {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    }

    const urlVideo = video.file_url;

    function getDate(video) {
        var date = new Date(video.created_at);
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
        console.log('index', index);
        setTimeout(() => {
            console.log('Reply', inputRefs.current);
            inputRefs.current[index]?.current?.focus();
        }, 100);
    }

    function closeComment() {
        setActiveReplyIndex(null);
    }

    // function viewComment() {
    //     setMoreComment(true);
    // }

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
    console.log('Get date: ', video.user);

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
                                <video controls autoPlay src={urlVideo}>
                                    <source src={urlVideo} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {video && video.user && (
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
                                        <span>{getDate(video)}</span>
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
                                <div className={cx('irt-icon')}>
                                    <TymIcon />
                                </div>
                                <div>{video.likes_count}</div>
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
                                <StyledTab label={`Bình Luận (${comments.length})`} />
                                <StyledTab label="Video của nhà sáng tạo" iconPosition="start" />
                            </StyledTabs>
                            <CustomTabPanel value={value} index={0}>
                                <div className={cx('comment-container')}>
                                    <div className={cx('comment-container__list')}>
                                        {comments &&
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
                                                                1 ngày trước
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
                                                            <div className={cx('comment-user__input')}>
                                                                <input
                                                                    ref={inputRefs.current[index]}
                                                                    placeholder="Thêm câu trả lời..."
                                                                    onChange={(e) => {
                                                                        handleActiveBtn(e, index);
                                                                    }}
                                                                />
                                                                <TagCommentIcon
                                                                    className={cx('comment-user__input-icon')}
                                                                />
                                                                <EmojiIcon className={cx('comment-user__input-icon')} />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className={cx('btn-submit', activeBtn ? 'active' : '')}
                                                            >
                                                                Đăng
                                                            </button>
                                                            <div className={cx('close-icon')} onClick={closeComment}>
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
                                                        <TymCommentIcon className={cx('tym-cm-icon')} />
                                                        <p>28</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={1}>
                                <div className={cx('video-list')}>
                                    <h2>Nhà sáng tạo</h2>
                                </div>
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            )}
        </div>
    );
}
