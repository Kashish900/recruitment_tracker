from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from backendproject.serializers import JobPostingSerializer
from .models import JobPosting
from django.db.models import Q
from datetime import date

# GET all job postings
@api_view(['GET'])
def get_job_postings(request):
    job_postings = JobPosting.objects.all()
    serializer = JobPostingSerializer(job_postings, many=True)
    return Response(serializer.data)

# POST a new job posting
@api_view(['POST'])
def save_job_posting(request):
    request.data['visibility_status'] = True
    serializer = JobPostingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# GET a single job posting by id
@api_view(['GET'])
def get_job_posting(request, pk):
    try:
        job_posting = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = JobPostingSerializer(job_posting)
    return Response(serializer.data)

# PUT update a job posting by id
@api_view(['PUT'])
def update_job_posting(request, pk):
    try:
        job_posting = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data['visibility_status'] = True
    serializer = JobPostingSerializer(job_posting, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE a job posting by id
@api_view(['DELETE'])
def delete_job_posting(request, pk):
    try:
        job_posting = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    job_posting.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

#to perform searching
@api_view(['GET'])
def get_filtered_job_postings(request):
    fieldname = request.query_params.get('fieldname', None)
    fieldvalue = request.query_params.get('fieldvalue', None)

    if fieldname and fieldvalue:
        # Perform case-insensitive search using __icontains
        job_postings = JobPosting.objects.filter(
            Q(**{f"{fieldname}__icontains": fieldvalue})
        )
    else:
        job_postings = JobPosting.objects.all()

    serializer = JobPostingSerializer(job_postings, many=True)
    return Response(serializer.data)

# api for changing visibility on the basis of application deadline
@api_view(['GET'])
def update_visibility_status(request):
    # Today's date
    today = date.today()
  

    # Update job postings where application deadline has passed
    updated_count = JobPosting.objects.filter(
        application_deadline__lt=today
    ).update(visibility_status=False)

    # Retrieve updated job postings
    job_postings = JobPosting.objects.all()
    serializer = JobPostingSerializer(job_postings, many=True)
    
    return Response({
        'message': f'{updated_count} job postings updated successfully.',
        'job_postings': serializer.data
    })

