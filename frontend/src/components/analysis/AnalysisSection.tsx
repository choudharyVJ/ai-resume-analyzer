interface Props {
  analysis: any;
}

export default function AnalysisSection({ analysis }: Props) {
const sections = [

  {
    title: "Professional Summary",

    content:
      analysis.professional_summary,
  },

  {
    title:
      "Improvement Suggestions",

    content:
      analysis.improvement_suggestions,
  },

  {
    title:
      "Recommended Roles",

    content:
      analysis.recommended_roles,
  },
];

  return (
    <div
      className="
        mt-12

        grid

        gap-6
      "
    >

      {/* Detected Role */}

      {analysis.detected_role && (
        <div
          className="
              rounded-[32px]

              border
              border-white/40

              bg-white/40

              backdrop-blur-3xl

              p-6
              md:p-8

              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            "
        >
          <p
            className="
                text-sm

                tracking-[0.3em]

                uppercase

                text-gray-500

                mb-4
              "
          >
            Detected Role
          </p>

          <h2
            className="
                text-2xl
                md:text-3xl

                font-semibold

                text-gray-900
              "
          >
            {analysis.detected_role}
          </h2>
        </div>
      )}

      {/* Score Breakdown */}

      {analysis.score_breakdown && Array.isArray(analysis.score_breakdown) && (
        <div
          className="
              rounded-[32px]

              border
              border-white/40

              bg-white/40

              backdrop-blur-3xl

              p-6
              md:p-8

              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            "
        >
          <h2
            className="
                text-2xl
                md:text-3xl

                font-semibold

                text-gray-900

                mb-6
              "
          >
            Why This Score?
          </h2>

          <div
            className="
                flex
                flex-col

                gap-4
              "
          >
            {analysis.score_breakdown.map((item: string, index: number) => (
              <div
                key={index}
                className="
                        flex
                        items-start

                        gap-3
                      "
              >
                <p
                  className={`
                          leading-8

                          text-sm
                          md:text-base

                          ${
                            item.startsWith("+")
                              ? "text-emerald-700"
                              : "text-red-600"
                          }
                        `}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Sections */}

      {sections.map((section, index) => (
        <div
          key={index}
          className="
                rounded-[32px]

                border
                border-white/40

                bg-white/40

                backdrop-blur-3xl

                p-6
                md:p-8

                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              "
        >
          <h2
            className="
                  text-2xl
                  md:text-3xl

                  font-semibold

                  text-gray-900

                  mb-6
                "
          >
            {section.title}
          </h2>

          {Array.isArray(section.content) ? (
            <ul
              className="
                      space-y-4
                    "
            >
              {section.content.map((item: string, i: number) => (
                <li
                  key={i}
                  className="
                              text-gray-700

                              leading-8

                              text-sm
                              md:text-base
                            "
                >
                  • {item}
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="
                      text-gray-700

                      leading-8

                      text-sm
                      md:text-base
                    "
            >
              {section.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
