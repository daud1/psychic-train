from rest_framework.serializers import ModelSerializer, ValidationError

from .models import Worker, WorkerAttendanceLog


class WorkerSerializer(ModelSerializer):
    class Meta:
        model = Worker
        fields = "__all__"


class WorkerAttendanceSerializer(ModelSerializer):
    class Meta:
        model = WorkerAttendanceLog()
        fields = "__all__"

    def validate(self, attrs):
        if attrs["departure_time"] < attrs["arrival_time"]:
            raise ValidationError({"departure_time": "Departure must be after Arrival time!"})
        return attrs
