from rest_framework.serializers import ModelSerializer

from .models import Material, MaterialRequestLog, MaterialResupplyLog


class MaterialSerializer(ModelSerializer):
    class Meta:
        model = Material
        fields = "__all__"


class MaterialOutSerializer(ModelSerializer):
    class Meta:
        model = MaterialRequestLog
        fields = "__all__"


class MaterialInSerializer(ModelSerializer):
    class Meta:
        model = MaterialResupplyLog
        fields = "__all__"
