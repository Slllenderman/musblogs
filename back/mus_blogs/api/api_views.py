from rest_framework import viewsets, permissions, status
from . import models
from . import serializers
from rest_framework.response import Response
from django.db.models import F
from django.contrib.auth.hashers import make_password


class FollowersViewset(viewsets.ModelViewSet):
    queryset = models.Followers.objects.all()
    serializer_class = serializers.FollowersSerializer
    http_method_names = ['get', 'post', 'delete']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)
        follower_id = self.request.query_params.get('follower_id')
        if follower_id:
            qs = qs.filter(follower_id=follower_id)
        username = self.request.query_params.get('username')
        if username:
            qs = qs.filter(user_id__username=username)
        f_username = self.request.query_params.get('f_username')
        if f_username:
            qs = qs.filter(follower_id__username=f_username)
        return qs

    def create(self, request, *args, **kwargs):
        if not request.data.get('user_id') or not request.data.get('follower_id'):
            return Response(status=status.HTTP_400_BAD_REQUEST, data='user_id or follower_id is absent')

        user_id = request.data.get('user_id')
        follower_id = request.data.get('follower_id')
        follower = serializers.FollowersSerializer(data=request.data)

        if models.Followers.objects.filter(user_id=user_id).filter(follower_id=follower_id).count() != 0:
            return Response(status=status.HTTP_409_CONFLICT, data='Follower already exist')

        if follower.is_valid():
            follower.save()
            models.Profile.objects.filter(id=user_id).update(
                followers_count=F('followers_count') + 1)
            models.Profile.objects.filter(id=follower_id).update(
                subscriptions_count=F('subscriptions_count') + 1)

            return Response(data=follower.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')

    def delete(self, request):
        qs = super().get_queryset()
        user_id = request.data.get('user_id')
        follower_id = request.data.get('follower_id')

        if user_id and follower_id:
            qs_item = qs.filter(user_id=user_id).filter(follower_id=follower_id)

            if qs_item.count() != 1:
                return Response(status=status.HTTP_204_NO_CONTENT)

            qs_item.delete()
            models.Profile.objects.filter(id=user_id).update(
                followers_count=F('followers_count') - 1)
            models.Profile.objects.filter(id=follower_id).update(
                subscriptions_count=F('subscriptions_count') - 1)
            return Response(data='deleted successfully', status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST, data='invalid parameters')


class FullFollowersViewset(viewsets.ModelViewSet):
    queryset = models.Followers.objects.all()
    serializer_class = serializers.FullFollowersSerializer
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)
        follower_id = self.request.query_params.get('follower_id')
        if follower_id:
            qs = qs.filter(follower_id=follower_id)
        username = self.request.query_params.get('username')
        if username:
            qs = qs.filter(user_id__username=username)
        f_username = self.request.query_params.get('f_username')
        if f_username:
            qs = qs.filter(follower_id__username=f_username)
        return qs


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
            return Response(status=status.HTTP_400_BAD_REQUEST, data='content or user is absent')

        post_id = request.data.get('id')
        updated_post = serializers.PostsSerializer(data=request.data)
        qs = super().get_queryset()

        if post_id:
            if updated_post.is_valid():
                qs.filter(id=post_id).update(**updated_post.data)
                return Response(data=updated_post.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')

    def delete(self, request):
        qs = super().get_queryset()
        post_id = request.GET.get('id')

        if post_id:
            qs_item = qs.filter(id=post_id)

            if qs_item.count() != 1:
                return Response(status=status.HTTP_204_NO_CONTENT)

            qs_item.delete()
            return Response(status=status.HTTP_200_OK, data='deleted successfully')

        return Response(status=status.HTTP_400_BAD_REQUEST, data='invalid id value')

    def create(self, request, *args, **kwargs):
        if not request.data.get('content') or not request.data.get('user_id'):
            return Response(status=status.HTTP_400_BAD_REQUEST, data='content or user is absent')

        post = serializers.PostsSerializer(data=request.data)

        if post.is_valid():
            post.save()
            return Response(data=post.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')


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

        post_id = self.request.query_params.get('post_id')
        if post_id:
            qs = qs.filter(post_id=post_id)

        return qs

    def put(self, request):
        if not request.data.get('content') or not request.data.get('user_id') or not request.data.get('post_id'):
            return Response(status=status.HTTP_400_BAD_REQUEST, data='content, user_id or post_id is absent')

        comment_id = request.data.get('id')
        updated_comment = serializers.CommentsSerializer(data=request.data)
        qs = super().get_queryset()

        if comment_id:
            if updated_comment.is_valid():
                qs.filter(id=comment_id).update(**updated_comment.data)
                return Response(data=updated_comment.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')

    def delete(self, request):
        qs = super().get_queryset()
        comment_id = request.GET.get('id')

        if comment_id:
            qs.filter(id=comment_id).delete()
            return Response(status=status.HTTP_200_OK, data='deleted successfully')

        return Response(status=status.HTTP_400_BAD_REQUEST, data='invalid id value')

    def create(self, request, *args, **kwargs):
        if not request.data.get('content') or not request.data.get('user_id') or not request.data.get('post_id'):
            return Response(status=status.HTTP_400_BAD_REQUEST, data='content, user_id or post_id is absent')

        comment = serializers.CommentsSerializer(data=request.data)

        if comment.is_valid():
            comment.save()
            return Response(data=comment.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')


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
            return Response(status=status.HTTP_400_BAD_REQUEST, data='user_id or post_id is absent')

        post_id = request.data.get('post_id')
        user_id = request.data.get('user_id')
        like = serializers.LikesSerializer(data=request.data)

        if models.Likes.objects.filter(user_id=user_id).filter(post_id=post_id).count() != 0:
            return Response(status=status.HTTP_409_CONFLICT, data='Like from this user already exist')

        if like.is_valid():
            like.save()
            models.Posts.objects.filter(id=post_id).update(likes_count=F('likes_count') + 1)
            return Response(data=like.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')

    def delete(self, request):
        qs = super().get_queryset()
        post_id = request.GET.get('post_id')
        user_id = request.GET.get('user_id')

        if post_id and user_id:
            qs_item = qs.filter(post_id=post_id).filter(user_id=user_id)

            if qs_item.count() != 1:
                return Response(status=status.HTTP_204_NO_CONTENT)

            qs_item.delete()
            models.Posts.objects.filter(id=request.data.get('post_id')).update(likes_count=F('likes_count') - 1)
            return Response(status=status.HTTP_200_OK, data='deleted successfully')

        return Response(status=status.HTTP_400_BAD_REQUEST, data='invalid id value')


class FullLikesViewset(viewsets.ModelViewSet):
    queryset = models.Likes.objects.all()
    serializer_class = serializers.FullLikesSerializer
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)

        username = self.request.query_params.get('username')
        if username:
            qs = qs.filter(user_id__username=username)

        post_id = self.request.query_params.get('post_id')
        if post_id:
            qs = qs.filter(post_id=post_id)

        return qs


class UsersViewset(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
            return Response(status=status.HTTP_400_BAD_REQUEST, data='username, email or password is absent')

        user = serializers.ProfileSerializer(data=request.data)

        if user.is_valid():
            if models.Profile.objects.filter(email=request.data.get('email')).count() != 0:
                return Response(status=status.HTTP_409_CONFLICT, data='user with this email already exist')
            user.validated_data['password'] = make_password(user.validated_data['password'])
            user.save()
            return Response(data=user.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_409_CONFLICT, data='user with this username already exists')

    def put(self, request):
        print('Edit user put')
        if not request.data.get('username') or not request.data.get('email') or not request.data.get('password'):
            return Response(status=status.HTTP_400_BAD_REQUEST, data='username, email or password is absent')

        user_id = request.data.get('id')
        updated_user = serializers.ProfileSerializer(data=request.data)
        qs = super().get_queryset()

        if user_id:
            if updated_user.is_valid():
                qs.filter(id=user_id).update(**updated_user.data)
                return Response(data=updated_user.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')

    def delete(self, request):
        qs = super().get_queryset()
        user_id = request.GET.get('id')

        if user_id:
            qs_item = qs.filter(id=user_id)

            if qs_item.count() != 1:
                return Response(status=status.HTTP_204_NO_CONTENT)

            qs_item.delete()
            return Response(status=status.HTTP_200_OK, data='deleted successfully')

        return Response(status=status.HTTP_400_BAD_REQUEST, data='invalid id value')


class NotificationsViewset(viewsets.ModelViewSet):
    queryset = models.Notifications.objects.all()
    serializer_class = serializers.NotificationsSerializer
    http_method_names = ['get', 'delete']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        user_id = self.request.query_params.get('user_id')
        if user_id:
            return qs.filter(user_id=user_id)

    def delete(self, request):
        qs = super().get_queryset()
        user_id = request.GET.get('user_id')

        if user_id:
            qs_items = qs.filter(user_id=user_id)

            if qs_items.count() == 0:
                return Response(status=status.HTTP_204_NO_CONTENT)

            qs_items.delete()
            return Response(status=status.HTTP_200_OK, data='deleted successfully')

        return Response(status=status.HTTP_400_BAD_REQUEST, data='invalid id value')


class FullPostViewSet(viewsets.ModelViewSet):
    queryset = models.Posts.objects.all()
    serializer_class = serializers.FullPostSerializer
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        id = self.request.query_params.get('id')
        if id:
            return qs.filter(id=id)

        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)

        username = self.request.query_params.get('username')
        if username:
            qs = qs.filter(user_id__username=username)

        start_date = self.request.query_params.get('start_date')
        if start_date:
            qs = qs.filter(date__gte=start_date)

        end_date = self.request.query_params.get('end_date')
        if end_date:
            qs = qs.filter(date__lte=end_date)

        return qs


class FullCommentsViewset(viewsets.ModelViewSet):
    queryset = models.Comments.objects.all()
    serializer_class = serializers.FullCommentSerializer
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()

        id = self.request.query_params.get('id')
        if id:
            return qs.filter(id=id)

        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id=user_id)

        username = self.request.query_params.get('username')
        if username:
            qs = qs.filter(user_id__username=username)

        start_date = self.request.query_params.get('start_date')
        if start_date:
            qs = qs.filter(date__gte=start_date)

        end_date = self.request.query_params.get('end_date')
        if end_date:
            qs = qs.filter(date__lte=end_date)

        post_id = self.request.query_params.get('post_id')
        if post_id:
            qs = qs.filter(post_id=post_id)

        return qs


class EditUsersViewset(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.EditProfileSerializer
    http_method_names = ['get', 'put']
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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

    def put(self, request):
        print('Edit user put')
        if not request.data.get('username') or not request.data.get('email'):
            return Response(status=status.HTTP_400_BAD_REQUEST, data='username, email is absent')
        user_id = request.data.get('id')
        updated_user = serializers.EditProfileSerializer(data=request.data, partial=True)
        qs = super().get_queryset()

        if user_id:
            if updated_user.is_valid():
                qs.filter(id=user_id).update(**updated_user.data)
                print(updated_user.data)
                return Response(data=updated_user.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST, data='unable to parse the body')


class ShortUsersViewset(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ShortProfileSerializer
    http_method_names = ['get']
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
