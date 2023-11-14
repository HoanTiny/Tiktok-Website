import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import * as userService from '~/services/userService';
// import * as accountFollowingService from '~/services/accountFollowingService';

import SuggestedAccount from 'src/components/SuggestedAccount';
import config from 'src/config';

const cx = classNames.bind(styles);

function Sidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    // const [followingAccount, setFollowingAccount] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: 5 })
            .then((data) => {
                setSuggestedUsers(data);
            })
            .catch((error) => console.log(`error`, error));

        // accountFollowingService
        //     .getfollowingsAccount({ page: 1 })
        //     .then((data) => {
        //         setFollowingAccount(data);
        //     })
        //     .catch((error) => console.log(`error`, error));
    });

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

            <SuggestedAccount label="Suggested accounts" data={suggestedUsers} />
            <SuggestedAccount label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
