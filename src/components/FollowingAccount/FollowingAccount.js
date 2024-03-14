import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FollowingAccount.module.scss';
import AccountItem from '../AccountItem';

const cx = classNames.bind(styles);

function FollowingAccount({ label, data = [], handleViewMore }) {
    const [displayCount, setDisplayCount] = useState(4);
    console.log(2222, data.length);
    const handleViewMoreClick = () => {
        setDisplayCount(displayCount + 5);
        handleViewMore(); // Gọi hàm xử lý xem thêm từ prop
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.slice(0, displayCount).map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            {displayCount < data.length && (
                <p className={cx('more-btn')} onClick={handleViewMoreClick}>
                    Xem thêm
                </p>
            )}
        </div>
    );
}

FollowingAccount.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    handleViewMore: PropTypes.func.isRequired, // Thêm kiểu dữ liệu và yêu cầu cho handleViewMore
};

export default FollowingAccount;
