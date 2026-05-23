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
    'bg-red-500';

  if (isStrongHire) {

    badgeText =
      'STRONG HIRE';

    badgeColor =
      'bg-emerald-500';
  }

  else if (isModerate) {

    badgeText =
      'MODERATE HIRE';

    badgeColor =
      'bg-yellow-500';
  }

  return (

    <div
      className="
        mt-12

        rounded-[36px]

        border
        border-emerald-200/60

        bg-gradient-to-br
        from-emerald-100
        via-white
        to-green-50

        backdrop-blur-3xl

        p-6
        md:p-10

        shadow-[0_10px_50px_rgba(16,185,129,0.15)]
      "
    >

      <div
        className="
          flex
          items-start
          justify-between

          gap-6

          flex-col
          md:flex-row
        "
      >

        <div>

          <p
            className="
              text-emerald-700

              text-xs
              md:text-sm

              tracking-[0.35em]

              uppercase

              font-medium

              mb-4
            "
          >

            AI Resume Evaluation

          </p>

          <h2
            className="
              text-3xl
              md:text-5xl

              font-semibold

              text-gray-900

              leading-tight
            "
          >

            {badgeText}

          </h2>

        </div>

        <div
          className="
            inline-flex
            items-center

            gap-2

            rounded-full

            bg-emerald-500

            px-5
            py-2.5

            text-sm
            font-medium

            tracking-wide

            text-white

            shadow-lg
          "
        >

          AI Evaluated

        </div>

      </div>

      <div
        className="
          mt-8

          h-[1px]

          bg-gradient-to-r
          from-emerald-200
          to-transparent
        "
      />

      <p
        className="
          mt-8

          text-gray-700

          leading-8

          text-base
          md:text-lg

          max-w-4xl
        "
      >

        {verdict}

      </p>

    </div>
  );
}