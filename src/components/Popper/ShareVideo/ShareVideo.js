import classNames from 'classnames/bind';
import styles from './ShareVideo.module.scss';
import {
    ArrowIcon,
    CopyIcon,
    DipIcon,
    SendFriendIcon,
    ShareFBIcon,
    TipArrowIcon,
    WhatsAppIcon,
} from 'src/components/Icons';
const cx = classNames.bind(styles);

function ShareVideo() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('shareVideo-item')}>
                <DipIcon />
                <div className={cx('shareVideo-item-content')}>Nhúng</div>
            </div>

            <div className={cx('shareVideo-item')}>
                <SendFriendIcon />
                <div className={cx('shareVideo-item-content')}>Gửi đến bạn bè</div>
            </div>

            <div className={cx('shareVideo-item')}>
                <ShareFBIcon />
                <div className={cx('shareVideo-item-content')}>Chia sẻ lên Facebook</div>
            </div>

            <div className={cx('shareVideo-item')}>
                <WhatsAppIcon />
                <div className={cx('shareVideo-item-content')}>Chia sẻ lên WhatsApp</div>
            </div>

            <div className={cx('shareVideo-item')}>
                <CopyIcon />
                <div className={cx('shareVideo-item-content')}>Sao chép liên kết</div>
            </div>

            <div className={cx('shareVideo-item')}>
                <ArrowIcon />
            </div>

            <div className={cx('shareVideo-tipArrow')}>
                <TipArrowIcon />
            </div>
        </div>
    );
}

export default ShareVideo;
