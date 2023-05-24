from rest_framework import routers
from api import api_views

router = routers.DefaultRouter()
router.register(r'followers', api_views.FollowersViewset)
router.register(r'full_followers', api_views.FullFollowersViewset)
router.register(r'posts', api_views.PostsViewset)
router.register(r'comments', api_views.CommentsViewset)
router.register(r'likes', api_views.LikesViewset)
router.register(r'full_likes', api_views.FullLikesViewset)
router.register(r'users', api_views.UsersViewset)
router.register(r'notifications', api_views.NotificationsViewset)
router.register(r'full_posts', api_views.FullPostViewSet)
router.register(r'full_comments', api_views.FullCommentsViewset)
router.register(r'edit_users', api_views.EditUsersViewset)
router.register(r'short_users', api_views.ShortUsersViewset)
