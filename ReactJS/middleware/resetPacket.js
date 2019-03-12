/**
 * Created by kgb on 9/26/17.
 */
let packet;

export function reset(){

    packet = {

            IP_SRC: '',
            IP_DST: '',
            ETH_SRC: '',
            ETH_DST: '',
            sniff_timestamp: 0,
            sequence_id: 0,
            clockidentity: '',
            GMClockIdentity: '',
            localstepsremoved: '',
            alternateMasterFlag: 0,
            GMClockClass: 128,
            GMClockAccuracy: 0,
            GMClockVariance: 0,
            priority_1: 128,
            priority_2: 128,
            subdomain_number: 0,
            STATE: '',
            comparison: ''
    };

    return(packet)
}