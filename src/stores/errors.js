'use strict'

import { defineStore } from 'pinia'

export default defineStore('toast-error', {
  state: () => ({
    message: '',
    type: '',
    title: '',
    show: false
  })
})
