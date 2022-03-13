from rest_framework.serializers import ModelSerializer, StringRelatedField

from .models import Material, MaterialRequestLog, MaterialResupplyLog


class MaterialSerializer(ModelSerializer):
    class Meta:
        model = Material
        fields = ["id", "name", "units", "unit_price"]


class MaterialOutSerializer(ModelSerializer):
    class Meta:
        model = MaterialRequestLog
        fields = "__all__"


class MaterialOutReadSerializer(ModelSerializer):
    material = StringRelatedField()

    class Meta:
        model = MaterialRequestLog
        fields = ["id", "material", "status", "quantity", "date_requested"]


class MaterialInSerializer(ModelSerializer):
    material = StringRelatedField()

    class Meta:
        model = MaterialResupplyLog
        fields = "__all__"
