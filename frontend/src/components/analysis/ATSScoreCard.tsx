interface Props {

  score: number;
}

export default function ATSScoreCard({

  score,

}: Props) {

  const radius = 90;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) *
      circumference;

  return (

    <div
      className="
        rounded-[32px]

        border
        border-white/40

        bg-white/40

        backdrop-blur-3xl

        p-6
        md:p-10

        shadow-[0_10px_40px_rgba(0,0,0,0.06)]

        flex
        flex-col
        items-center
        justify-center
      "
    >

      <div
        className="
          relative

          w-64
          h-64

          flex
          items-center
          justify-center
        "
      >

        <svg
          className="
            absolute
            inset-0

            -rotate-90
          "
          viewBox="0 0 220 220"
        >

          {/* Background */}

          <circle
            cx="110"
            cy="110"
            r={radius}

            stroke="#d1fae5"

            strokeWidth="16"

            fill="transparent"
          />

          {/* Progress */}

          <circle
            cx="110"
            cy="110"
            r={radius}

            stroke="#10b981"

            strokeWidth="16"

            fill="transparent"

            strokeLinecap="round"

            strokeDasharray={
              circumference
            }

            strokeDashoffset={
              offset
            }

            className="
              transition-all
              duration-1000
            "
          />

        </svg>

        {/* Inner Circle */}

        <div
          className="
            w-40
            h-40

            rounded-full

            bg-white/80

            backdrop-blur-xl

            flex
            flex-col
            items-center
            justify-center

            shadow-xl
          "
        >

          <h2
            className="
              text-5xl
              font-bold

              text-gray-900
            "
          >

            {score}

          </h2>

          <p
            className="
              text-xs

              tracking-[0.35em]

              text-gray-500

              mt-2
            "
          >

            ATS SCORE

          </p>

        </div>

      </div>

    </div>
  );
}