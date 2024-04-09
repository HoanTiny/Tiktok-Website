import React, { useState, useEffect, useRef } from 'react';

import style from './VideoPlayer.module.scss';
import classNames from 'classnames/bind';
import { PlayIconFill, VolumbIconVideoPlayer, VolumbMutedIconVideoPlayer } from '../Icons';

const cx = classNames.bind(style);

function VideoPlayer({ urlVideo }) {
    const [totalTime, setTotalTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderVolume, setSliderVolume] = useState(0);
    const [showVolumeInput, setShowVolumeInput] = useState(false);
    const [volume, setVolume] = useState(0);
    const [muted, setMuted] = useState(false);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const currentVideoRef = videoRef.current;

        const handleLoadedMetadata = () => {
            const duration = currentVideoRef.duration;
            // console.log('currentVideoRef', currentVideoRef.volume);
            setSliderVolume(currentVideoRef.volume * 100);
            setVolume(currentVideoRef.volume);
            setTotalTime(duration);
        };

        const handleTimeUpdate = () => {
            const currentTime = currentVideoRef.currentTime;
            const progress = (currentTime / currentVideoRef.duration) * 100;
            setCurrentTime(Math.floor(currentVideoRef.currentTime));
            setSliderValue(progress);
        };

        if (currentVideoRef) {
            currentVideoRef.addEventListener('loadedmetadata', handleLoadedMetadata);
            currentVideoRef.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                currentVideoRef.removeEventListener('loadedmetadata', handleLoadedMetadata);
                currentVideoRef.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [urlVideo]);

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value) / 100;

        videoRef.current.volume = newVolume; // Đặt âm lượng của video dựa trên giá trị từ input range
        // setMuted(newVolume === 0); // Cập nhật trạng thái âm lượng (muted) dựa trên giá trị
        // const volume = event.target.value;
        // videoRef.current.volume = volume;
        console.log(newVolume);
        if (newVolume > 0) {
            setMuted(false);
        } else {
            setMuted(true);
        }
        setVolume(newVolume);
        setSliderVolume(event.target.value);
    };

    const handleSliderChange = (event) => {
        const tempSliderValue = event.target.value;
        setSliderValue(tempSliderValue);

        const time = (tempSliderValue / 100) * videoRef.current.duration;
        videoRef.current.currentTime = time;
    };

    const handleMuted = () => {
        if (videoRef.current.volume !== 0) {
            videoRef.current.volume = 0;
            setMuted(true);
            setSliderVolume(0);
        } else {
            videoRef.current.volume = volume;
            setMuted(false);
            setSliderVolume(volume * 100);
        }
    };

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            console.log('paused');
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const formatTime = (currentTime) => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };
    return (
        <div className={cx('video-container_img--video')}>
            <video autoPlay src={urlVideo} ref={videoRef} onClick={togglePlay}>
                <source src={urlVideo} type="video/mp4" />
            </video>
            <div className={cx('range')}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    style={{
                        background: `linear-gradient(to right, #fff ${sliderValue}%, rgba(255, 255, 255, 0.34) ${sliderValue}%)`,
                    }}
                />
                <div className={cx('value')}>
                    {formatTime(currentTime)}/{formatTime(totalTime)}
                </div>
            </div>
            {!isPlaying && (
                <div className={cx('play-icon-fill')}>
                    <PlayIconFill width={50} height={50} />
                </div>
            )}

            <div className={cx('volumb-icon')}>
                {showVolumeInput && (
                    <div className={cx('volumb-icon_range')}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderVolume}
                            onMouseEnter={() => setShowVolumeInput(true)}
                            onMouseLeave={() => setShowVolumeInput(false)}
                            onInput={handleVolumeChange}
                            style={{
                                background: `linear-gradient(to right, #fff ${sliderVolume}%, rgba(255, 255, 255, 0.34) ${sliderVolume}%)`,
                            }}
                        />
                    </div>
                )}
                <div className={cx('volume-btn')} onClick={handleMuted} onMouseEnter={() => setShowVolumeInput(true)}>
                    {muted ? (
                        <VolumbMutedIconVideoPlayer width={40} height={40} />
                    ) : (
                        <VolumbIconVideoPlayer width={40} height={40} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
