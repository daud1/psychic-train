from datetime import datetime

from django.db.models import IntegerField, Sum
from django.db.models.functions import (Cast, ExtractMonth, ExtractWeek,
                                        ExtractYear)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from paginator import Paginator

from .models import (Material, MaterialRequestLog, MaterialResupplyLog,
                     MaterialUnitPrice)
from .serializers import (MaterialInSerializer, MaterialOutReadSerializer,
                          MaterialOutSerializer, MaterialSerializer)


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

    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return MaterialOutReadSerializer
        return super().get_serializer_class()


@api_view(["GET"])
def get_periodic_totals(request):
    today = datetime.today()
    year, week, day = today.isocalendar()
    base_qs = MaterialRequestLog.objects.filter(status="FULFILLED").annotate(
        week=ExtractWeek("date_requested"),
        month=ExtractMonth("date_requested"),
        year=ExtractYear("date_requested"),
    )
    qs_weekly = base_qs.values("year", "week").annotate(
        total=Cast(Sum("quantity"), output_field=IntegerField())
    )
    current_week_total = base_qs.filter(date_requested__week=week).aggregate(
        total=Cast(Sum("quantity"), output_field=IntegerField())
    )
    qs_monthly = base_qs.values("year", "month").annotate(
        total=Cast(Sum("quantity"), output_field=IntegerField())
    )
    current_month_total = base_qs.filter(date_requested__month=today.month).aggregate(
        total=Cast(Sum("quantity"), output_field=IntegerField())
    )
    qs_yearly = base_qs.values("year").annotate(total=Cast(Sum("quantity"), output_field=IntegerField()))
    current_year_total = base_qs.filter(date_requested__year=year).aggregate(
        total=Cast(Sum("quantity"), output_field=IntegerField())
    )

    return Response(
        {
            "weekly": qs_weekly,
            "monthly": qs_monthly,
            "yearly": qs_yearly,
            "current": {"week": current_week_total, "month": current_month_total, "year": current_year_total},
        }
    )
