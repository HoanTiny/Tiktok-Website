import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SuggestedAccount.module.scss';

const cx = classNames.bind(styles);
function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('account-avt')}
                src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"
                alt=""
            />

            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>hoantiny</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Trần Ngọc Hoàn</p>
            </div>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
