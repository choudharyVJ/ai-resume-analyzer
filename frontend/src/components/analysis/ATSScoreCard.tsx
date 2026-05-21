interface Props {
  score: number;
}

export default function ATSScoreCard({
  score,
}: Props) {

  const percentage = `${score}%`;

  return (

    <div
      className="
        rounded-[32px]

        border
        border-white/40

        bg-white/40

        backdrop-blur-3xl

        p-10

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

          w-52
          h-52

          rounded-full

          flex
          items-center
          justify-center

          bg-gradient-to-br
          from-white
          to-slate-100

          shadow-inner
        "
      >

        <div
          className="
            absolute
            inset-4

            rounded-full

            border-[12px]
            border-black/90
          "
          style={{
            clipPath: `polygon(
              0 0,
              ${percentage} 0,
              ${percentage} 100%,
              0 100%
            )`,
          }}
        />

        <div
          className="
            w-36
            h-36

            rounded-full

            bg-white

            flex
            flex-col
            items-center
            justify-center

            shadow-lg
          "
        >

          <h2
            className="
              text-5xl
              font-semibold

              text-gray-900
            "
          >

            {score}

          </h2>

          <p
            className="
              text-sm

              tracking-[0.3em]

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