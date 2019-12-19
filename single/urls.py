from django.urls import path

from .views import index, getdata, base_layout, manifest, putdata

urlpatterns = [
    path('getdata', getdata),
    path('base_layout', base_layout),
    path('manifest.json', manifest),
    path('putdata', putdata),
    path('', index),

]
