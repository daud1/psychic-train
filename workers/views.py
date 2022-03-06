from rest_framework.viewsets import ModelViewSet

from paginator import Paginator

from .models import Worker, WorkerAttendanceLog
from .serializers import WorkerAttendanceSerializer, WorkerSerializer


class WorkerViewset(ModelViewSet):
    serializer_class = WorkerSerializer
    queryset = Worker.objects.all()
    pagination_class = Paginator


class WorkerAttendanceViewset(ModelViewSet):
    serializer_class = WorkerAttendanceSerializer
    queryset = WorkerAttendanceLog.objects.all()
    pagination_class = Paginator
