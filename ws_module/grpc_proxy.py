import concurrent.futures as ft
import proto.backend_pb2_grpc as proto
import requests
import grpc

class gRPCProxyServiece(proto.WsProtoServicer):
    def proxy_request(self, request, context):
        url = f"http://127.0.0.1:5000/{request.path}"
        response = requests.get(url)
        return response
    
def grpc_serve():
    server = grpc.server(ft.ThreadPoolExecutor(max_workers=10))
    serviece = gRPCProxyServiece()
    proto.add_WsProtoServicer_to_server(serviece, server)
    server.add_insecure_port("[::]:5001")
    server.start()
    server.wait_for_termination()

if __name__=="__main__":
    grpc_serve()
