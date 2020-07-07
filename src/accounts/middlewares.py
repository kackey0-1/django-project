from django.core.exceptions import PermissionDenied
from django.urls import reverse
from app.enums.permissions import PermissionGroups
import logging

logger = logging.getLogger(__name__)


class SitePermissionMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # リクエストへの前処理をここに記述
        response = self.get_response(request)
        # レスポンスへの後処理をここに記述
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        """ビューを呼び出す直前に呼び出される処理"""
        has_site_permission = False
        if request.user.is_superuser or request.user.is_staff:
            has_site_permission = True

        # Adminユーザー
        admin_index = reverse('admin:index')
        # 権限を持っていないユーザーが「/admin/」配下にアクセスしたら 403エラー
        if request.path.startswith(admin_index):
            if not has_site_permission:
                raise PermissionDenied

        if request.user.is_authenticated:
            _permission_check(request)
        request.user.has_site_permission = has_site_permission


def _permission_check(request):
    """
        NG list of ClientUser
        projects: apply cancel approve
        engineers: create edit
    """
    if request.user.has_group(PermissionGroups.ClientUser.value):
        paths = ["/projects/apply", "/projects/cancel", "/projects/approve",
                 "/engineers/create", "/engineers/edit"]
        for path in paths:
            if request.path.startswith(path):
                raise PermissionDenied
    """
        NG list of PartnerManager
        projects: apply cancel create edit
    """
    if request.user.has_group(PermissionGroups.PartnerManager.value):
        paths = ["/projects/apply", "/projects/cancel", "/projects/create", "/projects/edit"]
        for path in paths:
            if request.path.startswith(path):
                raise PermissionDenied

    """
        NG list of PartnerEngineer
        projects: apply cancel create edit
        engineers: create delete
    """
    if request.user.has_group(PermissionGroups.PartnerEngineer.value):
        paths = ["/projects/apply", "/projects/cancel", "/projects/create", "/projects/edit",
                 "/engineers/create", "/engineers/delete"]
        for path in paths:
            if request.path.startswith(path):
                raise PermissionDenied
