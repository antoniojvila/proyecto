from django.urls import path
from .views_front import AssignStudentView, ReportView, RegisterUserView, ManageUserView, ManageUserProfesorView

urlpatterns = [
    path('reporte/', ReportView.as_view(), name='reporte'),
    path('alumnos/', AssignStudentView.as_view(), name='alumnos'),
    path('registrar/', RegisterUserView.as_view(), name='register-user'),
    path('manejo/', ManageUserView.as_view(), name='manage-user'),
    path('manejo-profesor/', ManageUserProfesorView.as_view(), name='manage-profesor'),
]