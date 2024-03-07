import classNames from 'classnames/bind';
import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react';
import { Link, Navigate } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from 'src/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from 'src/components/Icons';
import Images from 'src/components/Images/Images';
import Search from '../Search';
import config from '~/config';
import ModalLogin from 'src/components/ModalLogin';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import getCurrentUserService from 'src/services/getCurrentUserService';
import { UserAuth } from '../../../components/store';

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

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [userCurrent, setUserCurrent] = useState([]);
    const token = localStorage.getItem('token');
    const popupRef = useRef();
    const currentUser = useRef();

    const { userAuth } = UserAuth();
    console.log(`userAuth`, userAuth);
    if (token) {
        currentUser.current = true;
    } else {
        currentUser.current = false;
    }

    useEffect(() => {
        if (token) {
            getCurrentUserService()
                .then((user) => {
                    setUserCurrent(user);
                    currentUser.current = true;
                })
                .catch((error) => {
                    console.log('111', error);
                });
        } else {
            currentUser.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    //Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle language
                break;
            case 'logout':
                localStorage.removeItem('token');
                currentUser.current = false;
                window.location.reload();
                Navigate('/');
                break;

            default:
                break;
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            type: 'view-profile',
            to: `/@${userAuth}`,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            type: 'logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home}>
                        <img src={images.logo} alt="tiktok"></img>
                    </Link>
                </div>

                <Search />
                <div className={cx('actions')}>
                    {currentUser.current}
                    {currentUser.current ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <StyledPopup
                                trigger={
                                    <Button ref={popupRef} primary text className={cx('btn-loginin')}>
                                        Đăng nhập
                                    </Button>
                                }
                                modal
                                nested
                            >
                                {(close) => <ModalLogin close={close} />}
                            </StyledPopup>
                        </>
                    )}

                    <Menu items={currentUser.current ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser.current ? (
                            <Images
                                src={userCurrent.avatar}
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                                fallback="https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
