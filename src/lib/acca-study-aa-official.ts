import type { StudyChapter } from "@/lib/acca-study-content"
import { AA_TREE_AREA_A } from "@/lib/acca-study-aa-tree-a"
import { AA_TREE_AREA_B } from "@/lib/acca-study-aa-tree-b"
import { AA_TREE_AREA_C } from "@/lib/acca-study-aa-tree-c"
import { AA_TREE_AREA_D } from "@/lib/acca-study-aa-tree-d"
import { AA_TREE_AREA_E } from "@/lib/acca-study-aa-tree-e"
import { AA_TREE_AREA_F } from "@/lib/acca-study-aa-tree-f"

/* Area A is a five-chapter tree — see acca-study-aa-tree-a.ts. Ethics alone
   (A4) is examined in Section B almost every sitting and now has its own
   chapter rather than a section inside a chapter covering A1 to A6. */
export const AA_OFFICIAL_A = AA_TREE_AREA_A
/* Area B is a five-chapter tree — see acca-study-aa-tree-b.ts. */
export const AA_OFFICIAL_B = AA_TREE_AREA_B
/* Area C is a four-chapter tree — see acca-study-aa-tree-c.ts. */
export const AA_OFFICIAL_C = AA_TREE_AREA_C
/* Area D is a five-chapter tree — see acca-study-aa-tree-d.ts. */
export const AA_OFFICIAL_D = AA_TREE_AREA_D
/* Area E is a three-chapter tree — see acca-study-aa-tree-e.ts. It replaces the
   single chapter that covered subsequent events, going concern, written
   representations, finalisation AND the auditor's report together. */
export const AA_OFFICIAL_E = AA_TREE_AREA_E
/* Area F is now authored too — see acca-study-aa-tree-f.ts. It was the last
   legacy body in the paper, and the twin of FM Area H: no syllabusRefs, no
   inline check, no knowledge diagnostic. */
export const AA_OFFICIAL_F = AA_TREE_AREA_F
