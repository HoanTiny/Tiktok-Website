// Home.js
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import * as VideoListForYou from 'src/services/videoListForYouService';

import Video from '~/components/Video/Video';

const cx = classNames.bind(styles);

function Home() {
    const [videoForYou, setVideoForYou] = useState([]);
    const [isAllMuted, setAllMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [preVolume, setPreVolume] = useState(50);

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
                {videoForYou.map((item, index) => (
                    <Video
                        key={item.id}
                        data={item}
                        isMuted={isAllMuted} // Truyền trạng thái âm lượng từ Home xuống Video
                        toggleAllVideosMute={toggleAllVideosMute} // Truyền hàm để toggle âm lượng từ Home xuống Video
                        volume={volume}
                        onVolumeChange={handleVolumeChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
