
from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
# Userinput- & Databaserelated imports
from .models import Query, Output
from .forms import QueryForm
# Topic-model-related imports
from .scripts.topicmodel import Modelbuilder
# Imports general gpt-3-settings (ENGINE, TEMP, ...)
from .scripts.prompt_settings import * 
# General Python imports
import concurrent.futures
import json
import re
import openai

import time

openai.api_key = KEY

# Pure render-functions
def home(request):
	return render(request, 'generator/home.html', {'title': 'home'})

def about(request):
	return render(request, 'generator/about.html', {'title': 'about'})

@login_required
def direct(request):
	return render(request, 'generator/generate.html', {'title': 'generate'})


# Auxiliary-functions
def gpt3_call(prompt, settings):
	# Make API-call
	json_output = openai.Completion.create(engine=ENGINE,
                 						   prompt=prompt,
										   max_tokens=settings["max_tokens"],
										   temperature=settings["temp"],
										   stop=settings["stop"],
										   top_p=settings["top_p"],
										   presence_penalty=settings["pres_penalty"],
										   frequency_penalty=settings["freq_penalty"],
										   n=settings["n"])

	print(json_output)

	result_array = []
	for i in range(settings["n"]):
		# Check for sensitive content
		response_check = "<|endoftext|>" + json_output["choices"][i]["text"] + "\n--\nLabel:"
		safeInt = openai.Completion.create(engine='content-filter-alpha-c4',
										prompt=response_check,
										max_tokens=1,
										temperature=0.0,
										top_p=0)
		if safeInt["choices"][0]["text"] == '0':
			result_array.append(json_output["choices"][i]["text"])
		else: result_array.append("1. Warning: Inappropriate output generated AI: Warning: Inappropriate output generated")

	return result_array

def split_check(arr, mode):
	if (mode=="initQuestions" or mode=="Google Ad"):
		split = re.split('1. |2. ', arr)
		print("SPLIT")
		print(split)
		if (len(split) > 1):
			return split[1]
		else:
			return "--"
	else:
		if (mode == "answer"):
			split = arr.split("Answer: ")
			if (len(split) == 2):
				return split[1]
			else:
				return "--"
		else:
			split = arr.split("AI: ")
			if (len(split) == 2):
				return split[1]
			else:
				return "--"

@csrf_exempt
@require_http_methods(["POST"])
def query_json_copypress(request):
	name = request.POST.get("name")
	text = request.POST.get("text")
	mode = request.POST.get("response_mode")

	print("NAME:")
	print(name)
	print("TEXT:")
	print(text)
	print("MODE:")
	print(mode)


	if (mode=="Facebook Ad"):
		prompt = FACEBOOK_PRIMER + name + "// " + text + "]"
		settings = {
			"max_tokens": FB_MAX_TOKENS,
			"temp": FB_TEMP,
			"stop": FB_STOP,
			"top_p": FB_TOP_P,
			"pres_penalty": FB_PRES_PEN,
			"freq_penalty": FB_FREQ_PEN,
			"n": FB_N
		}
	elif (mode=="Google Ad"):
		prompt = GOOGLE_AD_PRIMER + name + "// " + text + "]"
		settings = {
			"max_tokens": GGL_MAX_TOKENS,
			"temp": GGL_TEMP,
			"stop": GGL_STOP,
			"top_p": GGL_TOP_P,
			"pres_penalty": GGL_PRES_PEN,
			"freq_penalty": GGL_FREQ_PEN,
			"n": GGL_N
		}
	elif (mode=="Blog Idea"):
		prompt = BLOG_IDEA_PRIMER + name + "// " + text + "]"
		settings = {
			"max_tokens": BIDEA_MAX_TOKENS,
			"temp": BIDEA_TEMP,
			"stop": BIDEA_STOP,
			"top_p": BIDEA_TOP_P,
			"pres_penalty": BIDEA_PRES_PEN,
			"freq_penalty": BIDEA_FREQ_PEN,
			"n": BIDEA_N
		}
	elif (mode=="Blog Intro"):
		prompt = BLOG_INTRO_PRIMER + name + "// " + text + "]"
		settings = {
			"max_tokens": BINTR_MAX_TOKENS,
			"temp": BINTR_TEMP,
			"stop": BINTR_STOP,
			"top_p": BINTR_TOP_P,
			"pres_penalty": BINTR_PRES_PEN,
			"freq_penalty": BINTR_FREQ_PEN,
			"n": BINTR_N
		}
	else:
		prompt = DESCRIPTION_PRIMER + name + " // " + text + "]"
		settings = {
			"max_tokens": DESCR_MAX_TOKENS,
			"temp": DESCR_TEMP,
			"stop": DESCR_STOP,
			"top_p": DESCR_TOP_P,
			"pres_penalty": DESCR_PRES_PEN,
			"freq_penalty": DESCR_FREQ_PEN,
			"n": DESCR_N
		}

	print(f"prompt in BACKEND:\n" + prompt)

	gpt3_results = gpt3_call(prompt, settings)

	result_array = []
	for i in range(len(gpt3_results)):
		tmp_arr = gpt3_results[i].split("\n")
		result_array = result_array + tmp_arr

	# 1st checks for emptiness then removes "1.", "2.", "AI: "
	print(result_array)
	final_array = list(filter(lambda x: len(x) > 3, result_array))
	print(final_array)
	final_array = list(map(lambda y: split_check(y, mode), final_array))
	print(final_array)

	final_array = list(filter(lambda  x: x != "--", final_array))

	if (gpt3_results == []):
		resp = {"status":"failure",
	"result": gpt3_results}
	else:
		resp = {"status":"success",
	"result": final_array}
	return HttpResponse(json.dumps(resp), content_type="json")

