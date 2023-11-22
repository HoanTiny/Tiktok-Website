import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Images from 'src/components/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Video from './Video/Video';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Images
                        className={cx('avatar')}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9ea83b5949dc0b215d4c8c0f282d3c10.jpeg?x-expires=1700722800&x-signature=d%2FMyB%2BN3mbWGkLyr27GwStH2r7g%3D"
                        alt="Avatar"
                        fallback="https://p16-sign-sg.tiktok"
                    />

                    <div className={cx('main-container')}>
                        <div className={cx('header')}>
                            <div className={cx('header-content')}>
                                <div className={cx('main-content')}>
                                    <div className={cx('header_content-name')}>
                                        <span className={cx('header-nickname')}>hoantiny</span>
                                        <FontAwesomeIcon className={cx('header-iconcheck')} icon={faCircleCheck} />
                                        <span className={cx('header-fullname')}>Trần Ngọc Hoàn</span>
                                    </div>
                                    <div className={cx('header_content-title')}>Ae xem đừng nghiện nha</div>
                                    <div className={cx('header_content-music')}>
                                        <FontAwesomeIcon icon={faMusic} />
                                        <span className={cx('name-music')}>Âm nhạc video</span>
                                    </div>
                                </div>
                                <Button outline className={cx('follow-btn')}>
                                    Follow
                                </Button>
                            </div>
                        </div>

                        <Video />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
