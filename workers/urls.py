from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import WorkerAttendanceViewset, WorkerViewset, get_last_log

router = SimpleRouter()
router.register("workers", WorkerViewset)
router.register("attendance", WorkerAttendanceViewset)

urlpatterns = [
    path("api/v1/attendance/<str:worker_id>/", get_last_log, name="last-time-log"),
    path("api/v1/", include(router.urls)),
]
