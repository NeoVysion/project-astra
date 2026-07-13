'use strict'
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/it' // Importa la localizzazione italiana

// Abilita i plugin
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
// Imposta la lingua italiana
dayjs.locale('it')

export const toastMessage = ( description, type) => {
  const duration = 3000
  const options = {
    content: () => description,
    class: type+'-msg-class',
    style: {
      marginTop: '0',
    },
  }

  switch(type) {
    case "info":
      message.info(options, duration)
      break
    case "warning":
      message.warning(options, duration)
      break
    case "error":
      message.error(options, duration)
      break
    case "success":
      message.success(options, duration)
      break
  }
}

export const dateToString = (date) => {
  if(date) {
    // Convertiamo il campo seconds + nanoseconds in millisecondi
    const dateInMillis = date.seconds * 1000 + date.nanoseconds / 1000000
    // Converte il timestamp da UTC a fuso orario italiano (Europe/Rome)
    const localDate = dayjs.utc(dateInMillis).tz('Europe/Rome').format('DD MMMM YYYY HH:mm')

    return localDate
  } else {
    return ''
  }
}

