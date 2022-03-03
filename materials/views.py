from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from .models import Material, MaterialRequestLog, MaterialResupplyLog
from .serializers import (MaterialInSerializer, MaterialOutSerializer,
                          MaterialSerializer)


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
