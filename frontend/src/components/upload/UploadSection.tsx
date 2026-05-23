'use client';

import { useState } from 'react';

import CrystalCard from '@/components/ui/CrystalCard';

import AnalysisSection from '@/components/analysis/AnalysisSection';

import AnalyzingLoader from '@/components/analysis/AnalyzingLoader';

import jsPDF from 'jspdf';

import SkillsSection from '@/components/analysis/SkillsSection';

import RecruiterVerdictCard from '@/components/analysis/RecruiterVerdictCard';

import ATSScoreCard from '../analysis/ATSScoreCard';

export default function UploadSection() {

  const [file, setFile] =
    useState<File | null>(null);

  const [response, setResponse] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [jobDescription, setJobDescription] =
    useState('');
  const [showJobBox, setShowJobBox] =
    useState(false);  

  const handleUpload = async () => {

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append(
      'resume',
      file
    );

  if (jobDescription) {

  formData.append(
    'job_description',
    jobDescription
  );
}

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resume/upload/`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data =
        await response.json();

      setResponse(data);

    } catch (error) {

      console.log(error);

      setResponse(null);
    }

    setLoading(false);
  };

  const downloadReport = () => {

    if (!response) return;

    const pdf = new jsPDF();

    pdf.setFontSize(20);

    pdf.text(
      'AI Resume Analysis Report',
      20,
      20
    );

    pdf.setFontSize(12);

    const reportText = `
Professional Summary:
${response.professional_summary}

ATS Score:
${response.ats_score}

Skills:
${response.skills?.join(', ')}

Strengths:
${response.strengths?.join(', ')}

Weaknesses:
${response.weaknesses?.join(', ')}

Improvement Suggestions:
${response.improvement_suggestions?.join(', ')}

Recommended Roles:
${response.recommended_roles?.join(', ')}

Recruiter Verdict:
${response.recruiter_verdict}

${
  response.job_match_score
    ? `
Job Match Score:
${response.job_match_score}
`
    : ''
}

${
  response.missing_skills?.length
    ? `
Missing Skills:
${response.missing_skills.join(', ')}
`
    : ''
}
`;

    const lines =
      pdf.splitTextToSize(
        reportText,
        170
      );

    pdf.text(
      lines,
      20,
      40
    );

    pdf.save(
      'ai_resume_report.pdf'
    );
  };

  return (

    <section
      className="
        min-h-screen

        flex
        items-center
        justify-center

        px-6
        py-20
      "
    >

      <CrystalCard>

        <p
          className="
            text-gray-700
            text-sm
            font-medium
            tracking-wide
            uppercase
            mb-4
          "
        >
          AI Resume Analyzer
        </p>

        <h1
          className="
            text-6xl
            font-semibold
            tracking-tight
            leading-[1.05]
            text-gray-900
            mb-6
          "
        >

          Upload Your Resume

        </h1>

        <p
          className="
            text-gray-700
            text-xl
            leading-9
            max-w-2xl
            mb-12
          "
        >

          Upload a PDF resume and let AI
          analyze skills, ATS score,
          recruiter insights, and career
          strengths using modern AI systems.

        </p>

        {/* Desktop Upload */}

<div
  className="
    hidden
    md:flex

    items-center
    justify-center
    flex-col
  "
>

  <label
    className="
      cursor-pointer

      w-72
      h-72

      rounded-[42px]

      bg-white/70

      backdrop-blur-2xl

      border
      border-white/60

      shadow-[0_10px_40px_rgba(0,0,0,0.08)]

      flex
      flex-col
      items-center
      justify-center

      text-center

      hover:scale-[1.02]

      transition
      duration-300
    "
  >

    <span
      className="
        text-4xl

        font-medium

        text-gray-700

        leading-relaxed
      "
    >

      Choose
      <br />
      Resume PDF

    </span>

    <input
      type="file"

      accept=".pdf"

      className="hidden"

      onChange={(event) => {

        if (
          event.target.files
        ) {

          setFile(
            event.target.files[0]
          );
        }
      }}
    />

  </label>

  {
    file && (

      <div
        className="
          mt-6

          max-w-[500px]

          text-center
        "
      >

        <p
          className="
            text-gray-600

            leading-7

            break-words
          "
        >

          <span className="font-semibold">

            Selected:

          </span>

          {' '}

          {file.name}

        </p>

      </div>
    )
  }

</div>

{/* Mobile Upload */}

<div
  className="
    flex
    md:hidden

    items-center
    justify-center
    flex-col
  "
>

  <label
    className="
      cursor-pointer

      w-52
      h-52

      rounded-[32px]

      bg-white/80

      backdrop-blur-xl

      border
      border-white/60

      shadow-[0_8px_30px_rgba(0,0,0,0.08)]

      flex
      flex-col
      items-center
      justify-center

      text-center

      px-4
    "
  >

    <span
      className="
        text-2xl

        font-medium

        text-gray-700

        leading-snug
      "
    >

      Choose
      <br />
      Resume
      <br />
      PDF

    </span>

    <input
      type="file"

      accept=".pdf"

      className="hidden"

      onChange={(event) => {

        if (
          event.target.files
        ) {

          setFile(
            event.target.files[0]
          );
        }
      }}
    />

  </label>

  {
    file && (

      <div
        className="
          mt-5

          px-4

          max-w-full

          text-center
        "
      >

        <p
          className="
            text-white

            text-sm

            break-words

            leading-7
          "
        >

          <span className="font-semibold">

            Selected:

          </span>

          {' '}

          {file.name}

        </p>

      </div>
    )
  }

</div>

        <button

  onClick={() =>
    setShowJobBox(
      !showJobBox
    )
  }

  className="
    mt-8

    text-gray-700

    font-medium

    hover:opacity-70

    transition
    duration-300
  "
>

  {
    showJobBox
      ? 'Hide Job Description'
      : '+ Add Job Description'
  }

</button>

<div
  className={`
    overflow-hidden

    transition-all
    duration-500
    ease-in-out

    ${
      showJobBox
        ? 'max-h-[400px] opacity-100 mt-6'
        : 'max-h-0 opacity-0'
    }
  `}
>

  <textarea

    placeholder="
(Optional) Paste Job Description for AI Job Matching...
    "

    value={jobDescription}

    onChange={(event) =>
      setJobDescription(
        event.target.value
      )
    }

    className="
      w-full

      min-h-[220px]

      rounded-[32px]

      border
      border-white/40

      bg-white/40

      backdrop-blur-3xl

      p-8

      outline-none

      text-gray-800

      placeholder:text-gray-400

      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
    "
  />

</div>



        <button
          onClick={handleUpload}

          disabled={loading}

          className="
            mt-10

            px-10
            py-4

            rounded-2xl

            bg-gradient-to-r
            from-emerald-500
            to-green-500

            text-white

            font-medium

            shadow-xl

            hover:scale-[1.03]

            transition
            duration-300
          "
        >

          {
            loading
              ? 'Analyzing...'
              : 'Analyze Resume'
          }

        </button>

        {
          loading && (
            <AnalyzingLoader />
          )
        }

        {
          response && (

            <div>

              <button
                onClick={downloadReport}
                className="
                  mt-10
                  mb-6

                  px-8
                  py-4

                  rounded-2xl

                  bg-white/70

                  border
                  border-white/40

                  backdrop-blur-2xl

                  shadow-lg

                  text-gray-900
                  font-medium

                  hover:scale-[1.02]

                  transition
                  duration-300
                "
              >

                Export AI Report

              </button>

              <ATSScoreCard
                score={response.ats_score}
              />

              <RecruiterVerdictCard
                verdict={
                  response.recruiter_verdict
                }
              />

              <SkillsSection
                skills={response.skills}
              />

              <AnalysisSection
                analysis={response}
              />

            </div>
          )
        }

      </CrystalCard>

    </section>
  );
}