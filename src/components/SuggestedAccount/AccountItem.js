import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SuggestedAccount.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperpWrapper } from '~/components/Popper';
import Images from 'src/components/Images';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import AccountPreview from './AccountPreview';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const [dataAcc, setDataAcc] = useState(null);
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperpWrapper>
                    <AccountPreview data={data} />
                </PopperpWrapper>
            </div>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            setDataAcc(data);
        }, 2000);
    }, [data]);
    return dataAcc ? (
        <Link key={data.nickname} to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <Images className={cx('avatar')} src={data.avatar} alt={data.nickname} />

                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>
                            {data.first_name} {data.last_name}
                        </p>
                    </div>
                </div>
            </Tippy>
        </Link>
    ) : (
        <div className={cx('account-item')}>
            <Skeleton circle height={50} width={50} />

            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <Skeleton height={20} width={100} />
                    <Skeleton height={15} width={100} />
                </p>
                <p className={cx('name')}>
                    <Skeleton height={20} width={100} />
                </p>
            </div>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
