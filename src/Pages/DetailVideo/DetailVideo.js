import classNames from 'classnames/bind';
import style from './DetailVideo.module.scss';
import getVideoService from 'src/services/getVideoService';

import { useEffect, useState } from 'react';
import { CloseIcon, MoreIcon } from 'src/components/Icons';
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
        const fetchVideo = async () => {
            try {
                const videoData = await getVideoService(videoId);
                setVideo(videoData);
                console.log('Check video: ', videoData);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchVideo();
    }, [videoId]);

    const urlVideo = video.file_url;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <header className={cx('video-container__header')}>
                    <div className={cx('icon-close')}>
                        <CloseIcon width="40px" height="40px" />
                    </div>
                    {/* <div className={cx('input-search')}>
                        <input type="text" placeholder="Tìm kiếm liên quan" />
                        <button>
                            <SearchIcon />
                        </button>
                    </div> */}

                    <Search className={cx('input-search')} bgrInput={true} placeholder={true} />
                    <MoreIcon width="48px" height="48px" className={cx('icon-more')} />
                </header>
                {/* Sử dụng thuộc tính autoPlay để phát video tự động và controls để hiển thị các nút điều khiển */}
                {video && (
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

            <div className={cx('video-info')}>
                {/* Sử dụng dữ liệu thực tế của video thay vì các giá trị cố định */}
                <div className={cx('video-title')}>
                    <h1>{video.title}</h1>
                </div>
                <div className={cx('video-description')}>
                    <p>{video.description}</p>
                </div>
            </div>
        </div>
    );
}
