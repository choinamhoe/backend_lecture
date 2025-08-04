
# myapp/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# 기본 엔드포인트 (GET)
def home(request):
    return JsonResponse(
        {"message": "Hello, Django!"})

# GET 요청으로 데이터 제공
def get_data(request):
    return JsonResponse(
        {"message": "Hello, Django!", "status": "success"})

# URL 매개변수 사용 (GET)
def hello(request, name):
    return JsonResponse(
        {"message": f"Hello, {name}!"})

# POST 요청 처리 (데이터 받기)
@csrf_exempt  # CSRF 인증을 제외하기 위해
def handle_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        return JsonResponse({"received": data})

# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/data', views.get_data, name='get_data'),
    path('hello/<str:name>/', views.hello, name='hello'),
    path('api/post', 
         views.handle_post, name='handle_post'),
]

# myproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),  # myapp의 URL 설정 포함
]