@csrf_exempt
@require_http_methods(["POST"])
def query_json_focusgroup(request):
	name = request.POST.get("name")
	text = request.POST.get("text")
	question = request.POST.get("question")
	mode = request.POST.get("response_mode")

	print("NAME:")
	print(name)
	print("TEXT:")
	print(text)
	print("MODE:")
	print(mode)


	if (mode=="answer"):
		prompt = ANSWER_PRIMER + name + " // " + text + "]\n" + "Question: " + question
		settings = {
			"max_tokens": ANSWER_MAX_TOKENS,
			"temp": ANSWER_TEMP,
			"stop": ANSWER_STOP,
			"top_p": ANSWER_TOP_P,
			"pres_penalty": ANSWER_PRES_PEN,
			"freq_penalty": ANSWER_FREQ_PEN,
			"n": ANSWER_N
		}
	elif (mode=="elaboration"):
		prompt = ELABORATE_PRIMER + name + " // " + text + "]\n" + "Question: " + question
		settings = {
			"max_tokens": ELABORATE_MAX_TOKENS,
			"temp": ELABORATE_TEMP,
			"stop": ELABORATE_STOP,
			"top_p": ELABORATE_TOP_P,
			"pres_penalty": ELABORATE_PRES_PEN,
			"freq_penalty": ELABORATE_FREQ_PEN,
			"n": ELABORATE_N
		}
	else:
		prompt = QUESTION_PRIMER + name + " // " + text + "]"
		settings = {
			"max_tokens":  QUESTIONS_MAX_TOKENS,
			"temp": QUESTIONS_TEMP,
			"stop": QUESTIONS_STOP,
			"top_p": QUESTIONS_TOP_P,
			"pres_penalty": QUESTIONS_PRES_PEN,
			"freq_penalty": QUESTIONS_FREQ_PEN,
			"n": QUESTIONS_N
		}

	print(f"prompt in BACKEND:\n" + prompt)

	gpt3_results = gpt3_call(prompt, settings)

	result_array = []
	for i in range(len(gpt3_results)):
		tmp_arr = gpt3_results[i].split("\n")
		result_array = result_array + tmp_arr

	# 1st checks for emptiness then removes "1.", "2.", "AI: "
	print(result_array)
	final_array = list(filter(lambda x: len(x) > 3, result_array))
	print(final_array)
	final_array = list(map(lambda y: split_check(y, mode), final_array))
	print(final_array)

	final_array = list(filter(lambda  x: x != "--", final_array))

	if (gpt3_results == []):
		resp = {"status":"failure",
	"result": gpt3_results}
	else:
		resp = {"status":"success",
	"result": final_array}
	return HttpResponse(json.dumps(resp), content_type="json")



