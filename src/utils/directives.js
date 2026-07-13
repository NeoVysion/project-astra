'use strict'

import { curry } from 'ramda'
import useLogin from '@/stores/login'

export default curry((app, name, directive = {}) => {
  app.directive(name, directive)
  return app
})

export const hideInLogin = {
  mounted(el) {
    const hook = useLogin()

    const applyVisibility = () => {
      el.style.display = hook.isAuthenticated ? 'inherit' : 'none'
    }

    applyVisibility()

    el.__hideInLoginUnsubscribe__ = hook.$subscribe(applyVisibility)
  },
  unmounted(el) {
    el.__hideInLoginUnsubscribe__?.()
    delete el.__hideInLoginUnsubscribe__
  }
}