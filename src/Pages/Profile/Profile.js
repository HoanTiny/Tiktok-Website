import classNames from 'classnames/bind';
import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { LockIconVideoLiked, ShareProfileIcon, UnfollowIcon } from 'src/components/Icons';
import getAnUserService from '~/services/getAnUserService';
import Popup from 'reactjs-popup';
import ModalEditProfile from '../../components/ModalEditProfile';
import { UserAuth } from 'src/components/store';
import Button from 'src/components/Button';
import unFollowService from 'src/services/unFollowService';
import followService from 'src/services/followUserService';
import { useLocation } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import VideoListUser from 'src/components/VideoListUser/VideoListUser';
import Images from 'src/components/Images/Images';
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
    const location = useLocation();

    const [value, setValue] = React.useState(0);
    const [dataProfile, setDataProfile] = useState(null); // Khởi tạo dataProfile với giá trị ban đầu là null
    const [isFollow, setIsFollow] = useState(null);
    const [pathname, setPathname] = useState(location.pathname);
    // const [currentHoveredVideoId, setCurrentHoveredVideoId] = useState(null);
    // const [hoveredVideoId, setHoveredVideoId] = useState(null);
    // const videoRefs = useRef([]);
    const url = new URL(window.location.href);
    // Tách chuỗi theo dấu "/"
    const match = url.pathname.match(/@([^/]+)/);
    // Lấy ra nickname nếu có
    const nickname = match ? match[1] : null;

    const { userAuth } = UserAuth();

    useEffect(() => {
        // Update state pathname mỗi khi location.pathname thay đổi
        setDataProfile(null);
        setPathname(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        getAnUserService(nickname)
            .then((data) => {
                setTimeout(() => {
                    setDataProfile(data);
                    console.log('data 123', data);
                    setIsFollow(data.is_followed);
                }, 2000);
            })
            .catch((error) => {
                console.log('error', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    console.log(`dataProfile`, dataProfile);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFollowUser = (id) => {
        if (isFollow) {
            unFollowService(id)
                .then((data) => {
                    setIsFollow(false);
                    console.log('unfollow', data);
                })
                .catch((error) => {
                    console.error('Error while fetching follow user:', error);
                });
            return;
        } else {
            followService(id)
                .then((data) => {
                    setIsFollow(true);
                    console.log('follow', data);
                })
                .catch((error) => {
                    console.error('Error while fetching follow user:', error);
                });
            return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            {dataProfile ? (
                <header className={cx('header')}>
                    <div className={cx('header__container')}>
                        <div className={cx('header__container-avatar')}>
                            <Images
                                src={dataProfile.avatar}
                                className={cx('user-avatar')}
                                alt="Avatar"
                                fallback="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                            />

                            {/* <img src={dataProfile.avatar} alt="avatar" /> */}
                        </div>
                        <div className={cx('header__container__info')}>
                            <h3>{dataProfile.nickname}</h3>
                            <p>{dataProfile.first_name + ' ' + dataProfile.last_name}</p>
                            {nickname === userAuth ? (
                                <StyledPopup
                                    trigger={
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                            <span>Sửa hồ sơ</span>
                                        </button>
                                    }
                                    modal
                                >
                                    {(close) => <ModalEditProfile close={close} data={dataProfile} />}
                                </StyledPopup>
                            ) : (
                                <div>
                                    {isFollow ? (
                                        <div className={cx('main_btn')}>
                                            <Button outline text className={cx('btn-sendMessage')}>
                                                Gửi tin nhắn
                                            </Button>
                                            <div className={cx('icon-unfollow')}>
                                                <UnfollowIcon />
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            outline
                                            text
                                            className={cx('btn-follow')}
                                            onClick={() => {
                                                handleFollowUser(dataProfile.id);
                                            }}
                                        >
                                            Theo dõi
                                        </Button>
                                    )}
                                </div>
                            )}
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
            ) : (
                <div className={cx('header')}>
                    <div className={cx('header__container')}>
                        <div className={cx('header__container-avatar')}>
                            <Skeleton circle height={100} width={100} />
                        </div>
                        <div className={cx('header__container__info')}>
                            <Skeleton height={20} width={200} />
                            <Skeleton height={15} width={150} />
                            <Skeleton height={15} width={150} />
                        </div>
                    </div>
                    <div className={cx('header__quantity')}>
                        <Skeleton height={20} width={100} />
                        <Skeleton height={20} width={100} />
                        <Skeleton height={20} width={100} />
                    </div>
                    <div className={cx('header__bio')}>
                        <Skeleton height={50} width="100%" />
                    </div>
                </div>
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
                            {!dataProfile
                                ? // Hiển thị skeleton khi dữ liệu đang được tải
                                  [...Array(5)].map((_, index) => (
                                      <div key={index} className={cx('video-parent')}>
                                          <Skeleton height={200} width={300} />
                                      </div>
                                  ))
                                : // Hiển thị danh sách video khi dữ liệu đã được tải
                                  dataProfile.videos.map((item, index) => <VideoListUser key={index} item={item} />)}
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
