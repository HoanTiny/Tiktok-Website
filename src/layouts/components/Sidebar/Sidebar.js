import React, { useState, useEffect, useRef } from 'react';
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
// import * as accountFollowingService from '~/services/accountFollowingService';

import SuggestedAccount from 'src/components/SuggestedAccount';
import config from 'src/config';
import Button from 'src/components/Button';
import ModalLogin from 'src/components/ModalLogin';

import styled from 'styled-components';

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
    let currentUser = true;

    if (token) {
        currentUser = true;
    } else {
        currentUser = false;
    }
    const popupRef = useRef();
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    // const [followingAccount, setFollowingAccount] = useState([]);

    useEffect(() => {
        userService.getSuggested({ page: 1, perPage: 5 }).then((data) => {
            setSuggestedUsers(data);
        });
    }, []);

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

            {currentUser ? (
                <>
                    <hr />
                    <SuggestedAccount label="Suggested accounts" data={suggestedUsers} />
                    <SuggestedAccount label="Following accounts" />
                </>
            ) : (
                <>
                    <div className={cx('box-loginsidebar')}>
                        <p className={cx('title-head')}>
                            Đăng nhập để follow các tác giả, thích video và xem bình luận.
                        </p>
                        <StyledPopup
                            trigger={
                                <Button ref={popupRef} outline text className={cx('btn-loginin')}>
                                    Đăng nhập
                                </Button>
                            }
                            modal
                            nested
                        >
                            {(close) => <ModalLogin close={close} />}
                        </StyledPopup>
                        {/* <Button outline text className={cx('btn-loginin')}>
                            Đăng nhập
                        </Button> */}
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
