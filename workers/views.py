from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from paginator import Paginator
from datetime import date

from .models import Worker, WorkerAttendanceLog
from .serializers import WorkerAttendanceSerializer, WorkerAttendanceReadSerializer, WorkerSerializer


class WorkerViewset(ModelViewSet):
    serializer_class = WorkerSerializer
    queryset = Worker.objects.all()
    pagination_class = Paginator


class WorkerAttendanceViewset(ModelViewSet):
    serializer_class = WorkerAttendanceSerializer
    queryset = WorkerAttendanceLog.objects.all()
    pagination_class = Paginator

    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return WorkerAttendanceReadSerializer
        return super().get_serializer_class()


@api_view(["GET"])
def get_last_log(request, worker_id):
    last_log = WorkerAttendanceLog.objects.filter(worker=worker_id, date=date.today()).first()
    serializer = WorkerAttendanceReadSerializer(instance=last_log)
    return Response(serializer.data)
