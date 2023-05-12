import concurrent.futures as ft
import proto.backend_pb2_grpc as proto_grpc
import proto.backend_pb2 as proto
import requests
import grpc

class gRPCProxyServiece(proto_grpc.WsProtoServicer):
    def proxy_request(self, request, context):
        url = f"http://127.0.0.1:5000/{request.path}"
        requests.get(url)
        response = proto.NULL()
        response.MergeFrom("All right....")
        return response
    
def grpc_serve():
    server = grpc.server(ft.ThreadPoolExecutor(max_workers=10))
    serviece = gRPCProxyServiece()
    proto_grpc.add_WsProtoServicer_to_server(serviece, server)
    server.add_insecure_port("[::]:5001")
    server.start()
    server.wait_for_termination()

