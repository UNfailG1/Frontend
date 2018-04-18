import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import GameInfo from '../components/GameInfo'
import ForumList from '../components/ForumList'
import Platform from '../components/Platform'
import PlayerProfile from '../components/PlayerProfile'
import UpdateProfile from '../components/UpdateProfile'

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
  { component: GameInfo,
    path: '/gameinfo',
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
    path: '/profile',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: UpdateProfile,
    path: '/updateprofile',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: NotFound }
]

export { ROUTES }
