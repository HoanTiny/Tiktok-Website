import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import video from '~/assets/videos/videoTiktok.mp4';
const cx = classNames.bind(styles);

function Video() {
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('video-container')}>
                <video className={cx('video')} width="100%" height="100%" controls>
                    <source src={video} type="video/mp4" />
                </video>
            </div>

            <div className={cx('video-interac')}>
                <p>Tym</p>
                <p>Bình Luận</p>
            </div>
        </div>
    );
}

export default Video;
