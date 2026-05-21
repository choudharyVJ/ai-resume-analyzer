interface Props {
  verdict: string;
}

export default function RecruiterVerdictCard({
  verdict,
}: Props) {

  const lowerVerdict =
    verdict.toLowerCase();

  const isStrongHire =
    lowerVerdict.includes(
      'strong'
    );

  const isModerate =
    lowerVerdict.includes(
      'moderate'
    );

  let badgeText =
    'NEEDS IMPROVEMENT';

  let badgeColor =
    'bg-red-500/90';

  if (isStrongHire) {

    badgeText = 'STRONG HIRE';

    badgeColor =
      'bg-green-500/90';
  }

  else if (isModerate) {

    badgeText =
      'MODERATE HIRE';

    badgeColor =
      'bg-yellow-500/90';
  }

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
          justify-between

          gap-6

          flex-wrap
        "
      >

        <div>

          <p
            className="
              text-gray-500

              text-sm

              tracking-[0.3em]

              uppercase

              mb-3
            "
          >

            Recruiter Verdict

          </p>

          <h2
            className="
              text-4xl
              font-semibold

              text-gray-900
            "
          >

            {badgeText}

          </h2>

        </div>

        <div
          className={`
            ${badgeColor}

            px-6
            py-3

            rounded-2xl

            text-white
            font-semibold

            shadow-lg
          `}
        >

          AI Evaluated

        </div>

      </div>

      <p
        className="
          mt-8

          text-gray-700

          leading-8

          text-lg
        "
      >

        {verdict}

      </p>

    </div>
  );
}