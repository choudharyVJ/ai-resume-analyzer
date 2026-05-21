interface Props {
  analysis: any;
}

export default function AnalysisSection({
  analysis,
}: Props) {

  const sections = [

    {
      title: 'Professional Summary',
      content:
        analysis.professional_summary,
    },

    {
      title: 'Strengths',
      content:
        analysis.strengths,
    },

    {
      title: 'Weaknesses',
      content:
        analysis.weaknesses,
    },

    {
      title:
        'Improvement Suggestions',

      content:
        analysis.improvement_suggestions,
    },

    {
      title:
        'Recommended Roles',

      content:
        analysis.recommended_roles,
    }
  ];

  return (

    <div
      className="
        mt-12

        grid
        gap-6
      "
    >

      {
        sections.map(
          (
            section,
            index
          ) => (

            <div
              key={index}
              className="
                rounded-[32px]

                border
                border-white/40

                bg-white/40

                backdrop-blur-3xl

                p-8

                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold

                  text-gray-900

                  mb-6
                "
              >

                {section.title}

              </h2>

              {
                Array.isArray(
                  section.content
                ) ? (

                  <ul
                    className="
                      space-y-4
                    "
                  >

                    {
                      section.content.map(
                        (
                          item: string,
                          i: number
                        ) => (

                          <li
                            key={i}
                            className="
                              text-gray-700

                              leading-8
                            "
                          >

                            • {item}

                          </li>
                        )
                      )
                    }

                  </ul>

                ) : (

                  <p
                    className="
                      text-gray-700

                      leading-8
                    "
                  >

                    {section.content}

                  </p>
                )
              }

            </div>
          )
        )
      }

    </div>
  );
}