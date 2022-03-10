from rest_framework.viewsets import ModelViewSet

from paginator import Paginator

from .models import Material, MaterialRequestLog, MaterialResupplyLog, MaterialUnitPrice
from .serializers import MaterialInSerializer, MaterialOutSerializer, MaterialSerializer


class MaterialViewset(ModelViewSet):
    queryset = Material.objects.all()
    pagination_class = Paginator
    serializer_class = MaterialSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        unit_px = self.request.data.get("unit_price", None)
        if unit_px is not None:
            MaterialUnitPrice.objects.create(material=instance, amount_ugx=int(unit_px))


class MaterialInputViewset(ModelViewSet):
    queryset = MaterialResupplyLog.objects.all()
    pagination_class = Paginator
    serializer_class = MaterialInSerializer


class MaterialOutputViewset(ModelViewSet):
    queryset = MaterialRequestLog.objects.all()
    pagination_class = Paginator
    serializer_class = MaterialOutSerializer
