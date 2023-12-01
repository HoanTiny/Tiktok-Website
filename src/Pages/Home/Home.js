import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState, useRef } from 'react';
import * as VideoListForYou from 'src/services/videoListForYouService';

import Video from '~/components/Video/Video';

const cx = classNames.bind(styles);

function Home() {
    const [videoForYou, setVideoForYou] = useState([]);

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
    return (
        <div>
            <div className={cx('wrapper')}>
                {videoForYou.map((item, index) => (
                    <Video data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;
