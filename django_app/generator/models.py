from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Query(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	input_1 = models.CharField(max_length=200)
	input_2 = models.CharField(max_length=200)

	def __str__(self):
		return self.input_1

class Output(models.Model):
	user = models.CharField(max_length=200)
	created = models.DateTimeField(auto_now_add=True)
	output = models.TextField()
	def __str__(self):
		return self.output

