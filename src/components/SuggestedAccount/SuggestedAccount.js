import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccount.module.scss';
import AccountItem from './AccountItem';
import { useState } from 'react';

const cx = classNames.bind(styles);
function SuggestedAccounts({ label, data = [], handleViewMorePerPage }) {
    const [displayCount, setDisplayCount] = useState(4);
    const handleViewMoreClick = () => {
        setDisplayCount(displayCount + 1);
        handleViewMorePerPage(); // Gọi hàm xử lý xem thêm từ prop
    };
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            {displayCount <= data.length && (
                <p className={cx('more-btn')} onClick={handleViewMoreClick}>
                    Xem thêm
                </p>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
