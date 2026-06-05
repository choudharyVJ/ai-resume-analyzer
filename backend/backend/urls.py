from django.contrib import admin  # type: ignore
from django.urls import path, include  # type: ignore
from django.http import JsonResponse # type: ignore
from django.views.decorators.http import require_http_methods # type: ignore
from datetime import datetime, timezone


# =========================
# HEALTH CHECK ROUTE
# =========================

@require_http_methods(["GET", "HEAD"])
def health_check(request):
    """
    Health check endpoint for server monitoring with Uptime Robot.
    Supports both GET and HEAD requests.
    Returns the current status of the AI Resume Analyzer Backend.
    """
    return JsonResponse({
        "status": "healthy",
        "service": "AI Resume Analyzer Backend",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }, status=200)


# =========================
# URL PATTERNS
# =========================

urlpatterns = [

    path(
        'admin/',
        admin.site.urls
    ),

    path(
        'api/resume/',
        include('resume_analyzer.urls')
    ),

    path(
        'health/',
        health_check,
        name='health-check'
    ),

]
