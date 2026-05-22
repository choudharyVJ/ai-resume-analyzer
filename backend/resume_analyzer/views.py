from django.shortcuts import render  # type: ignore

from rest_framework.decorators import api_view  # type: ignore

from rest_framework.response import Response  # type: ignore

from pypdf import PdfReader  # type: ignore

from .services import analyze_resume

from .ats_score import calculate_ats_score
from backend.resume_analyzer import ats_score


@api_view(['POST'])
def upload_resume(request):

    try:

        pdf_file = request.FILES.get(
            'resume'
        )

        if not pdf_file:

            return Response({
                'error': 'No PDF uploaded'
            })

        reader = PdfReader(pdf_file)

        extracted_text = ''

        for page in reader.pages:

            page_text = (
                page.extract_text()
            )

            if page_text:

                extracted_text += (
                    page_text + '\n'
                )

                ats_score = calculate_ats_score(
                    extracted_text
                )

        analysis = analyze_resume(
            extracted_text,
            calculate_ats_score
                                )

        return Response(analysis)

    except Exception as error:

        return Response({
            'error': str(error)
        })