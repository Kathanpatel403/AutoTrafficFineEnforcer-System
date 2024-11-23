# middleware.py


from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin

class CustomHeaderMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.method == 'OPTIONS':
            response = HttpResponse('')
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            return response

        if request.path.startswith('/mongodb/'):
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response