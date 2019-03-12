from ..models import Announce_Message, Path_Delay_Request_Message
import pyshark
import multiprocessing
import time
from ..pysharkToDatabase import PyShark_Capture
import netifaces

class StartApp:

    def __init__(self, interval=1):

        self.interval = interval
        snifferAnnounce = multiprocessing.Process(target=self.sniffAnnounceMessages)
        snifferAnnounce.daemon = True
        snifferAnnounce.start()

    def sniffAnnounceMessages(self):

        interface_list = netifaces.interfaces()
        capture = pyshark.LiveCapture(interface_list)
        #capture = pyshark.FileCapture('/Users/kgb/Desktop/BMCA_P2P_MultiDomain2.pcapng', keep_packets=False)

        for packet in capture:

            try:

                if PyShark_Capture.get_message_type(packet) == 'Announce Message':

                    Announce_Message.objects.create(

                        clockidentity=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.clockidentity'),
                        messageid=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.messageid'),
                        layer_name=PyShark_Capture.get_field(packet, 'ptp', 'ptp._layer_name'),
                        length=packet.length,
                        version_ptp=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.versionptp'),
                        messagelength=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.messagelength'),
                        flags=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags'),
                        security=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.security'),
                        unicast=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.unicast'),
                        twostep=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.twostep'),
                        frequencytraceable=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.frequencytraceable'),
                        timetraceable=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.timetraceable'),
                        timescale=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.timescale'),
                        utcreasonable=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.utcreasonable'),
                        li59=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.li59'),
                        li61=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.li61'),
                        correction_ns=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.correction.ns'),
                        correction_subns=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.correction.subns'),
                        control=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.control'),
                        logmessageperiod=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.logmessageperiod'),
                        origintimestampseconds=PyShark_Capture.get_field(packet, 'ptp','ptp.v2.an.origintimestamp.seconds'),
                        origintimestampnanoseconds=PyShark_Capture.get_field(packet, 'ptp','ptp.v2.an.origintimestamp.nanoseconds'),
                        utc_offset=PyShark_Capture.get_field(packet, 'ptp','ptp.v2.an.origincurrentutcoffset'),
                        IP_SRC=PyShark_Capture.get_ip(packet, 'src'),
                        IP_DST=PyShark_Capture.get_ip(packet, 'dst'),
                        ETH_SRC=PyShark_Capture.get_field(packet, 'eth', 'eth.src'),
                        ETH_DST=PyShark_Capture.get_field(packet, 'eth', 'eth.dst'),
                        SRC_PORT=PyShark_Capture.get_field(packet, 'udp', 'udp.srcport'),
                        DST_PORT=PyShark_Capture.get_field(packet, 'udp', 'udp.dstport'),
                        sniff_timestamp=float(packet.sniff_timestamp),
                        sequence_id=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.sequenceid'),
                        GMClockIdentity=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.grandmasterclockidentity'),
                        localstepsremoved=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.localstepsremoved'),
                        alternateMasterFlag=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.alternatemaster'),
                        GMClockAccuracy=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.grandmasterclockaccuracy'),
                        GMClockClass=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.grandmasterclockclass'),
                        GMClockVariance=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.grandmasterclockvariance'),
                        priority_1=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.priority1'),
                        priority_2=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.priority2'),
                        sourceport_id=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.sourceportid'),
                        timesource=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.timesource'),
                        subdomain_number=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.subdomainnumber'),
                        ATOI_Key=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.atoi.keyField'),
                        ATOI_Offset=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.atoi.currentOffset'),
                        ATOI_TLVType=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.tlvType'),
                        ATOI_JumpSeconds=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.atoi.jumpSeconds'),
                        ATOI_TimeOfNextJump=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.atoi.timeOfNextJump'),
                        ATOI_DisplayName=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.an.atoi.displayName'),
                        ATOI_DisplayNameLength=PyShark_Capture.get_field(packet, 'ptp','ptp.v2.an.atoi.displayName.length')
                    )

                elif PyShark_Capture.get_message_type(packet) == 'Path Delay Request':

                    Path_Delay_Request_Message.objects.create(

                        clockidentity=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.clockidentity'),
                        messageid=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.messageid'),
                        length=packet.length,
                        version_ptp=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.versionptp'),
                        messagelength=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.messagelength'),
                        flags=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags'),
                        security=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.security'),
                        unicast=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.unicast'),
                        twostep=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.twostep'),
                        frequencytraceable=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.frequencytraceable'),
                        timetraceable=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.timetraceable'),
                        utcreasonable=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.utcreasonable'),
                        li59=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.li59'),
                        li61=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.flags.li61'),
                        correction_ns=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.correction.ns'),
                        correction_subns=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.correction.subns'),
                        control=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.control'),
                        logmessageperiod=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.logmessageperiod'),
                        origintimestampseconds=PyShark_Capture.get_field(packet, 'ptp','ptp.v2.pdrq.origintimestamp.seconds'),
                        origintimestampnanoseconds=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.pdrq.origintimestamp.nanoseconds'),
                        IP_SRC=PyShark_Capture.get_ip(packet, 'src'),
                        IP_DST=PyShark_Capture.get_ip(packet, 'dst'),
                        ETH_SRC=PyShark_Capture.get_field(packet, 'eth', 'eth.src'),
                        ETH_DST=PyShark_Capture.get_field(packet, 'eth', 'eth.dst'),
                        sniff_timestamp=float(packet.sniff_timestamp),
                        sequence_id=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.sequenceid'),
                        sourceport_id=PyShark_Capture.get_field(packet, 'ptp', 'ptp.v2.sourceportid'),
                    )

            except AttributeError:

                pass

            #time.sleep(0.1)



#cap = pyshark.FileCapture('/Users/kgb/Desktop/PTPCapture20160919_21.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/BMCA_P2P_UDP_170616.pcapng')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/BMCA2_P2P_UDP_170616.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/170711_Paragon2Master_BMCA_Test.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/P2P_Ethernet_170804_HoldoverTest.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/BMCATest.pcapng')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/170814_BMCA_GM_Switchover.pcap')
#capture = pyshark.FileCapture('/Users/kgb/Desktop/BMCA_P2P_MultiDomain2.pcapng')

