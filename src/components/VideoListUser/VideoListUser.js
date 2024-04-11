import classNames from 'classnames/bind';
import styles from './VideoListUser.module.scss';
import { CounterViewIcon } from '../Icons';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function VideoListUser({ item, title = true }) {
    const [thumnail, setThumbnail] = useState(true); // Lưu trữ thumb của video
    const videoRef = useRef(null); // Tham chiếu đến video
    const handleMouseEnter = () => {
        if (videoRef.current) {
            console.log('videoRef.current', videoRef.current);
            videoRef.current.play(); // Play video khi hover vào
            setThumbnail(false);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause(); // Pause video khi hover ra
            setThumbnail(true);
            videoRef.current.load(); // Load lại video để quay trở lại thumb
        }
    };
    console.log('videoRef.current', title);
    return (
        <Link
            to={`/@${item.user.nickname}/video/${item.uuid}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={cx('video-parent')}>
                <div className={cx('video-parent_container')}>
                    <div className={cx('video-list_item')}>
                        {thumnail && (
                            <img src={item.thumb_url} alt="thumbnail" className={cx('video-list_item-thumbnail')} />
                        )}
                        <video
                            ref={videoRef} // Tham chiếu video
                            className={cx('video-list_item-video')}
                            loop
                            muted
                        >
                            <source src={item.file_url} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className={cx('video-view')}>
                    <CounterViewIcon className={cx('video-view_icon')} />
                    <span className={cx('video-view_number')}>{item.views_count}</span>
                </div>
            </div>

            <div className={cx('video-list_title')}>
                <span className={cx('video-title')}>{item.description}</span>
            </div>
        </Link>
    );
}

export default VideoListUser;
