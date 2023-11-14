import classNames from 'classnames/bind';
import Button from 'src/components/Button';
import styles from './AccountPreview.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Images from 'src/components/Images';

const cx = classNames.bind(styles);
function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Images className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </header>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                </p>
                <p className={cx('name')}>
                    {data.first_name} {data.last_name}
                </p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers_count} </strong>
                    <span className={cx('label')}>Follwers</span>
                    <strong className={cx('value')}>{data.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
