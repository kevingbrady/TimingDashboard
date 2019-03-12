import pyshark
import PyShark_Capture
import datetime
import subprocess
import time

pingFlag = 0
ptpFlag = 1


if ptpFlag == 1:

    # capture = pyshark.FileCapture('/Users/kgb/Desktop/IOP/Omicron_Holdover.pcapng')
    capture = pyshark.FileCapture('/Users/kgb/Desktop/BMCA_P2P_MultiDomain2.pcapng', keep_packets=False)
    # capture = pyshark.LiveCapture(['en0', 'en5'])
    utc_offset = 0
    ptpstamp = 0
    lastptpstamp = 0

    for packet in capture:

        try:

            if utc_offset == 0 and PyShark_Capture.get_message_type(packet) == 'Announce Message':

                utc_offset = float(PyShark_Capture.get_field(packet, 'ptp','ptp.v2.an.origincurrentutcoffset'))

            if PyShark_Capture.get_message_type(packet) == 'Sync Message':

                ptpstamp = float(PyShark_Capture.get_field(packet, 'ptp','ptp.v2.sdr.origintimestamp.seconds')) + (float(PyShark_Capture.get_field(packet, 'ptp','ptp.v2.sdr.origintimestamp.nanoseconds')) * 1e-9) - utc_offset
                print(float(packet.sniff_timestamp) - ptpstamp)

        except AttributeError:

            pass


if pingFlag == 1:

    hostname = '129.6.60.38'
    start = 'time='
    end = 'ms'
    rtt = 0

    while 1:

        response = subprocess.Popen(["ping", "-c1", hostname], stdout= subprocess.PIPE).stdout.read().decode('utf-8')
        rtt = float(response[response.find(start) + len(start): response.find(end)])/1000
        print(rtt/2)
        time.sleep(1)


