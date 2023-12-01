import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import {
    BookMarkIcon,
    CommentIcon,
    PlayIcon,
    ShareIcon,
    TymIcon,
    VolumbIcon,
    PauseIcon,
    MutedIcon,
} from 'src/components/Icons';
import Images from 'src/components/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import ShareVideo from 'src/components/Popper/ShareVideo';
import { useEffect, useState, useRef } from 'react';

const cx = classNames.bind(styles);

function Video({ data }) {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef();

    // Add a state to track if the video is in the viewport
    const [inViewport, setInViewport] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Adjust this threshold as needed
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Video is in the viewport
                    setInViewport(true);
                } else {
                    // Video is not in the viewport
                    setInViewport(false);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(videoRef.current);

        // Cleanup the observer on component unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    const handlePLayVideo = () => {
        videoRef.current.play();
        setPlaying(true);
        console.log(playing);
    };

    const handlePauseVideo = () => {
        videoRef.current.pause();
        setPlaying(false);
    };
    const toggleVideo = (e) => {
        e.stopPropagation();
        if (playing) {
            handlePauseVideo();
        } else {
            handlePLayVideo();
        }
    };

    const toggleVolumb = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setMuted(videoRef.current.muted);
    };

    useEffect(() => {
        // Auto-play the first video when it is in the viewport
        if (inViewport && !playing) {
            setDuration(Math.round(videoRef.current.duration));

            handlePLayVideo();
        } else if (!inViewport && playing) {
            setDuration(Math.round(videoRef.current.duration));

            handlePauseVideo();
        }
    }, [inViewport]);

    const poperShare = () => {
        return <ShareVideo />;
    };

    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event) => {
        const value = event.target.value;
        setSliderValue(value);
    };

    const valPercent = (sliderValue / 100) * 100;

    return (
        <>
            <div className={cx('container')} key={data.id}>
                <div className={cx('inner')}>
                    <Images
                        className={cx('avatar')}
                        src={data.user.avatar}
                        alt="Avatar"
                        fallback="https://p16-sign-sg.tiktok"
                    />

                    <div className={cx('main-container')}>
                        <div className={cx('header')}>
                            <div className={cx('header-content')}>
                                <div className={cx('main-content')}>
                                    <div className={cx('header_content-name')}>
                                        <span className={cx('header-nickname')}>{data.user.nickname}</span>
                                        {data.user.tick && (
                                            <FontAwesomeIcon className={cx('header-iconcheck')} icon={faCircleCheck} />
                                        )}
                                        <span className={cx('header-fullname')}>
                                            {data.user.first_name + ' ' + data.user.last_name}
                                        </span>
                                    </div>
                                    <div className={cx('header_content-title')}>{data.description}</div>
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
                                <video
                                    className={cx('video')}
                                    width="100%"
                                    height="100%"
                                    // controls
                                    autoPlay={false}
                                    ref={videoRef}
                                >
                                    <source src={data.file_url} type="video/mp4" />
                                </video>

                                <div className={cx('controls-video')}>
                                    <div className={cx('play-icon')} onClick={toggleVideo}>
                                        {playing ? <PauseIcon /> : <PlayIcon />}
                                    </div>
                                    <div className={cx('volume-icon')} onClick={toggleVolumb}>
                                        {muted ? <MutedIcon /> : <VolumbIcon />}
                                    </div>
                                </div>
                                <div className={cx('time-input-range')}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        style={{
                                            background: `linear-gradient(to right, #fffe ${valPercent}%, rgba(255, 255, 255, 0.34) ${valPercent}%)`,
                                        }}
                                        value={sliderValue}
                                        className={cx('video-range')}
                                        onChange={handleSliderChange}
                                    />
                                    <div className={cx('slider-value')}>{duration}</div>
                                </div>
                            </div>

                            <div className={cx('video-interac')}>
                                <button className={cx('btn-iterac')}>
                                    <span className={cx('btn-icon')}>
                                        <TymIcon />
                                    </span>
                                    <strong>{data.likes_count}</strong>
                                </button>
                                <button className={cx('btn-iterac')}>
                                    <span className={cx('btn-icon')}>
                                        <CommentIcon />
                                    </span>
                                    <strong>{data.comments_count}</strong>
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

                                    <strong>{data.shares_count}</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Video;
