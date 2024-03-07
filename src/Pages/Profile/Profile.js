import classNames from 'classnames/bind';
import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// import { Tab } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { CounterViewIcon, LockIconVideoLiked, ShareProfileIcon } from 'src/components/Icons';
import getAnUserService from '~/services/getAnUserService';
import Popup from 'reactjs-popup';
import ModalEditProfile from '../../components/ModalEditProfile';

const cx = classNames.bind(styles);

const StyledPopup = styled(Popup)`
    // use your custom style for ".popup-overlay"
    &-overlay {
        background: rgba(0, 0, 0, 0.5);
    }
    // use your custom style for ".popup-content"
    &-content {
        border-radius: 8px;
        transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
        transform: none;
        margin: auto;
        position: relative;
        overflow: hidden;
        display: flex;
        background-color: rgb(255, 255, 255);
    }
`;

const StyledTabs = styled((props) => (
    <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '16px',
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.7)',
    '&.Mui-selected': {
        color: '#000',
        fontSize: '16px',
        fontWeight: '700',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function Profile() {
    const [value, setValue] = React.useState(0);
    const [dataProfile, setDataProfile] = useState(null); // Khởi tạo dataProfile với giá trị ban đầu là null

    const videoRef = useRef(null);
    const url = new URL(window.location.href);
    // Tách chuỗi theo dấu "/"
    const match = url.pathname.match(/@([^/]+)/);
    // Lấy ra nickname nếu có
    const nickname = match ? match[1] : null;
    useEffect(() => {
        getAnUserService(nickname)
            .then((data) => {
                setDataProfile(data);
            })
            .catch((error) => {
                console.log('error', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nickname]);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            console.log('videoRef', videoRef.current);
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx('wrapper')}>
            {dataProfile && (
                <header className={cx('header')}>
                    <div className={cx('header__container')}>
                        <div className={cx('header__container-avatar')}>
                            <img src={dataProfile.avatar} alt="avatar" />
                        </div>
                        <div className={cx('header__container__info')}>
                            <h3>{dataProfile.nickname}</h3>
                            <p>{dataProfile.first_name + ' ' + dataProfile.last_name}</p>

                            <StyledPopup
                                trigger={
                                    <button>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                        <span>Sửa hồ sơ</span>
                                    </button>
                                }
                                modal
                            >
                                {(close) => <ModalEditProfile close={close} />}
                            </StyledPopup>
                        </div>

                        {/* Icon share */}
                        <div className={cx('header__container-iconShare')}>
                            <ShareProfileIcon />
                        </div>
                    </div>
                    <div className={cx('header__quantity')}>
                        <span>
                            <strong>{dataProfile.followings_count}</strong> Đang Follow
                        </span>
                        <span>
                            <strong>{dataProfile.followers_count}</strong> Follower
                        </span>
                        <span>
                            <strong>{dataProfile.likes_count}</strong> Thích
                        </span>
                    </div>
                    <div className={cx('header__bio')}>
                        <span>{dataProfile.bio}</span>
                    </div>
                </header>
            )}
            <div>
                <Box sx={{ maxWidth: { xs: 320, sm: 100 + '%' }, bgcolor: 'background.paper' }}>
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="styled scrollable auto tabs example"
                    >
                        <StyledTab label="Video" />
                        <StyledTab icon={<LockIcon />} label="Yêu thích" iconPosition="start" />
                        <StyledTab icon={<LockIcon />} label="Đã thích" iconPosition="start" />
                    </StyledTabs>
                    <CustomTabPanel value={value} index={0}>
                        <div className={cx('video-list')}>
                            {dataProfile &&
                                dataProfile.videos.map((item, index) => (
                                    <a href="https://www.w3schools.com" key={index}>
                                        <div className={cx('video-parent')}>
                                            <div className={cx('video-parent_container')}>
                                                <div className={cx('video-list_item')}>
                                                    <video
                                                        ref={videoRef}
                                                        className={cx('video-list_item-video')}
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        loop
                                                        muted
                                                    >
                                                        <source src={item.file_url} type="video/mp4" />
                                                    </video>
                                                </div>
                                            </div>
                                            <div className={cx('video-view')}>
                                                <CounterViewIcon className={cx('video-view_icon')} />
                                                <span className={cx('video-view_number')}>{item.views_count}</span>
                                            </div>
                                        </div>
                                        <div className={cx('video-list_title')}>
                                            <span className={cx('video-title')}>{item.description}</span>
                                        </div>
                                    </a>
                                ))}
                            {/* <a href="https://www.w3schools.com">
                                <div className={cx('video-parent')}>
                                    <div className={cx('video-parent_container')}>
                                        <div className={cx('video-list_item')}>
                                            <video
                                                ref={videoRef}
                                                className={cx('video-list_item-video')}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                loop
                                                muted
                                            >
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <div className={cx('video-view')}>
                                        <CounterViewIcon className={cx('video-view_icon')} />
                                        <span className={cx('video-view_number')}>1.2M</span>
                                    </div>
                                </div>
                                <div className={cx('video-list_title')}>
                                    <span className={cx('video-title')}>Ngại quá bay ơi...</span>
                                </div>
                            </a>

                            <a href="https://www.w3schools.com">
                                <div className={cx('video-parent')}>
                                    <div className={cx('video-parent_container')}>
                                        <div className={cx('video-list_item')}>
                                            <video className={cx('video-list_item-video')} controls>
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <div className={cx('video-view')}>
                                        <CounterViewIcon className={cx('video-view_icon')} />
                                        <span className={cx('video-view_number')}>1.2M</span>
                                    </div>
                                </div>
                                <div className={cx('video-list_title')}>
                                    <span className={cx('video-title')}>Ngại quá bay ơi Ngại quá bay ơi...</span>
                                </div>
                            </a>

                            <a href="https://www.w3schools.com">
                                <div className={cx('video-parent')}>
                                    <div className={cx('video-parent_container')}>
                                        <div className={cx('video-list_item')}>
                                            <video className={cx('video-list_item-video')} controls>
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <div className={cx('video-view')}>
                                        <CounterViewIcon className={cx('video-view_icon')} />
                                        <span className={cx('video-view_number')}>1.2M</span>
                                    </div>
                                </div>
                                <div className={cx('video-list_title')}>
                                    <span className={cx('video-title')}>Ngại quá bay ơi...</span>
                                </div>
                            </a>

                            <a href="https://www.w3schools.com">
                                <div className={cx('video-parent')}>
                                    <div className={cx('video-parent_container')}>
                                        <div className={cx('video-list_item')}>
                                            <video className={cx('video-list_item-video')} controls>
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <div className={cx('video-view')}>
                                        <CounterViewIcon className={cx('video-view_icon')} />
                                        <span className={cx('video-view_number')}>1.2M</span>
                                    </div>
                                </div>
                                <div className={cx('video-list_title')}>
                                    <span className={cx('video-title')}>Ngại quá bay ơi...</span>
                                </div>
                            </a>

                            <a href="https://www.w3schools.com">
                                <div className={cx('video-parent')}>
                                    <div className={cx('video-parent_container')}>
                                        <div className={cx('video-list_item')}>
                                            <video className={cx('video-list_item-video')} controls>
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <div className={cx('video-view')}>
                                        <CounterViewIcon className={cx('video-view_icon')} />
                                        <span className={cx('video-view_number')}>1.2M</span>
                                    </div>
                                </div>
                                <div className={cx('video-list_title')}>
                                    <span className={cx('video-title')}>Ngại quá bay ơi...</span>
                                </div>
                            </a> */}
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {dataProfile && (
                            <div className={cx('video-private-liked')}>
                                <div className={cx('icon-locked')}>
                                    <LockIconVideoLiked />
                                </div>
                                <h2 className={cx('headline-video-locked')}>
                                    Video đã thích của người dùng này ở trạng thái riêng tư
                                </h2>
                                <p className={cx('headline-video-title')}>
                                    Các video được thích bởi {dataProfile.nickname} hiện đang ẩn
                                </p>
                            </div>
                        )}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        {dataProfile && (
                            <div className={cx('video-private-liked')}>
                                <div className={cx('icon-locked')}>
                                    <LockIconVideoLiked />
                                </div>
                                <h2 className={cx('headline-video-locked')}>
                                    Video đã thích của người dùng này ở trạng thái riêng tư
                                </h2>
                                <p className={cx('headline-video-title')}>
                                    Các video được thích bởi {dataProfile.nickname} hiện đang ẩn
                                </p>
                            </div>
                        )}
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    );
}

export default Profile;
