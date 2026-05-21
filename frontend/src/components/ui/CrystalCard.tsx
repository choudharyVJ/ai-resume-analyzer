import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CrystalCard({
  children,
}: Props) {

  return (

    <div
      className="
        relative

        w-full
        max-w-5xl

        overflow-hidden

        rounded-[40px]

        border
        border-white/40

        bg-white/35

        backdrop-blur-3xl

        shadow-[0_20px_80px_rgba(0,0,0,0.08)]

        p-14
      "
    >

      {/* Top Glow */}
      <div
        className="
          absolute

          top-0
          left-0

          w-full
          h-40

          bg-gradient-to-b
          from-white/60
          to-transparent

          pointer-events-none
        "
      />

      {/* Left Reflection */}
      <div
        className="
          absolute

          -left-20
          top-10

          w-60
          h-60

          rounded-full

          bg-white/20

          blur-3xl

          pointer-events-none
        "
      />

      {/* Right Reflection */}
      <div
        className="
          absolute

          -right-20
          bottom-0

          w-72
          h-72

          rounded-full

          bg-slate-200/30

          blur-3xl

          pointer-events-none
        "
      />

      <div className="relative z-10">

        {children}

      </div>

    </div>
  );
}