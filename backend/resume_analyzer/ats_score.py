import re


def calculate_ats_score(text):

    score = 40

    text = text.lower()

    # Skills

    important_skills = [

        'react',
        'next.js',
        'angular',
        'node',
        'express',
        'mongodb',
        'python',
        'django',
        'langchain',
        'groq',
        'tailwind',
        'typescript',
        'javascript',
        'docker',
        'git',
        'github',
    ]

    found_skills = 0

    for skill in important_skills:

        if skill in text:

            found_skills += 1

    score += min(found_skills * 2, 20)

    # Projects Section

    if 'project' in text:
        score += 10

    # Experience

    if 'experience' in text:
        score += 10

    # Education

    if 'education' in text:
        score += 5

    # Certifications

    if 'certification' in text:
        score += 5

    # Numbers / Metrics

    numbers = re.findall(r'\d+', text)

    if len(numbers) > 5:
        score += 5

    # Leadership

    leadership_words = [

        'lead',
        'managed',
        'team',
        'mentor',
        'ownership',
    ]

    for word in leadership_words:

        if word in text:

            score += 2

    # Penalty for very short resumes

    if len(text.split()) < 250:

        score -= 15

    # Clamp score

    score = max(35, min(score, 95))

    return score