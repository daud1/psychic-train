from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from .models import Worker, WorkerAttendanceLog
from .serializers import WorkerAttendanceSerializer, WorkerSerializer


class WorkerViewset(ModelViewSet):
    serializer_class = WorkerSerializer
    queryset = Worker.objects.all()
    pagination_class = PageNumberPagination


class WorkerAttendanceViewset(ModelViewSet):
    serializer_class = WorkerAttendanceSerializer
    queryset = WorkerAttendanceLog.objects.all()
    pagination_class = PageNumberPagination
