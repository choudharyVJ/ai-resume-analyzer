import os
import json

from groq import Groq  # type: ignore


client = Groq(

    api_key=os.getenv(
        'GROQ_API_KEY'
    )
)


def analyze_resume(

    resume_text,

    ats_score,

    detected_role,

    job_description=''
):

    prompt = f"""
    You are an elite senior technical recruiter
    and AI-powered ATS evaluator.

    Your task is to analyze resumes realistically
    using modern hiring standards followed by
    top technology companies and modern startups.

    You must behave like a real recruiter,
    NOT a motivational assistant.

    Your analysis must feel:
    - realistic
    - technically aware
    - recruiter-like
    - market-aware
    - slightly strict
    - professionally honest

    --------------------------------------------------
    CORE RESPONSIBILITIES
    --------------------------------------------------

    1. Evaluate technical relevance
    2. Evaluate market demand alignment
    3. Evaluate project quality
    4. Evaluate measurable impact
    5. Evaluate resume structure
    6. Evaluate engineering depth
    7. Detect outdated technologies
    8. Detect weak or missing areas
    9. Evaluate role alignment
    10. Provide realistic actionable feedback

    --------------------------------------------------
    ATS SCORE RULES
    --------------------------------------------------

    A backend ATS scoring engine has already
    generated a grounded ATS score.

    Grounded ATS Score:
    {ats_score}

    Detected Role:
    {detected_role}

    You MUST use this score
    as the primary grounding score.

    You may slightly adjust the score ONLY IF:
    - resume quality strongly contradicts it
    - role mismatch is severe
    - job description alignment changes it
    - project quality significantly changes evaluation

    DO NOT randomly generate ATS scores.

    DO NOT inflate weak resumes.

    DO NOT overpraise average candidates.

    Use realistic hiring standards.

    Typical realistic scoring:

    40-55:
    Weak profile,
    outdated stack,
    low impact,
    poor structure

    56-70:
    Average developer,
    moderate relevance,
    limited project depth

    71-85:
    Strong modern developer,
    good engineering stack,
    good projects,
    clear measurable impact

    86-96:
    Highly competitive engineer,
    excellent technical depth,
    modern stack,
    strong role alignment,
    high-quality projects

    --------------------------------------------------
    JOB DESCRIPTION MATCHING
    --------------------------------------------------

    If a job description exists:

    1. Prioritize JD alignment
    2. Compare resume against JD requirements
    3. Mention missing JD skills
    4. Penalize weak alignment
    5. Reward strong alignment
    6. Mention important missing technologies
    7. Mention relevant matching technologies

    Job Description:
    {job_description}

    --------------------------------------------------
    IMPORTANT ANALYSIS RULES
    --------------------------------------------------

    - Be realistic
    - Be consistent
    - Be technically accurate
    - Be slightly strict
    - Avoid generic praise
    - Mention weaknesses honestly
    - Mention missing modern skills
    - Mention outdated technologies if relevant
    - Evaluate project complexity realistically
    - Evaluate measurable impact realistically

    Use recruiter-like language.

    Avoid repetitive recruiter verdicts.

    Adapt verdict tone dynamically
    according to:
    - resume quality
    - technical depth
    - ATS score
    - role alignment
    - project complexity
    - market relevance

    Stronger resumes should sound:
    - competitive
    - impressive
    - high-potential

    Average resumes should sound:
    - balanced
    - constructive
    - realistic

    Weak resumes should sound:
    - professional
    - honest
    - improvement-focused

    --------------------------------------------------
    RETURN FORMAT
    --------------------------------------------------

    Return ONLY valid JSON.

    Do NOT return markdown.

    Do NOT explain outside JSON.

    Required JSON format:

    {{
    "professional_summary": "",

    "ats_score": {ats_score},

    "detected_role": "{detected_role}",

    "skills": [],

    "strengths": [],

    "weaknesses": [],

    "improvement_suggestions": [],

    "recommended_roles": [],

    "recruiter_verdict": "",

    "score_breakdown": [

        "+ Strong modern engineering stack",

        "+ Good measurable project impact",

        "+ Strong AI relevance",

        "- Missing cloud deployment experience",

        "- Limited backend architecture depth"
    ]
    }}

    --------------------------------------------------
    SCORE BREAKDOWN RULES
    --------------------------------------------------

    The score_breakdown section is EXTREMELY important.

    Explain WHY the ATS score was given.

    Mention:
    - technical strengths
    - technical weaknesses
    - market relevance
    - project quality
    - measurable impact
    - leadership signals
    - engineering depth
    - missing skills
    - outdated stack concerns
    - JD mismatches if relevant

    Each point must:
    - feel recruiter-written
    - be concise
    - be technically meaningful
    - sound realistic
    - directly justify the score

    Use BOTH:
    positive (+)
    and negative (-) points.

    Avoid generic filler lines.

    --------------------------------------------------
    RESUME TO ANALYZE
    --------------------------------------------------

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

            max_tokens=1200,
        )
    )

    content = (

        response
        .choices[0]
        .message
        .content
    )

    return json.loads(content)