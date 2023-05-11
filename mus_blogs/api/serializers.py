from rest_framework import serializers
from . import models


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Followers
        fields = '__all__'


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Posts
        fields = '__all__'



class LikesSerializer(serializers.ModelSerializer):
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
