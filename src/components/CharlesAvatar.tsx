import CharlesMascot from "@/components/CharlesMascot"

/*
 * Charles's avatar — the waving mascot (pose 6), animated. Used wherever a small
 * Charles avatar appears (tutor panel, etc.). Full-body chibi, no crop.
 */
export default function CharlesAvatar({ size = 40 }: { size?: number }) {
  return <CharlesMascot pose="wave" size={size} />
}
