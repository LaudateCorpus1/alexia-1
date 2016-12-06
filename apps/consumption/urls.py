from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^products/$', views.ConsumptionProductListView.as_view(), name='consumptionproduct_list'),
    url(r'^products/new/$', views.ConsumptionProductCreateView.as_view(), name='consumptionproduct_create'),
    url(r'^products/new/weight/$', views.WeightConsumptionProductCreateView.as_view(),
        name='weightconsumptionproduct_create'),
    url(r'^products/(?P<pk>\d+)/edit/$', views.ConsumptionProductUpdateView.as_view(),
        name='consumptionproduct_update'),
    url(r'^products/(?P<pk>\d+)/edit/weight/$', views.WeightConsumptionProductUpdateView.as_view(),
        name='weightconsumptionproduct_update'),
]
