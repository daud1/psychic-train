import uuid

from django.db import models


class Worker(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    first_name = models.CharField(max_length=128, blank=False, null=False)
    last_name = models.CharField(max_length=128, blank=False, null=False)
    date_of_birth = models.DateField(null=True, default=None)

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


class WorkerAttendance(models.Model):
    arrival_time = models.TimeField()
    departure_time = models.TimeField()
