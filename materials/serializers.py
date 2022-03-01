from rest_framework.serializers import ModelSerializer
from .models import Material, MaterialInput, MaterialOutput


class MaterialSerializer(ModelSerializer):
    class Meta:
        model = Material
        fields = "__all__"


class MaterialOutputSerializer(ModelSerializer):
    class Meta:
        model = MaterialOutput
        fields = "__all__"


class MaterialInputSerializer(ModelSerializer):
    class Meta:
        model = MaterialInput
        fields = "__all__"
