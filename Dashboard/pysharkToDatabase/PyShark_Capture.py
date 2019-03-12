import pyshark
from pyshark_parser import packet_util

# This program parses through PCAP files from wireshark
# to find the Message Type, Message ID, Origin Timestamp in seconds
# and nanoseconds and finds whether the timesource came from a GPS
# signal or not.

def get_field_names(layer):                               # gets each of the field names of a specific layer in the packet

    z = 0
    while z <= len(layer.field_names) - 1:

        print(layer.field_names[z])

        z += 1

def is_field_here(pkt, layer, field):                   # checks whether a certain field exists in a layer of the packet
                                                        # also changes the field name to a format that the pyshark utilities can work with
    field = pkt[layer]._sanitize_field_name(field)
    z = 0
    while z <= len(pkt[layer].field_names)-1:

        if field == pkt[layer].field_names[z]:
            return True
        z += 1
    return False


def get_message_type(pkt):                             # returns the message type that you see in wireshark

    message_types = {

        0: ("Sync Message", "Follow_Up Message")[int(pkt.ptp.v2_messageid) == 8],
        3: "Delay_Resp",
        5: (("Path Delay Request", "Path Delay Response")[int(pkt.ptp.v2_messageid) == 3], "Announce Message")[int(pkt.ptp.v2_messageid) == 11]

    }
    x = message_types.get(int(pkt.ptp.v2_control))
    return x


def get_ip(pkt, f):                                      # gets the source IP address of the message if the packet has an IP layer (It usually should)

    if pkt.__contains__('ip'):
        return pkt['ip'].get_field(f)
    else:
        return None


def get_timesource(pkt):                                                        # checks the field names to see if the timesource is added. If it is it prints it out.
                                                                                # The timesource is only present on the 'Announce Message' types
    z = 0
    while z <= len(pkt.ptp.field_names) - 1:

        if pkt.ptp.field_names[z] == 'v2_timesource':

            return 'GPS(0x20)'

        z += 1

def get_field(pkt, layer, field):

    if pkt.__contains__(layer):

        if is_field_here(pkt, layer, field) == True:
            return packet_util.get_value_from_packet_for_layer_field(pkt, layer, field)
        else:
            return None

#cap = pyshark.FileCapture('/Users/kgb/Desktop/PTPCapture20160919_21.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/BMCA_P2P_UDP_170616.pcapng')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/BMCA2_P2P_UDP_170616.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/170711_Paragon2Master_BMCA_Test.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/P2P_Ethernet_170804_HoldoverTest.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/BMCATest.pcapng')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/170814_BMCA_GM_Switchover.pcap')
#cap = pyshark.FileCapture('/Users/kgb/Desktop/BMCA_P2P_MultiDomain2.pcapng')


