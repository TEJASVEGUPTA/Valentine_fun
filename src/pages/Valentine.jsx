import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import valStyles from "../pages/Valentine.module.css";

const Valentine = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [noText, setNoText] = useState("No 😢");
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);
  const containerRef = useRef(null);
  const moveCount = useRef(0);
  const noButtonRef = useRef(null); // Ref to measure actual button size

  const sadTexts = useMemo(
    () => [
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
    ],
    []
  );

  const moveNoButton = useCallback(
    (e) => {
      // Get actual button dimensions from the DOM element
      const btn = e?.currentTarget || noButtonRef.current;
      const rect = btn?.getBoundingClientRect();

      // Use actual rendered size with fallbacks
      const buttonWidth = rect?.width || 140;
      const buttonHeight = rect?.height || 50;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Safety padding to keep button fully visible
      const padding = 16;

      // Calculate safe bounds (accounting for growing text)
      const maxX = Math.max(padding, viewportWidth - buttonWidth - padding);
      const maxY = Math.max(padding, viewportHeight - buttonHeight - padding);
      const minX = padding;
      const minY = padding;

      // Generate random position within safe bounds
      const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
      const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;

      setNoPos({ x: randomX, y: randomY });
      setIsMoved(true);

      moveCount.current += 1;
      setYesScale(1 + moveCount.current * 0.15);
      setNoText(sadTexts[moveCount.current % sadTexts.length]);

      if (moveCount.current > 3) {
        setHintVisible(true);
      }
    },
    [sadTexts]
  );

  const handleYesClick = useCallback(() => {
    setAccepted(true);
  }, []);

  /* Memoize background hearts to prevent regeneration */
  const backgroundHearts = useMemo(
    () =>
      [...Array(25)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
        fontSize: `${14 + Math.random() * 24}px`,
        opacity: 0.4 + Math.random() * 0.5,
        emoji: ["❤️", "💕", "💖", "💗", "💓", "🌹", "💘"][
          Math.floor(Math.random() * 7)
        ],
      })),
    []
  );

  /* Celebration hearts */
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

  return (
    <div className={valStyles.container} ref={containerRef}>
      {/* Floating Hearts Background */}
      <div className={valStyles.heartsBackground}>
        {backgroundHearts.map((heart) => (
          <span
            key={heart.id}
            className={valStyles.floatingHeart}
            style={{
              left: heart.left,
              animationDelay: heart.animationDelay,
              animationDuration: heart.animationDuration,
              fontSize: heart.fontSize,
              opacity: heart.opacity,
            }}
          >
            {heart.emoji}
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
            onTouchEnd={(e) => {
              // Handle touch immediately without mouse delay
              e.preventDefault();
              handleYesClick();
            }}
            style={{
              transform: `scale(${yesScale})`,
              position: "relative",
              zIndex: 100, // Higher than No button to ensure it's always clickable
            }}
          >
            Yes! 💖
          </button>

          {!isMoved && (
            <button
              className={valStyles.noButton}
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault(); // Prevent scroll
                moveNoButton(e);
              }}
              ref={noButtonRef}
            >
              {noText}
            </button>
          )}
        </div>

        {hintVisible && (
          <p className={valStyles.hintText}>
            Psst... just click Yes already! 😏💘
          </p>
        )}
      </div>

      {/* Runaway No button - Fixed position */}
      {isMoved && (
        <button
          ref={noButtonRef}
          className={`${valStyles.noButton} ${valStyles.noButtonMoved}`}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault();
            moveNoButton(e);
          }}
          style={{
            position: "fixed",
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
            zIndex: 50, // Lower than Yes button so Yes is always accessible
            margin: 0,
            touchAction: "none", // Prevent scrolling when trying to tap
          }}
        >
          {noText}
        </button>
      )}

      <div className={valStyles.bottomDecor}>Made with ❤️ for you</div>
    </div>
  );
};

export default Valentine;
