import Image from "next/image"

export function LoginLeftPanel() {
  return (
    <div className="relative hidden lg:flex flex-col w-1/2 min-h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/background.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay tint */}
      <div className="absolute inset-0 bg-[#C4163A]/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-10 py-10">
        {/* Logo */}
        <div className="flex flex-col items-start gap-2">
          <Image
            src="/images/logo.svg"
            alt="Dooinngs logo"
            width={160}
            height={160}
          />
          <p className="text-white/80 text-[18px] font-semi tracking-[0.2em] uppercase">Admin</p>
        </div>

        {/* Center image */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[80%] max-w-sm overflow-hidden ">
            <Image
              src="/images/ghana.png"
              alt="Ghana landmark"
              width={480}
              height={320}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Quote */}
        <div className="pb-4">
          <p className="text-white text-xl italic font-light leading-relaxed mb-4">
            &ldquo;Life&apos;s most persistent and urgent questions is<br />
            &lsquo;What are you{" "}
            <span className="bg-white text-[#C4163A] font-bold not-italic px-1 rounded">
              dooinng
            </span>{" "}
            for others?&rsquo;&rdquo;
          </p>
          <p className="text-white font-semibold text-lg">Dr. Martin Luther King, Junior</p>
          <p className="text-white/70 text-sm mt-0.5">Global Human Rights Activist</p>
        </div>
      </div>
    </div>
  )
}
