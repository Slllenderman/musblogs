from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class NULL(_message.Message):
    __slots__ = []
    def __init__(self) -> None: ...

class NewPostAction(_message.Message):
    __slots__ = ["post", "users"]
    POST_FIELD_NUMBER: _ClassVar[int]
    USERS_FIELD_NUMBER: _ClassVar[int]
    post: Post
    users: Users
    def __init__(self, users: _Optional[_Union[Users, _Mapping]] = ..., post: _Optional[_Union[Post, _Mapping]] = ...) -> None: ...

class Post(_message.Message):
    __slots__ = ["post_content", "post_id"]
    POST_CONTENT_FIELD_NUMBER: _ClassVar[int]
    POST_ID_FIELD_NUMBER: _ClassVar[int]
    post_content: str
    post_id: int
    def __init__(self, post_id: _Optional[int] = ..., post_content: _Optional[str] = ...) -> None: ...

class PostLike(_message.Message):
    __slots__ = ["likes", "post_id"]
    LIKES_FIELD_NUMBER: _ClassVar[int]
    POST_ID_FIELD_NUMBER: _ClassVar[int]
    likes: int
    post_id: int
    def __init__(self, post_id: _Optional[int] = ..., likes: _Optional[int] = ...) -> None: ...

class Users(_message.Message):
    __slots__ = ["username"]
    USERNAME_FIELD_NUMBER: _ClassVar[int]
    username: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, username: _Optional[_Iterable[str]] = ...) -> None: ...
