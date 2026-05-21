interface Props {
  skills: string[];
}

export default function SkillsSection({
  skills,
}: Props) {

  return (

    <div
      className="
        mt-12

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
          text-3xl
          font-semibold

          text-gray-900

          mb-8
        "
      >

        Detected Skills

      </h2>

      <div
        className="
          flex
          flex-wrap
          gap-4
        "
      >

        {
          skills.map(
            (skill) => (

              <div
                key={skill}
                className="
                  px-6
                  py-3

                  rounded-2xl

                  bg-white/70

                  border
                  border-white/50

                  backdrop-blur-2xl

                  shadow-md

                  text-gray-800
                  font-medium

                  hover:scale-[1.03]

                  transition
                  duration-300
                "
              >

                {skill}

              </div>
            )
          )
        }

      </div>

    </div>
  );
}