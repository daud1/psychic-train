import uuid
from datetime import date

from django.db import models

REQ_STATUS = ["PENDING", "DENIED", "FULFILLED"]


class Material(models.Model):
    class Meta:
        db_table = "material"

    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    name = models.CharField(max_length=128, null=False, blank=False)
    units = models.CharField(max_length=128)

    def __str__(self):
        return f"{str(self.id)[:8]} : {self.name}"

    @property
    def unit_price(self):
        return self.unit_px.amount_ugx if self.unit_px else None


class MaterialUnitPrice(models.Model):
    class Meta:
        db_table = "material_unit_price"

    material = models.OneToOneField(to="Material", related_name="unit_px", on_delete=models.CASCADE)
    amount_ugx = models.PositiveIntegerField()


class MaterialResupplyLog(models.Model):
    class Meta:
        db_table = "material_resupply_log"

    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    material = models.ForeignKey(to="Material", on_delete=models.DO_NOTHING)
    quantity = models.DecimalField(decimal_places=4, max_digits=16)


class MaterialRequestLog(models.Model):
    class Meta:
        db_table = "material_request_log"

    REQ_STATUS = models.TextChoices("RequestStatus", " ".join(REQ_STATUS))
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    material = models.ForeignKey(to="Material", on_delete=models.DO_NOTHING)
    quantity = models.DecimalField(decimal_places=4, max_digits=16)
    status = models.CharField(max_length=32, choices=REQ_STATUS.choices, default="PENDING", null=True)
    date_requested = models.DateField(default=date.today, null=False)
