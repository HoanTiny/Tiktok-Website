import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Images from 'src/components/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from 'src/components/Button';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Images
                        className={cx('avatar')}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/1665757201241090.jpeg?x-expires=1700211600&x-signature=pnsa9y%2Bf469HJ3c3JkYq3q%2F%2FmeQ%3D"
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
