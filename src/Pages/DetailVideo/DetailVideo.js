import classNames from 'classnames/bind';
import style from './DetailVideo.module.scss';
import getVideoService from 'src/services/getVideoService';

import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
export default function DetailsVideo() {
    const [video, setVideo] = useState({});
    const currentURL = window.location.href;

    // // Lấy đoạn cuối cùng của đường dẫn URL
    const pathSegments = currentURL.split('/');
    const videoId = pathSegments[pathSegments.length - 1];
    console.log('Video ID:', videoId);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const video = await getVideoService(videoId);
                setVideo(video);
                console.log('Check video: ', video);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchVideo();
    }, [videoId]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <video className={cx('video')} controls>
                    <source src={video.videoUrl} />
                </video>
            </div>

            <div className={cx('video-info')}>
                <div className={cx('video-title')}>
                    <h1>Video Title</h1>
                </div>
                <div className={cx('video-description')}>
                    <p>Video Description</p>
                </div>
            </div>
        </div>
    );
}
