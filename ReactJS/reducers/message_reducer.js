/**
 * Created by kgb on 9/12/17.
 */

import * as Announce_Message_Actions from  "../actions/announceMessageActions"
import * as PDelay_Message_Actions from  "../actions/pdelayMessageActions"

const initialState = {

    isLoadingAnnounceMessages: false,
    isLoadingPDelayMessages: false,
    PDelayMessages: [],
    AnnounceMessages: [],
};

export default function message_reducer(state=initialState, action = {}) {

    if(action.PTP === 'Announce_Message') {

        switch (action.type) {

            case Announce_Message_Actions.FETCH_MESSAGES:
                return {...state, isLoadingAnnounceMessages: true};
            case Announce_Message_Actions.FETCH_MESSAGES_SUCCESS:
                return {...state,  isLoadingAnnounceMessages: false, AnnounceMessages: action.res};
            case Announce_Message_Actions.FETCH_MESSAGES_ERROR400:
            case Announce_Message_Actions.FETCH_MESSAGES_ERROR500:
            case Announce_Message_Actions.FETCH_MESSAGES_FAILURE:
                return {...state, isLoadingAnnounceMessages: false};
            default:
                return state
        }
    } else if(action.PTP === 'PDelay_Message') {

        switch (action.type) {

            case PDelay_Message_Actions.FETCH_MESSAGES:
                return {...state, isLoadingPDelayMessages: true};
            case PDelay_Message_Actions.FETCH_MESSAGES_SUCCESS:
                return {...state, isLoadingPDelayMessages: false, PDelayMessages: action.res};
            case PDelay_Message_Actions.FETCH_MESSAGES_ERROR400:
            case PDelay_Message_Actions.FETCH_MESSAGES_ERROR500:
            case PDelay_Message_Actions.FETCH_MESSAGES_FAILURE:
                return {...state, isLoadingPDelayMessages: false};
            default:
                return state
        }
    }

    return state

}





