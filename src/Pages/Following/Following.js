import { useEffect, useState } from 'react';
import style from './Following.module.scss';
import classNames from 'classnames/bind';
import Video from 'src/components/Video/Video';
import * as VideoListForYou from 'src/services/videoListForYouService';

const cx = classNames.bind(style);

function Following() {
    const [videoFollowing, setVideoFollowing] = useState([]);
    const [isAllMuted, setAllMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [preVolume, setPreVolume] = useState(50);

    useEffect(() => {
        VideoListForYou.getVideoListForYou({ type: 'following', perPage: 1 })
            .then((data) => {
                console.log('f', data);
                setVideoFollowing(data);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }, []);

    const toggleAllVideosMute = () => {
        if (isAllMuted) {
            setAllMuted(false);
            setVolume(preVolume);
        } else {
            setVolume(volume);
            setAllMuted(true);
            setVolume(0);
        }
        // setAllMuted((prevMuted) => !prevMuted);
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (newVolume === 0) {
            setAllMuted(true);
        } else {
            setAllMuted(false);
            setPreVolume(newVolume);
        }
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                {videoFollowing.map((item, index) => (
                    <Video
                        key={item.id}
                        data={item}
                        isMuted={isAllMuted} // Truyền trạng thái âm lượng từ Home xuống Video
                        toggleAllVideosMute={toggleAllVideosMute} // Truyền hàm để toggle âm lượng từ Home xuống Video
                        volume={volume}
                        onVolumeChange={handleVolumeChange}
                        followbtn={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Following;
