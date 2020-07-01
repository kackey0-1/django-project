from accounts.models import CustomUser
from django.http import Http404

def getUser(user_id):
    user = CustomUser.filter(Q(id=user_id) & Q(deleted_at=None)).first()
    if not user:
        raise Http404("User Id={} Not Found".format(user_id))
    return user
