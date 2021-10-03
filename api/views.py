from os import name
from django.shortcuts import render
#from rest_framework import generics
from django.http import HttpResponse,JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import pickle 
import nltk
import re
# CreateAPIView
# ListAPIView
def IndexView(request):
    
    f=open("./api/data/index.plck","rb")
    data=pickle.load(f)

    data = str(data)
    
    return HttpResponse(data) 

def Bool(request):
    def boolean(d,expr):
        words =  nltk.tokenize.word_tokenize(expr)
        for i in range(len(words)):
            if words[i] ==  "and" or words[i] ==  "or" or words[i] == "not" or words[i] ==  "(" or words[i] ==  ")" :
                continue
            else:
                if words[i] in d:
                    words[i] = "1"
                else:
                    words[i] = "0"
        expbool = (" ").join(words)
        return eval(expbool)
    f=open("./api/data/index.plck","rb")
    data=pickle.load(f)
    requette  = "communication or language"
    respons = []
    for d in data.keys() :
        if boolean(data[d],requette):
            respons.append(d)
    data = {}
    data["name"] = "test"
    return Response(data,status=status.HTTP_200_OK) 

def boolean(d,expr):
        words =  nltk.tokenize.word_tokenize(expr)
        for i in range(len(words)):
            if words[i] ==  "and" or words[i] ==  "or" or words[i] == "not" or words[i] ==  "(" or words[i] ==  ")" :
                continue
            else:
                if words[i] in d:
                    words[i] = "1"
                else:
                    words[i] = "0"
        expbool = (" ").join(words)
        return eval(expbool)

class GetData(APIView):
    def get(self,request,format=None):
        req = request.GET.get("request")
        if req != None:
            f=open("./api/data/index.plck","rb")
            index=pickle.load(f)
            #requette  = "communication or language"
            f=open("./api/data/all_doc.plck","rb")
            all=pickle.load(f)
            
            respons = []
            for d in index.keys() :
                if boolean(index[d],req):
                    data = {
                        "name":"",
                        "value":""
                    }
                    i = str(d)
                    data["name"] = i
                    data["value"] = all[d-1]
                    respons.append(data)
            
            return Response(respons,status=status.HTTP_200_OK) 
        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

    