from django.db import models
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    followers_count = models.IntegerField(blank=True, null=True)
    subscriptions_count = models.IntegerField(blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.ImageField(upload_to='uploads/')
    head = models.CharField(max_length=255, blank=True, null=True)


class Followers(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='user_profile')
    follower_id = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='follower_profile')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'follower_id'], name='followers_pk')
        ]


class Posts(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=255)
    likes_count = models.IntegerField()
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    repost_id = models.BooleanField(blank=True, null=True)


class Likes(models.Model):
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['post_id', 'user_id'], name='likes_pk')
        ]


class Notifications(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'post_id'], name='notifications_pk')
        ]


class Comments(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=255)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
