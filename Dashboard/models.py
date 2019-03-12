from django.db import models

class Announce_Message(models.Model):

    class Meta:

        unique_together = (('id', 'sniff_timestamp'),)


    clockidentity = models.CharField(max_length=200, default='')
    sniff_timestamp = models.FloatField(default=0.0, unique=True)
    control = models.IntegerField(default=0, null=True)
    messageid = models.IntegerField(default=0, null = True)
    sequence_id = models.IntegerField(default=0, null=True)
    IP_SRC = models.CharField(max_length=200, null=True)
    IP_DST = models.CharField(max_length=200, null=True)
    ETH_SRC = models.CharField(max_length=200)
    ETH_DST = models.CharField(max_length=200)
    SRC_PORT = models.IntegerField(default=0, null=True)
    DST_PORT = models.IntegerField(default=0, null=True)
    GMClockIdentity = models.CharField(max_length=200, null=True)
    GMClockClass = models.IntegerField(default=0, null=True)
    GMClockVariance = models.IntegerField(default=0, null=True)
    GMClockAccuracy = models.IntegerField(default=0, null=True)
    STATE = models.CharField(max_length=200, null=True)
    priority_1 = models.IntegerField(default=0, null=True)
    priority_2 = models.IntegerField(default=0, null=True)
    subdomain_number = models.CharField(max_length=10000, null=True)
    timesource = models.CharField(max_length=50, null=True)
    localstepsremoved = models.IntegerField(default=0, null=True)
    timetraceable = models.IntegerField(default=0, null=True)
    frequencytraceable = models.IntegerField(default=0, null=True)
    utcreasonable = models.IntegerField(default=0, null=True)
    alternateMasterFlag = models.IntegerField(default=0, null = True)
    timescale = models.IntegerField(default=0, null = True)
    flags = models.CharField(max_length=50, null=True)
    li59 =models.IntegerField(default=0, null = True)
    li61 = models.IntegerField(default=0, null = True)
    correction_ns = models.IntegerField(default=0, null = True)
    correction_subns = models.IntegerField(default=0, null = True)
    sourceport_id = models.IntegerField(default=0, null = True)
    logmessageperiod = models.IntegerField(default=0, null=True)
    origintimestampseconds = models.IntegerField(default=0, null = True)
    origintimestampnanoseconds = models.IntegerField(default=0, null = True)
    utc_offset = models.IntegerField(default=0, null = True)
    length = models.IntegerField(default=0, null=True)
    messagelength = models.IntegerField(default=0, null=True)
    security = models.IntegerField(default=0, null=True)
    unicast = models.IntegerField(default=0, null=True)
    twostep = models.IntegerField(default=0, null=True)
    layer_name = models.CharField(max_length=50, null = True)
    version_ptp = models.IntegerField(default=0, null=True)
    ATOI_Key = models.IntegerField(default=0, null=True)
    ATOI_Offset = models.FloatField(default = 0.0, null=True)
    ATOI_TLVType = models.IntegerField(default=0, null=True)
    ATOI_JumpSeconds= models.FloatField(default=0.0, null=True)
    ATOI_DisplayName = models.CharField(max_length=50, null=True)
    ATOI_DisplayNameLength = models.IntegerField(default=0, null=True)
    ATOI_TimeOfNextJump = models.CharField(max_length=50, null=True)

    def __unicode__(self):

        return self.clockidentity

    def __str__(self):

        return self.clockidentity + '\n' + self.GMClockIdentity + '\n' + self.ETH_SRC  + '\n' + self.ETH_DST + '\n' + str(self.sequence_id)

    def get_fields(self):

        return [(field.name, field.value_to_string(self)) for field in Announce_Message._meta.fields]


class Path_Delay_Request_Message(models.Model):

    class Meta:

        unique_together = (('id', 'sniff_timestamp'),)

    clockidentity = models.CharField(max_length=200, default='')
    sniff_timestamp = models.FloatField(default=0.0, unique=True)
    control = models.IntegerField(default=0, null=True)
    messageid = models.IntegerField(default=0, null = True)
    sequence_id = models.IntegerField(default=0)
    IP_SRC = models.CharField(max_length=200, null=True)
    IP_DST = models.CharField(max_length=200, null=True)
    ETH_SRC = models.CharField(max_length=200)
    ETH_DST = models.CharField(max_length=200)
    origintimestampseconds = models.IntegerField(default=0, null=True)
    origintimestampnanoseconds = models.IntegerField(default=0, null=True)
    timetraceable = models.IntegerField(default=0, null=True)
    frequencytraceable = models.IntegerField(default=0, null=True)
    li59 = models.IntegerField(default=0, null=True)
    li61 = models.IntegerField(default=0, null=True)
    correction_ns = models.IntegerField(default=0, null=True)
    correction_subns = models.IntegerField(default=0, null=True)
    sourceport_id = models.IntegerField(default=0, null=True)
    logmessageperiod = models.IntegerField(default=0, null=True)
    utcreasonable = models.IntegerField(default=0, null=True)
    flags = models.CharField(max_length=50, null=True)
    length = models.IntegerField(default=0, null=True)
    messagelength = models.IntegerField(default=0, null=True)
    security = models.IntegerField(default=0, null=True)
    unicast = models.IntegerField(default=0, null=True)
    twostep = models.IntegerField(default=0, null=True)
    layer_name = models.CharField(max_length=50, null=True)
    version_ptp = models.IntegerField(default=0, null=True)

# Create Path Delay Request Model for Multicast MAC Address Test

