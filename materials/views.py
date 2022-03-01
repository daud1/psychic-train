from rest_framework.viewsets import ModelViewSet
from .models import Material, MaterialResupplyLog, MaterialRequestLog
from .serializers import (
    MaterialSerializer,
    MaterialInSerializer,
    MaterialOutSerializer,
)
from rest_framework.pagination import PageNumberPagination


class MaterialViewset(ModelViewSet):
    queryset = Material.objects.all()
    pagination_class = PageNumberPagination
    serializer_class = MaterialSerializer


class MaterialInputViewset(ModelViewSet):
    queryset = MaterialResupplyLog.objects.all()
    pagination_class = PageNumberPagination
    serializer_class = MaterialInSerializer


class MaterialOutputViewset(ModelViewSet):
    queryset = MaterialRequestLog.objects.all()
    pagination_class = PageNumberPagination
    serializer_class = MaterialOutSerializer
