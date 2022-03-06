from rest_framework.serializers import ModelSerializer, StringRelatedField

from .models import Material, MaterialRequestLog, MaterialResupplyLog


class MaterialSerializer(ModelSerializer):
    class Meta:
        model = Material
        fields = "__all__"


class MaterialOutSerializer(ModelSerializer):
    material = StringRelatedField()

    class Meta:
        model = MaterialRequestLog
        fields = ["id", "material", "status", "quantity"]


class MaterialInSerializer(ModelSerializer):
    material = StringRelatedField()

    class Meta:
        model = MaterialResupplyLog
        fields = "__all__"
