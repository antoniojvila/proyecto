from django.views.generic import TemplateView

class ReportView(TemplateView):
    template_name = "reporte.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['alumno_id'] = self.request.user.id
        return context


class AssignStudentView(TemplateView):
    template_name = "asignar_alumnos.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class RegisterUserView(TemplateView):
    template_name = "register.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class ManageUserView(TemplateView):
    template_name = "manage_user.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class ManageUserProfesorView(TemplateView):
    template_name = "manage_user_profesor.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context