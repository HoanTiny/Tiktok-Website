import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Video from './Video/Video';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <div className={cx('wrapper')}>
                <Video />
                <Video />
                <Video />
            </div>
        </div>
    );
}

export default Home;
