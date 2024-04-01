import classNames from 'classnames/bind';
import style from './DetailVideo.module.scss';
import getVideoService from 'src/services/getVideoService';

import { useEffect, useState } from 'react';
import {
    BookMarkIcon,
    CloseIcon,
    CommentIcon,
    EnbedIcon,
    MoreIcon,
    MusicIcon,
    SendFriendIcon,
    ShareFBIcon,
    ShareIcon,
    TwitterIcon,
    TymIcon,
    WhatsAppIcon,
} from 'src/components/Icons';
import Search from 'src/layouts/components/Search';

const cx = classNames.bind(style);

export default function DetailsVideo() {
    const [video, setVideo] = useState({});
    const currentURL = window.location.href;

    // Lấy đoạn cuối cùng của đường dẫn URL
    const pathSegments = currentURL.split('/');
    const videoId = pathSegments[pathSegments.length - 1];
    console.log('Video ID:', videoId);

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const videoData = await getVideoService(videoId);
        //         setVideo(videoData);
        //         console.log('Check video: ', videoData);
        //     } catch (error) {
        //         console.log('error', error);
        //     }
        // };

        // fetchData();

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
                                        srcset={video.thumb_url}
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
                        <span>{currentURL}</span>
                        <button type="">Sao chép liên kết</button>
                    </div>
                </div>
            )}
        </div>
    );
}
