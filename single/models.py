from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import IntegerField, TextField, DateTimeField, BooleanField


class Contacts(models.Model):
    name = TextField(max_length=30)
    number = TextField(max_length=20)


class User(AbstractUser):
    height = IntegerField(null=True)
    weight = IntegerField(null=True)
    sex = BooleanField(null=True)
    birth = DateTimeField(null=True)
    pass


class Schedule(models.Model):
    exercise_type = IntegerField()
    target = IntegerField()
    pass


class Exercise(models.Model):
    step = IntegerField()
    start_time = DateTimeField()
    end_time = DateTimeField()
    type = IntegerField()
    pass
