from django.db.models import Q
from auth_app.models import Users

def getValidUsers():
    query = Q(deleted_at__isnull=True)
    users = Users.objects.filter(query).order_by('-created_at')[:100]
    return users
