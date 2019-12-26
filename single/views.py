import datetime
import json

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render, HttpResponse

from .models import *


def index(request):
    template = 'index.html'
    return render(request, template, {})


def base_layout(request):
    template = 'base.html'
    return render(request, template)


def getdata(request):
    user = User.objects.get(pk=1)
    today = datetime.datetime.now().date()
    tomorrow = today + datetime.timedelta(days=1)
    days_before = []
    today_start = datetime.datetime.combine(today, datetime.time())
    today_end = datetime.datetime.combine(tomorrow, datetime.time())
    for i in range(5):
        days_before.append(today - datetime.timedelta(days=i + 1))
    exercise_data = Exercise.objects.all().filter(start_time__gte=today_start, start_time__lte=today_end)
    prev_data = []
    for date in days_before:
        temp_today = date
        temp_tomorrow = date + datetime.timedelta(days=1)
        today_start = datetime.datetime.combine(today, datetime.time())
        today_end = datetime.datetime.combine(tomorrow, datetime.time())
        prev_data.append(Exercise.objects.all().filter(start_time__gte=today_start, start_time__lte=today_end)[0])
    print(exercise_data)
    user_data = {
        'current_walk': exercise_data[0].step,
        'prev_day': [
            temp_exercise.step for temp_exercise in prev_data
        ]
    }
    # jsondata = serializers.serialize('json',results)
    # print(results.values('title', 'body'))
    # jsondata=json.dumps(results)
    return JsonResponse(user_data)


def putdata(request):
    if request.method == 'POST':
        # print(request.body.decode('utf8'))
        receive = json.loads(request.body.decode('utf8'))
        # print(receive)
        today = datetime.datetime.now().date()
        tomorrow = today + datetime.timedelta(days=1)
        today_start = datetime.datetime.combine(today, datetime.time())
        today_end = datetime.datetime.combine(tomorrow, datetime.time())
        exercise_data = Exercise.objects.all().filter(start_time__gte=today_start, start_time__lte=today_end)
        if len(exercise_data) == 0:
            exercise_data = [Exercise(step=0, start_time=datetime.datetime.now(), end_time=datetime.datetime.now())]
        exercise_data[0].step = int(receive['steps'])
        exercise_data[0].type = settings.EXERCISE_TYPE['walk']
        exercise_data[0].save()
        # print(exercise_data[0])
        # print(receive)
        return HttpResponse()


def manifest(request):
    return render(request, 'manifest.json')
