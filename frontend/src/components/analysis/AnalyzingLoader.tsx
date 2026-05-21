'use client';

import {
  useEffect,
  useState,
} from 'react';

const steps = [

  'Uploading Resume...',

  'Extracting Resume Content...',

  'Analyzing Skills...',

  'Calculating ATS Score...',

  'Generating AI Insights...',
];

export default function AnalyzingLoader() {

  const [currentStep, setCurrentStep] =
    useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentStep((prev) => {

        if (
          prev < steps.length - 1
        ) {
          return prev + 1;
        }

        return prev;
      });

    }, 1500);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div
      className="
        mt-12

        rounded-[32px]

        border
        border-white/40

        bg-white/40

        backdrop-blur-3xl

        p-10

        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      "
    >

      <div
        className="
          flex
          items-center
          gap-3

          mb-6
        "
      >

        <div
          className="
            w-4
            h-4

            rounded-full

            bg-emerald-500

            animate-pulse
          "
        />

        <h2
          className="
            text-2xl
            font-semibold

            text-gray-900
          "
        >

          AI Analysis Running

        </h2>

      </div>

      <div className="space-y-4">

        {
          steps.map(
            (
              step,
              index
            ) => (

              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className={`
                    w-3
                    h-3

                    rounded-full

                    ${
                      index <= currentStep
                        ? 'bg-black'
                        : 'bg-gray-300'
                    }
                  `}
                />

                <p
                  className={`
                    text-lg

                    ${
                      index <= currentStep
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }
                  `}
                >

                  {step}

                </p>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}