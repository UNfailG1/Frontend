import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import Game from '../components/Game'
import ForumList from '../components/ForumList'
import Platform from '../components/Platform'
import PlayerProfile from '../components/PlayerProfile'
import UpdateProfile from '../components/UpdateProfile'
import ThreadList from '../components/ThreadList'
import CommentsList from '../components/CommentsList'
import Reports from '../components/Reports'
import Stats from '../components/Stats'

/*
  add redirect option only if you want redirect with 'when' option =
  'LOGED_IN': has an user loged in
  'VISITOR': hasn't an user loged in

  redirect = {
    when: 'OPTION',
    to: 'somePath'
  }
*/

const ROUTES = [
  { component: Home, path: '/'},
  { component: SignIn,
    path: '/login',
    redirect: { when: 'LOGED_IN', to: '/' }
  },
  { component: SignUp,
    path: '/register',
    redirect: { when: 'LOGED_IN', to: '/' }
  },
  { component: Game,
    path: '/game/:gameId',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: ForumList,
    path: '/forums',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Platform,
    path: '/platforms',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: PlayerProfile,
    path: '/profile/:userId',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: UpdateProfile,
    path: '/updateprofile',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: ThreadList,
    path: '/threads',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: CommentsList,
    path: '/comments',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Reports,
    path: '/secrect_path_reports',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Stats,
    path: '/admin_stats',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: NotFound }
]

export { ROUTES }
