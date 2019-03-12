from rest_framework import serializers
from .models import Announce_Message, Path_Delay_Request_Message

class Announce_MessageSerializer(serializers.ModelSerializer):

    class Meta:

        model = Announce_Message
        fields = '__all__'

class PDelay_MessageSerializer(serializers.ModelSerializer):

    class Meta:

        model = Path_Delay_Request_Message
        fields = '__all__'
