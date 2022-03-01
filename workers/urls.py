from django.urls import include, path
from rest_framework.routers import SimpleRouter
from .views import WorkerAttendanceViewset, WorkerViewset

router = SimpleRouter()
router.register("workers", WorkerViewset)
router.register("attendance", WorkerAttendanceViewset)

urlpatterns = [
    path("api/v1/", include(router.urls)),
]
