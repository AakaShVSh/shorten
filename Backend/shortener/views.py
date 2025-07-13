from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ShortURL
from .serializers import ShortURLSerializer
import random, string

# Generate random short code
def generate_short_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

class ShortURLCreate(APIView):
    def post(self, request):
        original_url = request.data.get("original_url")
        short_code = generate_short_code()

        # Save to DB
        short_url = ShortURL.objects.create(original_url=original_url, short_code=short_code)

        # Serialize and return
        serializer = ShortURLSerializer(short_url)
        return Response(serializer.data, status=status.HTTP_201_CREATED)




from django.shortcuts import get_object_or_404, redirect

def redirect_to_original(request, short_code):
    short_url = get_object_or_404(ShortURL, short_code=short_code)
    short_url.click_count += 1  
    short_url.save()
    return redirect(short_url.original_url)


from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def analytics_view(request, short_code):
    from .models import ShortURL
    from django.shortcuts import get_object_or_404

    short_url = get_object_or_404(ShortURL, short_code=short_code)
    return Response({
        "click_count": short_url.click_count,
    })


def home(request):
    return HttpResponse("🎯 Welcome to the URL Shortener API! Use /create/ to shorten URLs.")
