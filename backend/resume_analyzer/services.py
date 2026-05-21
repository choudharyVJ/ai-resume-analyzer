import os
import json

from groq import Groq # type: ignore


client = Groq(
    api_key=os.getenv(
        'GROQ_API_KEY'
    )
)


def analyze_resume(resume_text):

    prompt = f"""
You are an elite AI resume analyzer.

Analyze the resume realistically.

Return ONLY valid JSON.

Required JSON format:


{{
  "professional_summary": "",
  "ats_score": 0,
  "skills": [],
  "strengths": [],
  "weaknesses": [],
  "improvement_suggestions": [],
  "recommended_roles": [],
  "recruiter_verdict": ""
}}

Rules:
- Do not return markdown
- Do not return explanations
- Return valid JSON only
- ATS score must be number
- Skills must be array
- Weaknesses must be honest
- Suggestions must be actionable
- Be highly consistent in ATS scoring
- Avoid random scoring changes
- Judge resumes using stable modern hiring standards

Resume:
{resume_text}
"""

    response = (
        client.chat.completions.create(

            model='llama-3.1-8b-instant',

            messages=[
                {
                    'role': 'user',
                    'content': prompt,
                }
            ],

            temperature=0,

            max_tokens=900,
        )
    )

    content = (
        response
        .choices[0]
        .message
        .content
    )

    return json.loads(content)