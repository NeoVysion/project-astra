/**
 * @author Fabio Smeriglio
 * @version $Id:$
 */
'use strict'

import { ref } from 'vue'

export function useModal(reload = false, body = {}) {
  const modalVisible = ref(false)

  const toggleModal = (value = false) => {
    modalVisible.value = !modalVisible.value
    if (value && reload) {
      reload(body)
    }
  }

  return {
    modalVisible,
    toggleModal
  }
}