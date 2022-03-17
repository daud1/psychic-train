from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import (
    MaterialInputViewset,
    MaterialOutputViewset,
    MaterialViewset,
    get_periodic_totals,
    get_current_totals,
)

router = SimpleRouter()
router.register("materials", MaterialViewset)
router.register("resupply_logs", MaterialInputViewset)
router.register("requests", MaterialOutputViewset)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("api/v1/totals/", get_periodic_totals, name="periodic-totals"),
    path("api/v1/totals/current/", get_current_totals, name="current-totals"),
]
