import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    EffectIcon,
} from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import * as userService from '~/services/userService';
import * as accountFollowingService from '~/services/accountFollowingService';
import SuggestedAccount from 'src/components/SuggestedAccount';
import config from 'src/config';
import Button from 'src/components/Button';
import ModalLogin from 'src/components/ModalLogin';
import styled from 'styled-components';
import FollowingAccount from 'src/components/FollowingAccount';

const StyledPopup = styled(Popup)`
    // use your custom style for ".popup-overlay"
    &-overlay {
        background: rgba(0, 0, 0, 0.5);
    }
    // use your custom style for ".popup-content"
    &-content {
        width: 483px;
        border-radius: 8px;
        transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
        transform: none;
        margin: auto;
        position: relative;
        height: 642px;
        overflow: hidden;
        display: flex;
        background-color: rgb(255, 255, 255);
    }
`;

const cx = classNames.bind(styles);

function Sidebar() {
    const token = localStorage.getItem('token');

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingAccount, setFollowingAccount] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPerPage, setCurrentPerPage] = useState(1);

    useEffect(() => {
        let isMounted = true;
        console.log('currentPerPage', currentPerPage);
        userService
            .getSuggested({ page: currentPerPage, perPage: 4 })
            .then((data) => {
                if (isMounted) {
                    setSuggestedUsers((prevData) => [...prevData, ...data]);
                }
            })
            .catch((error) => {
                console.error('Error while fetching suggested users:', error);
            });

        return () => {
            isMounted = false;
        };
    }, [currentPerPage]);

    useEffect(() => {
        let isMounted = true;

        if (token) {
            const fetchData = async () => {
                try {
                    const data = await accountFollowingService.getfollowingsAccount({ page: currentPage });
                    if (isMounted) {
                        setFollowingAccount((prevData) => [...prevData, ...data]);
                    }
                } catch (error) {
                    console.error('Error while fetching following accounts:', error);
                }
            };

            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, [currentPage, token]);

    const handleViewMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleViewMorePerPage = () => {
        setCurrentPerPage(currentPerPage + 5);
        console.log('currentPerPage2', currentPerPage);
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For Your"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Live"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                ></MenuItem>
            </Menu>
            {token ? (
                <>
                    <SuggestedAccount
                        label="Suggested accounts"
                        data={suggestedUsers}
                        handleViewMorePerPage={handleViewMorePerPage}
                    />
                    <FollowingAccount
                        label="Following accounts"
                        data={followingAccount}
                        handleViewMore={handleViewMore}
                    />
                </>
            ) : (
                <>
                    <div className={cx('box-loginsidebar')}>
                        <p className={cx('title-head')}>
                            Đăng nhập để follow các tác giả, thích video và xem bình luận.
                        </p>
                        <StyledPopup
                            trigger={
                                <Button outline text className={cx('btn-loginin')}>
                                    Đăng nhập
                                </Button>
                            }
                            modal
                            nested
                        >
                            {(close) => <ModalLogin close={close} />}
                        </StyledPopup>
                    </div>
                    <div className={cx('btn-hieuung')}>
                        <EffectIcon />
                        <span>Tạo hiệu ứng</span>
                    </div>
                    <div className={cx('info-text')}>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Giới thiệu
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Bảng tin
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Liên hệ
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Sự nghiệp
                        </a>
                    </div>
                    <div className={cx('info-text2')}>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Tiktok for Good
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Quảng cáo
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Tiktok Live Creator Networks
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Developers
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Minh bạch
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Tiktok Rewards
                        </a>
                    </div>
                    <div className={cx('info-text3')}>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Trợ giúp
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            An toàn
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Điều khoản
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Quyền riêng tư
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Cổng thông tin tác giả
                        </a>
                        <a className={cx('info-link')} href="https://facebook.com">
                            Hướng dẫn cộng đồng
                        </a>
                    </div>
                    <div className={cx('info-text4')}>
                        <a className={cx('info-link')} href="https://facebook.com">
                            @Tiktok 2023
                        </a>
                    </div>
                </>
            )}
        </aside>
    );
}

export default Sidebar;
