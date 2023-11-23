import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import video from '~/assets/videos/videoTiktok.mp4';
import { BookMarkIcon, CommentIcon, ShareIcon, TymIcon } from 'src/components/Icons';
import Tippy from '@tippyjs/react';
// import Tippy from '@tippyjs/react/headless';
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
                <button className={cx('btn-iterac')}>
                    <span className={cx('btn-icon')}>
                        <TymIcon />
                    </span>
                    <strong>6.5M</strong>
                </button>
                <button className={cx('btn-iterac')}>
                    <span className={cx('btn-icon')}>
                        <CommentIcon />
                    </span>
                    <strong>6.5M</strong>
                </button>
                <button className={cx('btn-iterac')}>
                    <span className={cx('btn-icon')}>
                        <BookMarkIcon />
                    </span>
                    <strong>6.5M</strong>
                </button>
                <button className={cx('btn-iterac')}>
                    <Tippy content="Test">
                        <span className={cx('btn-icon')}>
                            <ShareIcon />
                        </span>
                    </Tippy>

                    <strong>6.5M</strong>
                </button>
            </div>
        </div>
    );
}

export default Video;
