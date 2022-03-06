import uuid

from django.core.exceptions import ValidationError
from django.db import models


class Worker(models.Model):
    class Meta:
        db_table = "worker"

    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    first_name = models.CharField(max_length=128, blank=False, null=False)
    last_name = models.CharField(max_length=128, blank=False, null=False)
    date_of_birth = models.DateField(null=True, default=None)

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{str(self.id)[:8]}: {self.first_name} {self.last_name}"


class WorkerAttendanceLog(models.Model):
    class Meta:
        db_table = "worker_attendance_log"

    arrival_time = models.TimeField()
    departure_time = models.TimeField()
    worker = models.ForeignKey(to="Worker", on_delete=models.DO_NOTHING, null=False, blank=False)

    def clean(self):
        if self.departure_time < self.arrival_time:
            raise ValidationError(
                {"departure_time": ValidationError("Departure must occur after arrival.", code="invalid")}
            )

    def save(self, *args, **kwargs):
        self.clean()
        super(WorkerAttendanceLog, self).save(*args, **kwargs)
