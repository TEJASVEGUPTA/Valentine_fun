import React, { useState, useRef, useCallback, useEffect } from "react";
import valStyles from "../pages/Valentine.module.css";

const Valentine = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [noText, setNoText] = useState("No 😢");
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState([]);
  const containerRef = useRef(null);
  const moveCount = useRef(0);

  const sadTexts = [
    "No 😢",
    "Are you sure? 🥺",
    "Really?! 💔",
    "Think again! 😭",
    "Please? 🥹",
    "Don't do this! 😿",
    "I'll cry! 😩",
    "Pretty please? 🌹",
    "Reconsider! 💕",
    "You're breaking my heart! 😫",
  ];

  const moveNoButton = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = 160;
    const buttonHeight = 55;

    const maxX = viewportWidth - buttonWidth - 20;
    const maxY = viewportHeight - buttonHeight - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setNoPos({ x: randomX, y: randomY });
    setIsMoved(true);

    moveCount.current += 1;
    setYesScale(1 + moveCount.current * 0.15);
    setNoText(sadTexts[moveCount.current % sadTexts.length]);
  }, []);

  const handleYesClick = () => {
    setAccepted(true);
  };

  /* ---------- Celebration hearts (only after YES) ---------- */
  useEffect(() => {
    if (!accepted) return;
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-40),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: 16 + Math.random() * 30,
          duration: 2 + Math.random() * 3,
          emoji: ["❤️", "💖", "💕", "💗", "💓", "🥰", "😍", "💘", "🌹"][
            Math.floor(Math.random() * 9)
          ],
        },
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, [accepted]);

  /* ======================== YES PAGE ======================== */
  if (accepted) {
    return (
      <div className={valStyles.yesContainer}>
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className={valStyles.burstHeart}
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            {heart.emoji}
          </span>
        ))}

        <div className={valStyles.yesContent}>
          <div className={valStyles.bigHeart}>💖</div>
          <h1 className={valStyles.yayTitle}>Yaaay! 🎉</h1>
          <h2 className={valStyles.yesSubtitle}>I knew you&apos;d say Yes!</h2>
          <div className={valStyles.coupleEmoji}>🧸❤️🧸</div>
          <p className={valStyles.yesMessage}>
            You just made me the happiest person in the world! 🌍💕
          </p>
          <p className={valStyles.promise}>
            Together forever, starting now... 💍✨
          </p>
          <div className={valStyles.kisses}>😘 😘 😘 😘 😘</div>
        </div>
      </div>
    );
  }

  /* ===================== QUESTION PAGE ===================== */
  return (
    <div className={valStyles.container} ref={containerRef}>
      {/* Floating Hearts Background */}
      <div className={valStyles.heartsBackground}>
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className={valStyles.floatingHeart}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${14 + Math.random() * 24}px`,
              opacity: 0.4 + Math.random() * 0.5,
            }}
          >
            {
              ["❤️", "💕", "💖", "💗", "💓", "🌹", "💘"][
                Math.floor(Math.random() * 7)
              ]
            }
          </span>
        ))}
      </div>

      {/* Main Card */}
      <div className={valStyles.card}>
        <div className={valStyles.envelopeIcon}>💌</div>

        <div className={valStyles.bearContainer}>
          <span className={valStyles.bear}>🧸</span>
          <span
            className={valStyles.sparkle}
            style={{ top: "-10px", left: "0" }}
          >
            ✨
          </span>
          <span
            className={valStyles.sparkle}
            style={{ top: "5px", right: "-10px" }}
          >
            ✨
          </span>
        </div>

        <h1 className={valStyles.title}>
          Will You Be My{" "}
          <span className={valStyles.valentineText}>Valentine</span>?
        </h1>

        <p className={valStyles.subtitle}>
          💕 I promise to make every day special 💕
        </p>

        <div className={valStyles.roseDivider}>🌹🌹🌹</div>

        {/* Buttons */}
        <div className={valStyles.buttonsContainer}>
          <button
            className={valStyles.yesButton}
            onClick={handleYesClick}
            style={{ transform: `scale(${yesScale})` }}
          >
            Yes! 💖
          </button>

          {!isMoved && (
            <button
              className={valStyles.noButton}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
            >
              {noText}
            </button>
          )}
        </div>

        {moveCount.current > 3 && (
          <p className={valStyles.hintText}>
            Psst... just click Yes already! 😏💘
          </p>
        )}
      </div>

      {/* Runaway No button (fixed position after first move) */}
      {isMoved && (
        <button
          className={`${valStyles.noButton} ${valStyles.noButtonMoved}`}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          style={{
            position: "fixed",
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
            zIndex: 9999,
            margin: 0,
          }}
        >
          {noText}
        </button>
      )}

      {/* Bottom decoration */}
      <div className={valStyles.bottomDecor}>Made with ❤️ for you</div>
    </div>
  );
};

export default Valentine;
