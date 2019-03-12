from rest_framework import generics
from django.views import generic
from Dashboard.models import Announce_Message, Path_Delay_Request_Message
from .serializers import Announce_MessageSerializer
from .customRestAPI import restAPI

API = restAPI()

class Announce_MessageRESTListView(generics.ListCreateAPIView):

    serializer_class = Announce_MessageSerializer
    def get_queryset(self):

        Announce_Message_filter = Announce_Message.objects.filter(id__gt= API._Announce_at_last_request)
        API.get_new_Announce_count()
        return(Announce_Message_filter)

class PDelay_MessageRESTListView(generics.ListCreateAPIView):

    serializer_class = Announce_MessageSerializer
    def get_queryset(self):

        PDelay_Message_filter = Path_Delay_Request_Message.objects.filter(id__gt= API._PDelay_at_last_request)
        API.get_new_PDelay_count()
        return(PDelay_Message_filter)

'''
class PDelay_MessageRESTDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Path_Delay_Request_Message.objects.all()
    serializer_class = Announce_MessageSerializer


class Announce_MessageRESTDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Announce_Message.objects.all()
    serializer_class = Announce_MessageSerializer

'''