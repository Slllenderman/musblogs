from rest_framework import serializers
from . import models
from django.contrib.auth.hashers import make_password


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'


class ShortProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ('id', 'first_name', 'last_name', 'username', 'avatar',)


class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ('id', 'first_name', 'last_name', 'phone', 'username', 'address', 'avatar', 'head', 'email',
                  'birthday', 'followers_count', 'subscriptions_count', 'date_joined', 'description',)
        read_only_fields = ['id', 'password']


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Followers
        fields = '__all__'


class FullFollowersSerializer(serializers.ModelSerializer):
    user_id = ShortProfileSerializer(read_only=True)
    follower_id = ShortProfileSerializer(read_only=True)

    class Meta:
        model = models.Followers
        fields = '__all__'


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Posts
        fields = '__all__'


class FullPostSerializer(serializers.ModelSerializer):
    user_id = ShortProfileSerializer(read_only=True)

    class Meta:
        model = models.Posts
        fields = '__all__'


class FullCommentSerializer(serializers.ModelSerializer):
    user_id = ShortProfileSerializer(read_only=True)

    class Meta:
        model = models.Comments
        fields = '__all__'


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Likes
        fields = '__all__'


class FullLikesSerializer(serializers.ModelSerializer):
    post_id = FullPostSerializer(read_only=True)

    class Meta:
        model = models.Likes
        fields = '__all__'


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notifications
        fields = '__all__'


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comments
        fields = '__all__'
