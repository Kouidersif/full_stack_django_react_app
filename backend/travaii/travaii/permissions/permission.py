from rest_framework import permissions


class isAuthenticatedAndJobPublisher(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has same attribute.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have same attribute name.
        return obj.company_published == request.user


class isAuthenticatedAndJobPublisherApplication(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has same attribute.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have same attribute name.
        return obj.job.company_published == request.user.companyprofile


class isUserObjectOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has same attribute.
    """
    def has_object_permission(self, request, view, obj):
        # Instance must have same attribute name.
        return obj.uuid == request.user.uuid


class isUseraCompany(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has same attribute.
    """
    def has_object_permission(self, request, view, obj):
        # Instance must have same attribute name.
        return request.user.is_company



class isApplicationOwnerOrFalse(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has same attribute.
    """
    def has_object_permission(self, request, view, obj):
        SAFE_METHODS = [ "GET" ]
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True

        # Instance must have same attribute name.
        return obj.applicant == request.user.applicantsprofile