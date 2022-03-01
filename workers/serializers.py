from rest_framework.serializers import ModelSerializer
from .models import Worker, WorkerAttendance


class WorkerSerializer(ModelSerializer):
    class Meta:
        model = Worker
        fields = "__all__"


class WorkerAttendanceSerializer(ModelSerializer):
    class Meta:
        model = WorkerAttendance
        fields = "__all__"
