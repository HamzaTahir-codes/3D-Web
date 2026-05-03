from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactCreateView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            ip = request.META.get('REMOTE_ADDR')
            serializer.save(ip_address=ip)
            return Response(
                {
                    "success": True,
                    "message": "Message received. I'll get back to you soon."
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "success": False,
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
