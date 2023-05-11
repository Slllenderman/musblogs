from rest_framework import routers
from api import api_views

router = routers.DefaultRouter()
router.register(r'followers', api_views.FollowersViewset)
router.register(r'posts', api_views.PostsViewset)
router.register(r'comments', api_views.CommentsViewset)
router.register(r'likes', api_views.LikesViewset)
router.register(r'users', api_views.UsersViewset)
