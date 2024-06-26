import config from '~/config';

//Layouts
// import { HeaderOnly } from '../layouts';

//Pages
import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Profile from '~/Pages/Profile';
import Upload from '~/Pages/Upload';
import Search from '~/Pages/Search';
import Live from '~/Pages/Live';
import DetailVideo from '~/Pages/DetailVideo';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: `${config.routes.profile}`, component: Profile },
    { path: config.routes.upload, component: Upload, layout: null },
    { path: config.routes.search, component: Search, layout: null },
    { path: `${config.routes.detailVideo}`, component: DetailVideo, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
