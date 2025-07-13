from django.urls import path
from .views import ShortURLCreate, redirect_to_original, home
from .views import analytics_view

urlpatterns = [
    path('', home, name='home'), 
    path('api/shorten/', ShortURLCreate.as_view(), name='shorten'),
    path('<str:short_code>/', redirect_to_original, name='redirect'),
    path('api/analytics/<str:short_code>/', analytics_view, name='analytics'),
]
