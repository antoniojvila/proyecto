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