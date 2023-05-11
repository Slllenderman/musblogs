from rest_framework import viewsets, permissions
from . import models
from . import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.db.models import F


class FollowersViewset(viewsets.ModelViewSet):
    queryset = models.Followers.objects.all()
    serializer_class = serializers.FollowersSerializer
    http_method_names = ['get', 'post', 'delete']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return qs.filter(user_id=user_id)
        return qs

    def delete(self, request):
        qs = super().get_queryset()
        user_id = request.data.get('user_id')
        follower_id = request.data.get('follower_id')
        if user_id and follower_id:
            qs.filter(user_id=user_id).filter(follower_id=follower_id).delete()
            return Response(data='deleted successfully', status=200)
        raise ValidationError('Invalid parameters')


class PostsViewset(viewsets.ModelViewSet):
    queryset = models.Posts.objects.all()
    serializer_class = serializers.PostsSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        id = self.request.query_params.get('id')
        if id:
            return qs.filter(id=id)

        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)

        start_date = self.request.query_params.get('start_date')
        if start_date:
            qs = qs.filter(date__gte=start_date)

        end_date = self.request.query_params.get('end_date')
        if end_date:
            qs = qs.filter(date__lte=end_date)

        return qs

    def put(self, request):
        if not request.data.get('content') or not request.data.get('user_id'):
            raise ValidationError('Content or user is upsent')

        post_id = request.data.get('id')
        updated_post = serializers.PostsSerializer(data=request.data)
        qs = super().get_queryset()

        if post_id:
            if updated_post.is_valid():
                qs.filter(id=post_id).update(**updated_post.data)
                return Response(data=updated_post.data, status=201)

        raise ValidationError('Unable to parse data')

    def delete(self, request):
        qs = super().get_queryset()
        post_id = request.GET.get('id')

        if post_id:
            qs.filter(id=post_id).delete()
            return Response(status=200, data='deleted successfully')

        raise ValidationError('invalid id value')

    def create(self, request, *args, **kwargs):
        if not request.data.get('content') or not request.data.get('user_id'):
            raise ValidationError('Content or user is upsent')

        post = serializers.PostsSerializer(data=request.data)

        if post.is_valid():
            post.save()
            return Response(data=post.data, status=201)
        else:
            raise ValidationError('Unable to parse body')


class CommentsViewset(viewsets.ModelViewSet):
    queryset = models.Comments.objects.all()
    serializer_class = serializers.CommentsSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        id = self.request.query_params.get('id')
        if id:
            return qs.filter(id=id)

        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)

        start_date = self.request.query_params.get('start_date')
        if start_date:
            qs = qs.filter(date__gte=start_date)

        end_date = self.request.query_params.get('end_date')
        if end_date:
            qs = qs.filter(date__lte=end_date)

        return qs

    def put(self, request):
        if not request.data.get('content') or not request.data.get('user_id') or not request.data.get('post_id'):
            raise ValidationError('content, user_id or post_id is upsent')

        comment_id = request.data.get('id')
        updated_comment = serializers.CommentsSerializer(data=request.data)
        qs = super().get_queryset()

        if comment_id:
            if updated_comment.is_valid():
                qs.filter(id=comment_id).update(**updated_comment.data)
                return Response(data=updated_comment.data, status=201)

        raise ValidationError('Unable to parse data')

    def delete(self, request):
        qs = super().get_queryset()
        comment_id = request.GET.get('id')

        if comment_id:
            qs.filter(id=comment_id).delete()
            return Response(status=200, data='deleted successfully')

        raise ValidationError('invalid id value')

    def create(self, request, *args, **kwargs):
        if not request.data.get('content') or not request.data.get('user_id') or not request.data.get('post_id'):
            raise ValidationError('content, user_id or post_id is upsent')

        comment = serializers.CommentsSerializer(data=request.data)

        if comment.is_valid():
            comment.save()
            return Response(data=comment.data, status=201)
        else:
            raise ValidationError('unable to parse body')


class LikesViewset(viewsets.ModelViewSet):
    queryset = models.Likes.objects.all()
    serializer_class = serializers.LikesSerializer
    http_method_names = ['get', 'post', 'delete']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)

        post_id = self.request.query_params.get('post_id')
        if post_id:
            qs = qs.filter(post_id=post_id)

        return qs

    def create(self, request, *args, **kwargs):
        if not request.data.get('post_id') or not request.data.get('user_id'):
            raise ValidationError('user_id or post_id is upsent')

        like = serializers.LikesSerializer(data=request.data)

        if like.is_valid():
            like.save()
            models.Posts.objects.filter(id=request.data.get('post_id')).update(likes_count=F('likes_count') + 1)
            return Response(data=like.data, status=201)
        else:
            raise ValidationError('unable to parse body')

    def delete(self, request):
        qs = super().get_queryset()
        post_id = request.GET.get('post_id')
        user_id = request.GET.get('user_id')

        if post_id and user_id:
            qs.filter(post_id=post_id).filter(user_id=user_id).delete()
            models.Posts.objects.filter(id=request.data.get('post_id')).update(likes_count=F('likes_count') - 1)
            return Response(status=200, data='deleted successfully')

        raise ValidationError('invalid id value')


class UsersViewset(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        id = self.request.query_params.get('id')
        if id:
            return qs.filter(id=id)

        username = self.request.query_params.get('username')
        if username:
            qs = qs.filter(username=username)

        firstname = self.request.query_params.get('firstname')
        if firstname:
            qs = qs.filter(first_name=firstname)

        lastname = self.request.query_params.get('lastname')
        if lastname:
            qs = qs.filter(last_name=lastname)

        return qs

    def create(self, request, *args, **kwargs):
        if not request.data.get('username') or not request.data.get('email') or not request.data.get('password'):
            raise ValidationError('username, email or password is upsent')

        user = serializers.ProfileSerializer(data=request.data)

        if user.is_valid():
            user.save()
            return Response(data=user.data, status=201)
        else:
            raise ValidationError('unable to parse body')

    def put(self, request):
        if not request.data.get('username') or not request.data.get('email') or not request.data.get('password'):
            raise ValidationError('username, email or password is upsent')

        user_id = request.data.get('id')
        updated_user = serializers.ProfileSerializer(data=request.data)
        qs = super().get_queryset()

        if user_id:
            if updated_user.is_valid():
                qs.filter(id=user_id).update(**updated_user.data)
                return Response(data=updated_user.data, status=201)

        raise ValidationError('Unable to parse data')

    def delete(self, request):
        qs = super().get_queryset()
        user_id = request.GET.get('id')

        if user_id:
            qs.filter(id=user_id).delete()
            return Response(status=200, data='deleted successfully')

        raise ValidationError('invalid id value')
