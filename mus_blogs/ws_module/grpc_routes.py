from grpc_actions import WsProtoActions
from datetime import datetime
import concurrent.futures as ft
import proto.backend_pb2_grpc as proto_grpc
import proto.backend_pb2 as proto
import grpc

class gRPCProxyServiece(proto_grpc.WsProtoServicer):
    def addPostEvent(self, request, context):
        return error_shell(self.addpost_handler, request)

    def addpost_handler(self, request):
        print_request("add_post")
        WsProtoActions.addpost(request)
        grpc_response = proto.NULL(msg='response["t"]')
        return grpc_response



def print_request(path):
    print(f'Request {path} in {datetime.now()}')

def error_shell(handler, request):
    try:
        return handler(request)
    except Exception as e:
        print('\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n')
        print('gRPC exception: ')
        print(e)
        print('\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n')

def grpc_serve():
    server = grpc.server(ft.ThreadPoolExecutor(max_workers=10))
    serviece = gRPCProxyServiece()
    proto_grpc.add_WsProtoServicer_to_server(serviece, server)
    server.add_insecure_port("[::]:5001")
    print('\ngrpc server setted up\n')
    return server
