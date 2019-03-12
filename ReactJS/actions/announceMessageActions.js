/**
 * Created by kgb on 9/13/17.
 */
import { request } from "../utils"

export const FETCH_MESSAGES = "FETCH_MESSAGES"
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS"
export const FETCH_MESSAGES_ERROR400 = "FETCH_MESSAGES_ERROR400"
export const FETCH_MESSAGES_ERROR500 = "FETCH_MESSAGES_ERROR500"
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE"
export function fetchAnnounceMessages() {
  return function (dispatch) {
    let url = "api/All_Announce_Messages";
    dispatch({type: FETCH_MESSAGES, PTP: 'Announce_Message'});
    return request(
      url, {},
      (json) => { dispatch({type: FETCH_MESSAGES_SUCCESS, PTP: 'Announce_Message', res: json}) },
      (json) => { dispatch({type: FETCH_MESSAGES_ERROR400, PTP: 'Announce_Message', res: json}) },
      (res) => { dispatch({type: FETCH_MESSAGES_ERROR500, PTP: 'Announce_Message', res: res}) },
      (ex) => { dispatch({type: FETCH_MESSAGES_FAILURE, PTP: 'Announce_Message', error: ex}) },
    )
  }
}