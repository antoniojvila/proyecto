from rest_framework import serializers
from .models import User
from apps.signals.models import UUnit
from apps.score.models import Score
from apps.signals.serializers.serializers import UUnitSerializer
from apps.score.serializers.score import ScoreSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'birthday', 'role']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            birthday=validated_data.get('birthday'),
            role=validated_data.get('role', 'alumno'),
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    units = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'email', 'units', 'score', 'level', 'id']

    def get_units(self, obj):
        units = UUnit.objects.filter(user=obj)
        return UUnitSerializer(units, many=True).data

    def get_score(self, obj):
        score = Score.objects.filter(user=obj).order_by('id').last()
        if score:
            return ScoreSerializer(score).data
        return None
    
class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'birthday']



class UserManageSerializer(serializers.ModelSerializer):
    profesor = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profesor', 'birthday']

class ReassignUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['profesor']


class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'birthday']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'username': {'required': False},
            'email': {'required': False},
            'birthday': {'required': False},
        }

    def update(self, instance, validated_data):
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",validated_data)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.birthday = validated_data.get('birthday', instance.birthday)
        instance.save()
        return instance