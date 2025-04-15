import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BirthdayPage() {
  const headingRef = useRef(null);
  const wishesRef = useRef(null);
  const confettiRef = useRef([]);
  const [typedText, setTypedText] = useState("");
  const [showSection, setShowSection] = useState(false);

  const fullText =
    "Wishing you a day filled with laughter, love, and all your favorite things. May your year ahead sparkle with joy, adventure, and beautiful surprises!";

  const indexRef = useRef(0);

  useEffect(() => {
    if (showSection) {
      const typeWriter = () => {
        const nextChar = fullText?.[indexRef.current] || "";
        setTypedText((prev) => prev + nextChar);
        indexRef.current += 1;

        if (indexRef.current < fullText.length) {
          setTimeout(typeWriter, 70);
        }
      };

      typeWriter();

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "bounce.out" }
      );

      confettiRef.current.forEach((el) => {
        if (!el) return;

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        gsap.set(el, { x: startX, y: startY });

        const wander = () => {
          const dx = (Math.random() - 0.5) * 100;
          const dy = (Math.random() - 0.5) * 100;

          gsap.to(el, {
            x: `+=${dx}`,
            y: `+=${dy}`,
            duration: 2 + Math.random() * 2,
            ease: "sine.inOut",
            onComplete: wander,
          });
        };

        wander();
      });
    }
  }, [showSection]);

  const handleButtonClick = () => {
    setShowSection((prev) => !prev);

    if (!showSection) {
      gsap.fromTo(
        ".section",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      );
    }
  };

  const confettiColors = [
    "bg-[#F99CA2]",
    "bg-[#FFE28A]",
    "bg-[#8CD4FF]",
    "bg-[#A0E9A3]",
    "bg-[#9B111E]",
  ];

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-gradient-to-br from-[#9B111E] via-[#C72C48] to-[#FFD6D6] overflow-hidden flex items-center justify-center">
      {showSection &&
        Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (confettiRef.current[i] = el)}
            className={`w-2.5 h-2.5 rounded-full absolute top-0 left-0 right-0 ${
              confettiColors[i % confettiColors.length]
            }`}
            style={{
              opacity: 0.85,
            }}
          />
        ))}

      {showSection ? (
        <>
          <div className="z-10 text-center px-6 max-w-2xl mt-6">
            <p
              ref={headingRef}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-xl text-white mb-6"
            >
              Happy Birthday
              <br />
              Maria Vanessa Salim!
            </p>

            <p
              ref={wishesRef}
              className="section text-base sm:text-lg md:text-xl text-white/90 leading-relaxed whitespace-pre-wrap transition-opacity duration-1000"
            >
              {typedText}
            </p>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm">
            by r.
          </div>
        </>
      ) : (
        <button
          onClick={handleButtonClick}
          className="z-10 bg-[#FF6B6B] text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-[#FF4B4B] focus:ring-4 focus:ring-[#FFB3B3]"
        >
          Click Here 😀
        </button>
      )}
    </div>
  );
}
