from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class NULL(_message.Message):
    __slots__ = ["msg"]
    MSG_FIELD_NUMBER: _ClassVar[int]
    msg: str
    def __init__(self, msg: _Optional[str] = ...) -> None: ...

class NewPost(_message.Message):
    __slots__ = ["followers", "post"]
    FOLLOWERS_FIELD_NUMBER: _ClassVar[int]
    POST_FIELD_NUMBER: _ClassVar[int]
    followers: Users
    post: Post
    def __init__(self, followers: _Optional[_Union[Users, _Mapping]] = ..., post: _Optional[_Union[Post, _Mapping]] = ...) -> None: ...

class Post(_message.Message):
    __slots__ = ["content", "date", "id", "likes", "username"]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    DATE_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    LIKES_FIELD_NUMBER: _ClassVar[int]
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    content: str
    date: str
    id: int
    likes: int
    username: str
    def __init__(self, id: _Optional[int] = ..., date: _Optional[str] = ..., content: _Optional[str] = ..., likes: _Optional[int] = ..., username: _Optional[str] = ...) -> None: ...

class PostLike(_message.Message):
    __slots__ = ["likes", "post_id"]
    LIKES_FIELD_NUMBER: _ClassVar[int]
    POST_ID_FIELD_NUMBER: _ClassVar[int]
    likes: int
    post_id: int
    def __init__(self, post_id: _Optional[int] = ..., likes: _Optional[int] = ...) -> None: ...

class Users(_message.Message):
    __slots__ = ["users"]
    USERS_FIELD_NUMBER: _ClassVar[int]
    users: _containers.RepeatedScalarFieldContainer[int]
    def __init__(self, users: _Optional[_Iterable[int]] = ...) -> None: ...
