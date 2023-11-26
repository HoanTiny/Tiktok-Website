import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { BookMarkIcon, CommentIcon, ShareIcon, TymIcon } from 'src/components/Icons';
// import Tippy from '@tippyjs/react';
import Images from 'src/components/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import ShareVideo from 'src/components/Popper/ShareVideo';
import { useEffect, useState } from 'react';
import * as VideoListForYou from 'src/services/videoListForYouService';
const cx = classNames.bind(styles);

function Video() {
    const [videForYou, setVideoForYou] = useState([]);

    useEffect(() => {
        const randomPerPage = Math.floor(Math.random() * 10) + 1;

        VideoListForYou.getVideoListForYou({ type: 'for-you', perPage: randomPerPage })
            .then((data) => {
                setVideoForYou(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const poperShare = () => {
        return <ShareVideo />;
    };
    return (
        <>
            {videForYou.map((video) => (
                <div className={cx('container')} key={video.id}>
                    <div className={cx('inner')}>
                        <Images
                            className={cx('avatar')}
                            src={video.user.avatar}
                            alt="Avatar"
                            fallback="https://p16-sign-sg.tiktok"
                        />

                        <div className={cx('main-container')}>
                            <div className={cx('header')}>
                                <div className={cx('header-content')}>
                                    <div className={cx('main-content')}>
                                        <div className={cx('header_content-name')}>
                                            <span className={cx('header-nickname')}>{video.user.nickname}</span>
                                            {video.user.tick && (
                                                <FontAwesomeIcon
                                                    className={cx('header-iconcheck')}
                                                    icon={faCircleCheck}
                                                />
                                            )}
                                            <span className={cx('header-fullname')}>
                                                {video.user.first_name + ' ' + video.user.last_name}
                                            </span>
                                        </div>
                                        <div className={cx('header_content-title')}>{video.description}</div>
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

                            <div className={cx('video-wrapper')}>
                                <div className={cx('video-container')}>
                                    <video className={cx('video')} width="100%" height="100%" controls>
                                        <source src={video.file_url} type="video/mp4" />
                                    </video>
                                </div>

                                <div className={cx('video-interac')}>
                                    <button className={cx('btn-iterac')}>
                                        <span className={cx('btn-icon')}>
                                            <TymIcon />
                                        </span>
                                        <strong>{video.likes_count}</strong>
                                    </button>
                                    <button className={cx('btn-iterac')}>
                                        <span className={cx('btn-icon')}>
                                            <CommentIcon />
                                        </span>
                                        <strong>{video.comments_count}</strong>
                                    </button>
                                    <button className={cx('btn-iterac')}>
                                        <span className={cx('btn-icon')}>
                                            <BookMarkIcon />
                                        </span>
                                        <strong>0</strong>
                                    </button>
                                    <button className={cx('btn-iterac')}>
                                        <Tippy
                                            interactive
                                            placement="bottom-start"
                                            delay={[800, 0]}
                                            offset={[-30, 10]}
                                            render={poperShare}
                                        >
                                            <span className={cx('btn-icon')}>
                                                <ShareIcon />
                                            </span>
                                        </Tippy>

                                        <strong>{video.shares_count}</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Video;
