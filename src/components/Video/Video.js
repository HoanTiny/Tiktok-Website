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
    TymActiveIcon,
} from 'src/components/Icons';
import Images from 'src/components/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import ShareVideo from 'src/components/Popper/ShareVideo';
import { useEffect, useState, useRef } from 'react';
import likeVideoServirvice from '~/services/likeVideoService';
import unlikeVideoServirvice from '~/services/unlikeVideoService';

const cx = classNames.bind(styles);

function Video({ data, isMuted, toggleAllVideosMute, volume, onVolumeChange }) {
    const [playing, setPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const videoRef = useRef();
    const [sliderValue, setSliderValue] = useState(0);
    const [valueVolume, setValueVolume] = useState(0);
    const [isLiked, setIsLiked] = useState(data.is_liked);
    const [likeCount, setLikeCount] = useState(data.likes_count);
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

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                setTotalDuration(videoRef.current.duration);
            }
        };

        const handleTimeUpdate = () => {
            if (videoRef.current) {
                setCurrentTime(Math.floor(videoRef.current.currentTime));
                setSliderValue((videoRef.current.currentTime / totalDuration) * 100);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [totalDuration]);

    const handlePLayVideo = () => {
        videoRef.current.play();
        setPlaying(true);
    };

    const handleLikeVideo = (id) => {
        console.log(`id`, id);
        if (data.is_liked) {
            unlikeVideoServirvice(id)
                .then((data) => {
                    setIsLiked(false);
                    setLikeCount(data.likes_count);
                })
                .catch((error) => {
                    console.error('Error while fetching like video:', error);
                });
            return;
        } else {
            likeVideoServirvice(id)
                .then((data) => {
                    setIsLiked(true);
                    setLikeCount(data.likes_count);
                })
                .catch((error) => {
                    console.error('Error while fetching like video:', error);
                });
        }
    };

    useEffect(() => {
        if (data.is_liked) {
            setIsLiked(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        toggleAllVideosMute(); // Gọi hàm để toggle âm lượng cho tất cả video
        setValueVolume(isMuted ? 0 : setValueVolume(volume));
    };

    useEffect(() => {
        videoRef.current.muted = isMuted;
    }, [isMuted]);

    useEffect(() => {
        // Auto-play the first video when it is in the viewport
        if (inViewport) {
            handlePLayVideo();
        } else if (!inViewport) {
            handlePauseVideo();
        }
    }, [inViewport]);

    const poperShare = () => {
        return <ShareVideo />;
    };

    const handleSliderChange = (event) => {
        const value = parseFloat(event.target.value);
        const time = (videoRef.current.duration / 100) * value;
        videoRef.current.currentTime = time;
        setSliderValue(value);
    };

    const handleVolumeChange = (event) => {
        onVolumeChange(event); // Gọi hàm để xử lý sự kiện thay đổi âm lượng từ Home
        const newVolume = parseFloat(event.target.value) / 100;

        videoRef.current.volume = newVolume; // Đặt âm lượng của video dựa trên giá trị từ input range
        // setMuted(newVolume === 0); // Cập nhật trạng thái âm lượng (muted) dựa trên giá trị
        setValueVolume(newVolume);
    };

    useEffect(() => {
        videoRef.current.muted = isMuted;
        videoRef.current.volume = volume / 100; // Đặt âm lượng của video dựa trên giá trị từ Home
        setValueVolume(volume);
    }, [isMuted, volume]);

    const handleMouseUp = () => {
        videoRef.current.currentTime = (sliderValue / 100) * totalDuration;
    };

    const formatTime = (currentTime) => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    // Thêm sự kiện ended cho video
    const handleVideoEnd = () => {
        // Đặt trạng thái playing thành false khi video kết thúc
        setPlaying(true);
        handlePLayVideo();
        // Bạn có thể thực hiện các hành động khác khi video kết thúc ở đây
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
                                    ref={videoRef}
                                    onEnded={handleVideoEnd}
                                >
                                    <source src={data.file_url} type="video/mp4" />
                                </video>

                                <div className={cx('controls-video')}>
                                    <div className={cx('play-icon')} onClick={toggleVideo}>
                                        {playing ? <PauseIcon /> : <PlayIcon />}
                                    </div>

                                    <div className={cx('volume-icon')}>
                                        <div className={cx('volume-icon-input')}>
                                            <input
                                                className={cx('volume-range')}
                                                type="range"
                                                min="0"
                                                max="100"
                                                step={0.1}
                                                style={{
                                                    background: `linear-gradient(to right, #fffe ${valueVolume}%, rgba(255, 255, 255, 0.34) ${valueVolume}%)`,
                                                }}
                                                value={volume} // Sử dụng giá trị âm lượng từ Home
                                                onChange={handleVolumeChange} // Thêm sự kiện onChange để điều chỉnh âm lượng
                                            />
                                        </div>
                                        <div className={cx('volumb-icon-btn')} onClick={toggleVolumb}>
                                            {isMuted ? <MutedIcon /> : <VolumbIcon />}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('time-input-range')}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step={0.1}
                                        style={{
                                            background: `linear-gradient(to right, #fffe ${valPercent}%, rgba(255, 255, 255, 0.34) ${valPercent}%)`,
                                        }}
                                        value={sliderValue}
                                        className={cx('video-range')}
                                        onInput={handleSliderChange}
                                        onMouseDown={handleMouseUp}
                                    />
                                    <div className={cx('slider-value')}>
                                        {formatTime(currentTime)}/{formatTime(totalDuration)}
                                    </div>
                                </div>
                            </div>

                            <div className={cx('video-interac')}>
                                <button
                                    className={cx('btn-iterac')}
                                    onClick={() => {
                                        handleLikeVideo(data.uuid);
                                    }}
                                >
                                    <span className={cx('btn-icon')}>{isLiked ? <TymActiveIcon /> : <TymIcon />}</span>
                                    <strong>{likeCount}</strong>
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
