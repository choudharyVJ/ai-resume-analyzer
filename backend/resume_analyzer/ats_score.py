import re


MARKET_SKILLS = {

    "frontend": {

        "skills": [

            "react",
            "angular",
            "next.js",
            "typescript",
            "tailwind",
            "redux",
            "vite",
        ],

        "max_score": 8,
    },

    "backend": {

        "skills": [

            "node",
            "express",
            "django",
            "fastapi",
            "mongodb",
            "postgresql",
            "mysql",
        ],

        "max_score": 8,
    },

    "ai": {

        "skills": [

            "langchain",
            "rag",
            "llm",
            "vector",
            "embedding",
            "chromadb",
            "groq",
            "agent",
            "openai",
            "transformer",
        ],

        "max_score": 14,
    },

    "cloud_devops": {

        "skills": [

            "docker",
            "kubernetes",
            "aws",
            "azure",
            "gcp",
            "ci/cd",
            "vercel",
            "render",
        ],

        "max_score": 7,
    },
}


OUTDATED_SKILLS = [

    "jquery",
    "wordpress",
    "php",
    "bootstrap",
    "html",
]


PROJECT_QUALITY_WORDS = [

    "built",
    "developed",
    "deployed",
    "scalable",
    "architecture",
    "optimized",
    "production",
    "integrated",
    "designed",
]


LEADERSHIP_WORDS = [

    "lead",
    "led",
    "managed",
    "mentor",
    "architecture",
    "architect",
    "founded",
    "ownership",
]


def detect_role(text):

    ai_keywords = [

        "langchain",
        "rag",
        "llm",
        "agent",
        "embedding",
        "vector",
        "openai",
        "groq",
    ]

    frontend_keywords = [

        "react",
        "next.js",
        "typescript",
        "tailwind",
        "angular",
    ]

    backend_keywords = [

        "node",
        "django",
        "express",
        "fastapi",
        "mongodb",
    ]

    ai_matches = sum(
        1 for word in ai_keywords
        if re.search(rf"\b{re.escape(word)}\b", text)
    )

    frontend_matches = sum(
        1 for word in frontend_keywords
        if re.search(rf"\b{re.escape(word)}\b", text)
    )

    backend_matches = sum(
        1 for word in backend_keywords
        if re.search(rf"\b{re.escape(word)}\b", text)
    )

    # Priority:
    # AI > Fullstack > Frontend > Backend

    if ai_matches >= 2:

        return "AI Engineer"

    if frontend_matches >= 2 and backend_matches >= 2:

        return "Fullstack Developer"

    if frontend_matches > backend_matches:

        return "Frontend Developer"

    return "Backend Developer"


def calculate_ats_score(text):

    text = " ".join(
        text.lower().split()
    )

    detected_role = detect_role(text)

    skills_score = 0

    impact_score = 0

    experience_score = 0

    structure_score = 0

    education_score = 0

    project_quality_score = 0

    outdated_penalty = 0

    # 1. MARKET SKILLS

    ai_skills_found = 0

    for category, data in MARKET_SKILLS.items():

        category_score = 0

        for skill in data["skills"]:

            if re.search(
                rf"\b{re.escape(skill)}\b",
                text
            ):

                category_score += 2

                if category == "ai":

                    ai_skills_found += 1

        skills_score += min(
            category_score,
            data["max_score"]
        )

    # AI PROJECT BONUS

    if (
        ai_skills_found >= 2
        and "project" in text
    ):

        skills_score += 6

    # ROLE PRIORITY BOOSTS

    if detected_role == "AI Engineer":

        skills_score += 8

    elif detected_role == "Fullstack Developer":

        skills_score += 5

    elif detected_role == "Frontend Developer":

        skills_score += 3

    elif detected_role == "Backend Developer":

        skills_score += 3

    # 2. IMPACT & METRICS

    metric_matches = re.findall(

        r"\b\d+%\b|\$\d+|\b\d+\s*x\b",

        text
    )

    impact_score = min(
        len(metric_matches) * 5,
        20
    )

    # 3. EXPERIENCE & LEADERSHIP

    if re.search(

        r"\b(experience|history|employment)\b",

        text
    ):

        experience_score += 5

    leadership_matches = sum(

        1 for word in LEADERSHIP_WORDS

        if re.search(
            rf"\b{word}\b",
            text
        )
    )

    experience_score += min(
        leadership_matches * 3,
        15
    )

    # 4. STRUCTURE & FORMATTING

    mandatory_sections = [

        "education",
        "project",
        "skills",
    ]

    sections_found = sum(

        1 for section in mandatory_sections

        if re.search(
            rf"\b{section}\b",
            text
        )
    )

    structure_score += (
        sections_found * 3
    )

    word_count = len(
        text.split()
    )

    if 400 <= word_count <= 800:

        structure_score += 6

    elif 300 <= word_count <= 1000:

        structure_score += 3

    # 5. EDUCATION & CERTIFICATIONS

    degree_keywords = [

        "bachelor",
        "master",
        "b\.s",
        "m\.s",
        "btech",
        "mtech",
        "phd",
        "computer science",
    ]

    if any(

        re.search(
            rf"\b{deg}\b",
            text
        )

        for deg in degree_keywords
    ):

        education_score += 6

    if re.search(

        r"\b(certif|aws certified|cloud certified)\b",

        text
    ):

        education_score += 4

    # 6. PROJECT QUALITY

    project_quality_matches = sum(

        1 for word in PROJECT_QUALITY_WORDS

        if re.search(
            rf"\b{word}\b",
            text
        )
    )

    project_quality_score += min(
        project_quality_matches * 2,
        12
    )

    # 7. OUTDATED TECH PENALTY

    outdated_matches = sum(

        1 for word in OUTDATED_SKILLS

        if re.search(
            rf"\b{word}\b",
            text
        )
    )

    outdated_penalty = min(
        outdated_matches * 2,
        10
    )

    # TOTAL

    total_score = (

        skills_score
        + impact_score
        + experience_score
        + structure_score
        + education_score
        + project_quality_score
    )

    # WEAK RESUME PENALTY

    weak_keywords = [

        "basic",
        "beginner",
        "fresher",
    ]

    for word in weak_keywords:

        if re.search(
            rf"\b{word}\b",
            text
        ):

            total_score -= 4

    # APPLY OUTDATED PENALTY

    total_score -= outdated_penalty

    # CLAMP SCORE

    total_score = max(
        10,
        min(total_score, 99)
    )

    return {

        "score": total_score,

        "detected_role": detected_role,
    }