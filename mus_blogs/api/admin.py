from django.contrib import admin
from .models import Profile, Followers, Posts, Likes, Notifications, Comments

admin.site.register(Profile)
admin.site.register(Followers)
admin.site.register(Posts)
admin.site.register(Likes)
admin.site.register(Notifications)
admin.site.register(Comments)
