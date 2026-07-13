import useLogin from '../stores/login.js'
import useShared from '../stores/shared'
import { isNotEmpty } from 'ramda'

export default function applyGuards(router, ...guards) {
  guards.forEach(router.beforeEach)
  return router
}

export function isLoggedIn(to) {
  const loginStore = useLogin()
  if (
    !loginStore.isAuthenticated &&
    to.name !== 'Login'
  ) {
    return { name: 'Login' }
  }

  if (loginStore.isAuthenticated && to.name == 'Login') {
    return { name: 'Home'}
  }
}

export function havePrivilege(to, from) {
  if (to.name !== 'Login' && to.name !== from.name){
    const profile = useLogin().getProfile
    if(to.meta?.permission && 
      isNotEmpty(to.meta?.permission) && 
      to.meta.permission !== profile) {
      return { name: 'Forbidden' }
    }
  }
}

export function determinateHome(to) {
  const sharedStore = useShared()
  if (to.name !== 'Login'){
    if (to.path === '/' && sharedStore.haveClient) {
      return {
        name: 'ClientDetail',
        params: { id_client: sharedStore.idClient }
      }
    }
  }
}
