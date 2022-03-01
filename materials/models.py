from django.db import models
import uuid

REQ_STATUS = ["PENDING", "DENIED", "FULFILLED"]


class Material(models.Model):
    class Meta:
        db_table = 'material'
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    name = models.CharField(max_length=128, null=False, blank=False)
    units = models.CharField(max_length=128)

    def __str__(self):
        return f"{(self.id)[:6]} {self.name}"


class MaterialUnitPrice(models.Model):
    class Meta:
        db_table = 'material_unit_price'
    material = models.ForeignKey(to="Material", on_delete=models.CASCADE)
    unit_Px_ugx = models.PositiveIntegerField()


class MaterialResupplyLog(models.Model):
    class Meta:
        db_table = 'material_resupply_log'
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    material = models.ForeignKey(to="Material", on_delete=models.DO_NOTHING)
    quantity = models.DecimalField(decimal_places=4, max_digits=16)


class MaterialRequestLog(models.Model):
    class Meta:
        db_table = 'material_request_log'
    REQ_STATUS = models.TextChoices("RequestStatus", " ".join(REQ_STATUS))
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    material = models.ForeignKey(to="Material", on_delete=models.DO_NOTHING)
    quantity = models.DecimalField(decimal_places=4, max_digits=16)
    status = models.CharField(max_length=32, choices=REQ_STATUS.choices, default=None, null=True)
