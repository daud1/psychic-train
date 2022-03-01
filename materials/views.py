from rest_framework.viewsets import ModelViewSet
from .models import Material, MaterialInput, MaterialOutput
from .serializers import (
    MaterialSerializer,
    MaterialInputSerializer,
    MaterialOutputSerializer,
)
from rest_framework.pagination import PageNumberPagination


class MaterialViewset(ModelViewSet):
    queryset = Material.objects.all()
    pagination_class = PageNumberPagination
    serializer_class = MaterialSerializer


class MaterialInputViewset(ModelViewSet):
    queryset = MaterialInput.objects.all()
    pagination_class = PageNumberPagination
    serializer_class = MaterialInputSerializer


class MaterialOutputViewset(ModelViewSet):
    queryset = MaterialOutput.objects.all()
    pagination_class = PageNumberPagination
    serializer_class = MaterialOutputSerializer
