from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models.functions import ExtractYear, ExtractWeek, ExtractMonth
from django.db.models import F, Sum
from paginator import Paginator
from datetime import datetime
from .models import Material, MaterialRequestLog, MaterialResupplyLog, MaterialUnitPrice
from .serializers import (
    MaterialInSerializer,
    MaterialOutSerializer,
    MaterialOutReadSerializer,
    MaterialSerializer,
)


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
    qs = MaterialRequestLog.objects.filter(status="FULFILLED").annotate(
        week=ExtractWeek("date_requested"),
        month=ExtractMonth("date_requested"),
        year=ExtractYear("date_requested"),
    )
    qs_weekly = qs.values("week", "month", "year").annotate(weekly_total=Sum("quantity"))
    qs_monthly = qs.values("year", "month").annotate(monthly_total=Sum("quantity"))
    qs_yearly = qs.values("year").annotate(yearly_total=Sum("quantity"))

    return Response({"weekly": qs_weekly, "monthly": qs_monthly, "yearly": qs_yearly})


@api_view(["GET"])
def get_current_totals(request):
    today = datetime.today()
    year, week, day = today.isocalendar()
    print(year)
    qs = MaterialRequestLog.objects.filter(
        status="FULFILLED",
        date_requested__week=week,
        date_requested__year=year,
    ).annotate(
        week=ExtractWeek("date_requested"),
        month=ExtractMonth("date_requested"),
        year=ExtractYear("date_requested"),
    )
    current_weekly = qs.values("week", "month", "year").annotate(weekly_total=Sum("quantity"))
    current_monthly = qs.values("year", "month").annotate(monthly_total=Sum("quantity"))
    current_yearly = qs.values("year").annotate(yearly_total=Sum("quantity"))
    return Response({"weekly": current_weekly, "monthly": current_monthly, "yearly": current_yearly})
