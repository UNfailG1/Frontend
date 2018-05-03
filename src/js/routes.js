import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import Game from '../components/Game'
import Platform from '../components/Platform'
import PlayerProfile from '../components/PlayerProfile'
import UpdateProfile from '../components/UpdateProfile'
import Reports from '../components/Reports'
import Dashboard from '../components/Dashboard'
import Mailbox from '../components/Mailbox'

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
  { component: Dashboard,
    path: '/dashboard',
    redirect: { when: 'VISITOR', to: '/' }
  },
  { component: Home,
    path: '/',
    redirect: { when: 'LOGED_IN', to: '/dashboard' }
  },
  { component: SignIn,
    path: '/login',
    redirect: { when: 'LOGED_IN', to: '/dashboard' }
  },
  { component: SignUp,
    path: '/register',
    redirect: { when: 'LOGED_IN', to: '/dashboard' }
  },
  { component: Game,
    path: '/game/:gameId',
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
  { component: Reports,
    path: '/secrect_path_reports',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Mailbox,
    path: '/mailbox',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: NotFound }
]

export { ROUTES }
