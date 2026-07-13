import useLogin from '@/stores/login';

// URL del Web App Apps Script (quello che finisce in /exec)
const API_URL = 'https://script.google.com/macros/s/AKfycbw9lvr3sSa5ZaKDisTgor7SDCQN-RjMujeCJstL9RQTx2V0vthCzjNXOeAwbej7qMdE-w/exec';


/**
 * Recupera il PLEVEL dell'utente attualmente loggato.
 * Usato per permettere al backend di applicare eventuali redazioni.
 */
function getViewerPlevel() {
  const login = useLogin();

  if (!login.loggedIn || !login.user || !login.user.PLEVEL) {
    return null;
  }

  return login.user.PLEVEL;
}


/**
 * Funzione generica di chiamata verso l'Apps Script.
 * Content-Type "text/plain" voluto: con "application/json"
 * il browser scatena una preflight OPTIONS che Apps Script
 * non gestisce.
 */
async function callApi(controller, action, body = {}) {

  const requestBody = {
    controller,
    action,
    body: {
      ...body,
      viewer_plevel: getViewerPlevel()
    }
  };


  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(requestBody),
  });


  const result = await response.json();


  if (!result.success) {
    throw new Error(
      result.error?.message || 'Errore sconosciuto dal server'
    );
  }


  return result.data;
}


export default {

  login: {
    authenticate: (payload) =>
      callApi('login', 'authenticate', payload),
  },


  members: {
    list: (payload = {}) =>
      callApi('members', 'list', payload),
  }

};