from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from apps.signals.permissions import IsProfessor
from .serializers import UserSerializer, CreateUserSerializer, ListUserSerializer
from .serializers import UserEditSerializer, UserManageSerializer, ReassignUserSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
import os
from django.conf import settings
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from apps.signals.models import UUnit, ULesson


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserReportListView(APIView):
    permission_classes = [IsAuthenticated, IsProfessor]

    def get(self, request):
        users = User.objects.filter(role='alumno')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['level'] = self.user.level
        data['diagnostic_completed'] = self.user.diagnostic_completed
        data['role'] = self.user.role
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer




class CreateAlumnoView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer

    def perform_create(self, serializer):
        serializer.save(role='alumno')

class CreateProfesorView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer

    def perform_create(self, serializer):
        serializer.save(role='profesor')

class ListProfessorsView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(role='profesor')

class ListStudentsView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        profesor_id = self.kwargs.get('profesor_id')
        return User.objects.filter(role='alumno', profesor__id=profesor_id)

class ListProfessorsView(generics.ListAPIView):
    serializer_class = ListUserSerializer

    def get_queryset(self):
        return User.objects.filter(role='profesor')

class ListStudentsView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        profesor_id = self.request.user.id
        return User.objects.filter(role='alumno', profesor_id=profesor_id)

class ListStudenswithoutTeachertsView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        profesor_id = self.request.user.id
        return User.objects.filter(role='alumno', profesor__isnull=True)


class AssociateProfesorWithAlumnosView(APIView):
    def post(self, request):
        alumno_ids = request.data.get('alumnos', [])
        profesor_id = request.data.get('profesor', None)
        if not profesor_id:
            return Response({'status': 'error', 'message': 'Profesor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        try:
            profesor = User.objects.get(id=profesor_id, role='profesor')
            print('++++++++++++++++++++++++++++++++=',profesor)
            alumnos = User.objects.filter(id__in=alumno_ids, role='alumno')
            print('++++++++++++++++++++++++++++++++=',alumnos)
            if not alumnos:
                return Response({'status': 'error', 'message': 'No se encontraron alumnos válidos'}, status=status.HTTP_404_NOT_FOUND)

            for alumno in alumnos:
                alumno.profesor = profesor
                alumno.save()

            return Response({'status': 'success', 'message': 'Alumnos asociados con éxito'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'status': 'error', 'message': 'Profesor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        




class UserManageListView(generics.ListAPIView):
    serializer_class = UserManageSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        # Obtener los filtros de los kwargs
        role = self.request.query_params.get('role', 'alumno')
        
        if role:
            queryset = queryset.filter(role=role)

        return queryset

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserManageSerializer

class UserReassignView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ReassignUserSerializer

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        try:
            user.profesor = User.objects.get(id=request.data.get('profesor'))
            user.save()
        except User.DoesNotExist:
            return Response({'status': 'profesor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'status': 'profesor reasignado'}, status=status.HTTP_200_OK)


class UserEditView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer


class FileDownloadView(APIView):
    def get(self, request, format=None):
        user = request.user
        response = generate_report(user.id)
        return response


class FileDownloadAlumnoView(APIView):
    def get(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        response = generate_student_report(user.id)
        return response





def generate_student_report(student_id):
    # Obtén el alumno
    student = get_object_or_404(User, id=student_id)

    # Obtén las unidades del alumno
    units = UUnit.objects.filter(user=student)

    # Configura la respuesta como PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="reporte_{student.username}.pdf"'

    # Crea el objeto canvas
    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter

    # Título del reporte
    p.setFont("Helvetica-Bold", 18)  # Aumenta el tamaño de la fuente
    p.drawString(50, height - 40, f"Reporte de {student.username}")  # Alineado a la izquierda

    # Información del alumno
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 70, f"Nombre: {student.username}")
    p.drawString(50, height - 90, f"Nivel: {student.level}")

    # Encabezados de la tabla de unidades y lecciones
    y = height - 130
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, y, "Unidad")
    p.drawString(200, y, "Lección")
    p.drawString(400, y, "Completada")
    y -= 20

    # Variables para el contenido
    p.setFont("Helvetica", 10)

    for unit in units:
        lessons = ULesson.objects.filter(unit=unit)
        unit_name_displayed = False
        for lesson in lessons:
            if not unit_name_displayed:
                p.drawString(50, y, unit.name)
                unit_name_displayed = True
            p.drawString(200, y, lesson.name)
            p.drawString(400, y, "Sí" if lesson.completed else "No")
            y -= 20

            if y < 50:
                p.showPage()
                y = height - 40
                p.setFont("Helvetica", 10)

        y -= 10  # Espacio entre unidades

    p.save()
    return response


def generate_report(profesor_id):
    # Obtén el profesor
    profesor = get_object_or_404(User, id=profesor_id)

    # Filtra los alumnos del profesor
    alumnos = User.objects.filter(profesor=profesor)

    # Configura la respuesta como PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="reporte.pdf"'

    # Crea el objeto canvas
    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter

    # Título del reporte
    p.setFont("Helvetica-Bold", 18)  # Aumenta el tamaño de la fuente
    p.drawString(50, height - 40, f"Reporte de Alumnos del Profesor {profesor.username}")  # Alineado a la izquierda

    # Encabezados de la tabla
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, height - 70, "Nombre del Alumno")
    p.drawString(200, height - 70, "Nivel")
    p.drawString(300, height - 70, "Unidades Asignadas")
    p.drawString(450, height - 70, "Unidades Completadas")

    # Variables para el contenido
    y = height - 90
    p.setFont("Helvetica", 10)

    for alumno in alumnos:
        unidades_asignadas = UUnit.objects.filter(user=alumno).count()
        unidades_completadas = UUnit.objects.filter(user=alumno, ulesson__completed=True).distinct().count()

        p.drawString(50, y, alumno.username)
        p.drawString(200, y, str(alumno.level))
        p.drawString(300, y, str(unidades_asignadas))
        p.drawString(450, y, str(unidades_completadas))
        y -= 20

        if y < 50:
            p.showPage()
            y = height - 40

    p.save()
    return response