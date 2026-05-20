/**
 * Soft yellow glow page background.
 *
 * Renders as a fixed, full-viewport layer that sits behind all page
 * content (pointer-events: none, negative z-index). Drop one <Component />
 * near the top of a page and give the page's own wrapper a transparent
 * background so the glow shows through.
 */
export const Component = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[#FAFAF7]"
    >
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #FFF991 0%, transparent 70%)
          `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};

export default Component;
