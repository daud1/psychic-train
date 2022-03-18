from rest_framework.serializers import (ModelSerializer, StringRelatedField,
                                        ValidationError)

from .models import Worker, WorkerAttendanceLog


class WorkerSerializer(ModelSerializer):
    class Meta:
        model = Worker
        fields = "__all__"


class WorkerAttendanceReadSerializer(ModelSerializer):
    worker = StringRelatedField()

    class Meta:
        model = WorkerAttendanceLog
        fields = ["arrival_time", "departure_time", "worker", "date"]


class WorkerAttendanceSerializer(ModelSerializer):
    class Meta:
        model = WorkerAttendanceLog
        fields = "__all__"

    def validate(self, attrs):
        if attrs["departure_time"] < attrs["arrival_time"]:
            raise ValidationError({"departure_time": "Departure time must be after Arrival!"})
        return attrs
