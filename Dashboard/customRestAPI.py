from .models import Announce_Message, Path_Delay_Request_Message
class restAPI:

    _Announce_at_last_request = 0
    _PDelay_at_last_request = 0

    def get_new_Announce_count(self):

        self._Announce_at_last_request = Announce_Message.objects.count()

    def get_new_PDelay_count(self):

        self._PDelay_at_last_request = Path_Delay_Request_Message.objects.count()
        Path_Delay_Request_Message.objects.latest()

