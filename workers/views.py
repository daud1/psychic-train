from rest_framework.viewsets import ModelViewSet
from .serializers import WorkerSerializer, WorkerAttendanceSerializer
from .models import Worker, WorkerAttendance
from rest_framework.pagination import PageNumberPagination


class WorkerViewset(ModelViewSet):
    serializer_class = WorkerSerializer
    queryset = Worker.objects.all()
    pagination_class = PageNumberPagination


class WorkerAttendanceViewset(ModelViewSet):
    serializer_class = WorkerAttendanceSerializer
    queryset = WorkerAttendance.objects.all()
    pagination_class = PageNumberPagination
