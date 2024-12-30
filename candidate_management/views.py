from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Candidate
from backendproject.serializers import CandidateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
import json

# GET all candidates
@api_view(['GET'])
def get_candidates(request):
    candidates = Candidate.objects.all()
    serializer = CandidateSerializer(candidates, many=True)
    return Response(serializer.data)

# POST a new candidate
@api_view(['POST'])
def save_candidate(request):
    name = request.data.get('name')
    email = request.data.get('email')
    phone = request.data.get('phone')
    resume = request.FILES.get('resume')
    documents = request.FILES.getlist('documents')
    job_posting_id = request.data.get('job_posting_id')  # Retrieve job_posting_id from request data

    # Debugging print statements to check values received
    print(f'name: {name}, email: {email}, phone: {phone}, job_posting_id: {job_posting_id}, resume: {resume}, documents: {documents}')

    resume_content = resume.read() if resume else None
    documents_content = [{'name': doc.name, 'content': doc.read().decode('latin-1')} for doc in documents]

    candidate = Candidate(
        name=name,
        email=email,
        phone=phone,
        resume=resume_content,
        documents=json.dumps(documents_content),
        job_posting_id=job_posting_id,  # Set job_posting_id from request data
        application_status='applied'  # Set application status to 'applied'
        # interview_schedule=None  # No need to explicitly set if it's allowed to be NULL
    )
    candidate.save()
    return Response({"message": "Candidate added successfully"}, status=201)



# GET a single candidate by id
@api_view(['GET'])
def get_candidate(request, pk):
    try:
        candidate = Candidate.objects.get(pk=pk)
    except Candidate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CandidateSerializer(candidate)
    return Response(serializer.data)

# PUT update a candidate by id
@api_view(['PUT'])
def update_candidate(request, pk):
    try:
        candidate = Candidate.objects.get(pk=pk)
    except Candidate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CandidateSerializer(candidate, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE a candidate by id
@api_view(['DELETE'])
def delete_candidate(request, pk):
    try:
        candidate = Candidate.objects.get(pk=pk)
    except Candidate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    candidate.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
