/**
 * Created by kgb on 9/22/17.
 */

export function input_code(code, type){

    if(type === 'timesource') {
        switch (parseInt(code)) {

            case 16:
                return ('Source: Atomic Clock');
            case 32:
                return ('Source: GPS');
            case 48:
                return ('Source:Terrestrial');
            case 64:
                return ('Source: PTP');
            case 80:
                return ('Source: NTP');
            case 96:
                return ('Source: Handset');
            case 144:
                return ('Source: Other');
            case 160:
                return ('Source: Internal Oscillator');

        }

    }

    if(type === 'clockaccuracy') {

        switch (parseInt(code)) {

            case 32:
                return ('Time is accurate to within 25 ns');
            case 33:
                return ('Time is accurate to within 100 ns');
            case 34:
                return ('Time is accurate to within 250 ns');
            case 35:
                return ('Time is accurate to within 1 us');
            case 36:
                return ('Time is accurate to within 2.5 us');
            case 37:
                return ('Time is accurate to within 10 us');
            case 38:
                return ('Time is accurate to within 25 us');
            case 39:
                return ('Time is accurate to within 100 us');
            case 40:
                return ('Time is accurate to within 250 us');
            case 41:
                return ('Time is accurate to within 1 ms');
            case 42:
                return ('Time is accurate to within 2.5 ms');
            case 43:
                return ('Time is accurate to within 10 ms');
            case 44:
                return ('Time is accurate to within 25 ms');
            case 45:
                return ('Time is accurate to within 100 ms');
            case 46:
                return ('Time is accurate to within 250 ms');
            case 47:
                return ('Time is accurate to within 1 s');
            case 48:
                return ('Time is accurate to within 10 s');
            case 49:
                return ('Time is accurate to > 10 s');

        }
    }

    if(type === 'clockclass') {
        switch (parseInt(code)) {

            case 6:
                return ('PTP GM synchronized to primary reference time source, PTP Time scale.');
            case 7:
                return ('PTP GM in holdover mode within specifications, PTP Time scale.');
            case 13:
                return ('PTP GM synchronized to application specific time, ARB Time scale.');
            case 14:
                return ('PTP GM in holdover mode, ARB Time scale, within specifications.');
            case 52:
                return ('PTP GM in holdover mode out of specifications, PTP Time scale.');
            case 58:
                return ('PTP GM in holdover mode out of specifications, ARB Time scale.');
            case 187:
                return ('PTP GM in holdover mode out of specifications, PTP Time scale. May be slave to another clock in another domain.');
            case 193:
                return ('PTP GM in holdover mode out of specifications, ARB Time scale. May be slave to another clock in another domain.');
            case 248:
                return ('Default clock class');
            case 255:
                return ('Slave-Only');
        }
    }
}
