import classNames from 'classnames/bind';
import * as React from 'react';
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
import video from './Rose.mp4';

const cx = classNames.bind(styles);

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
                    <Typography>{children}</Typography>
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('header__container')}>
                    <div className={cx('header__container-avatar')}>
                        <img
                            src="https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/1020e7310302e439310318eecab8c831.jpeg?lk3s=a5d48078&x-expires=1709276400&x-signature=yQywsiP11v2hIAfIWsMoFWwo3fE%3D"
                            alt="avatar"
                        />
                    </div>
                    <div className={cx('header__container__info')}>
                        <h3>hoantiny01</h3>
                        <p>Hoàn Tiny</p>

                        <button>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span>Sửa hồ sơ</span>
                        </button>
                    </div>

                    {/* Icon share */}
                    <div className={cx('header__container-iconShare')}>
                        <svg
                            width="24"
                            data-e2e=""
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5546 8.35111L13.3171 8.16468V7.37972V3.50006L21.4998 12.0001L13.3171 20.5001V16.3738V15.3664L12.3098 15.3738C8.838 15.3994 5.4275 17.0466 2.49983 19.5882C2.54612 19.2536 2.67769 18.641 2.94391 17.8329C3.3786 16.5132 4.01326 15.1988 4.88691 13.971C6.71045 11.4083 9.24414 9.16046 12.5546 8.35111Z"
                                stroke="#161823"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div className={cx('header__quantity')}>
                    <span>
                        <strong>198</strong> Đang Follow
                    </span>
                    <span>
                        <strong>198</strong> Follower
                    </span>
                    <span>
                        <strong>198</strong> Thích
                    </span>
                </div>
                <div className={cx('header__bio')}>
                    <span>https://beacons.ai/hoantiny</span>
                </div>
            </header>
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
                            <div className={cx('video-list_item')}>
                                <video className={cx('video-list_item-video')}>
                                    <source src={video} type="video/mp4" />
                                </video>
                                <span>Test</span>
                            </div>

                            <div className={cx('video-list_item')}>
                                <video className={cx('video-list_item-video')}>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>

                            <div className={cx('video-list_item')}>
                                <video className={cx('video-list_item-video')}>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>

                            <div className={cx('video-list_item')}>
                                <video className={cx('video-list_item-video')}>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>

                            <div className={cx('video-list_item')}>
                                <video className={cx('video-list_item-video')}>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    );
}

export default Profile;
