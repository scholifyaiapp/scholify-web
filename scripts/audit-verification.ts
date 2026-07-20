import {
  BT_VERIFICATION,
  MA_VERIFICATION,
  FA_VERIFICATION,
  LW_VERIFICATION,
  PM_VERIFICATION,
  TX_VERIFICATION,
  FR_VERIFICATION,
  AA_VERIFICATION,
  FM_VERIFICATION,
  SBL_VERIFICATION,
  SBR_VERIFICATION,
  AFM_VERIFICATION,
  APM_VERIFICATION,
  ATX_VERIFICATION,
  AAA_VERIFICATION,
  isVerified,
  type AreaVerificationRecord,
} from "@/lib/acca-content-verification"

const EXPECTED_BT_AREAS = ["A", "B", "C", "D", "E", "F"]
const problems: string[] = []

function auditPaper(records: AreaVerificationRecord[], expectedAreas: string[]): void {
  const paper = records[0]?.paper ?? "unknown"
  const actualAreas = records.map((record) => record.area)

  if (new Set(actualAreas).size !== actualAreas.length) {
    problems.push(`${paper}: duplicate verification area record`)
  }

  for (const area of expectedAreas) {
    if (!records.some((record) => record.area === area)) {
      problems.push(`${paper}: missing official Area ${area} verification record`)
    }
  }

  for (const record of records) {
    const id = `${record.paper}-${record.area}`
    if (!record.topicGroups.length) problems.push(`${id}: no official topic groups mapped`)
    if (!record.sources.some((source) => source.role === "syllabus")) {
      problems.push(`${id}: no official syllabus source`)
    }
    if (record.stage === "verified" && !isVerified(record)) {
      problems.push(`${id}: claims verified without satisfying every verification gate`)
    }
  }
}

auditPaper(BT_VERIFICATION, EXPECTED_BT_AREAS)
auditPaper(MA_VERIFICATION, ["A", "B", "C", "D", "E", "F"])
auditPaper(FA_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G", "H", "I"])
auditPaper(LW_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G", "H"])
auditPaper(PM_VERIFICATION, ["A", "B", "C", "D", "E", "F"])
auditPaper(TX_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G"])
auditPaper(FR_VERIFICATION, ["A", "B", "C", "D", "E"])
auditPaper(AA_VERIFICATION, ["A", "B", "C", "D", "E", "F"])
auditPaper(FM_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G", "H"])
auditPaper(SBL_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"])
auditPaper(SBR_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G"])
auditPaper(AFM_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G"])
auditPaper(APM_VERIFICATION, ["A", "B", "C", "D", "E"])
auditPaper(ATX_VERIFICATION, ["A", "B", "C", "D", "E"])
auditPaper(AAA_VERIFICATION, ["A", "B", "C", "D", "E", "F", "G", "H", "I"])

const sourceChecked = BT_VERIFICATION.filter((record) => record.stage !== "draft").length
const verified = BT_VERIFICATION.filter(isVerified).length
console.log(`BT verification: ${sourceChecked}/${BT_VERIFICATION.length} area(s) source-checked; ${verified} independently verified.`)
console.log(`MA verification: ${MA_VERIFICATION.filter((record) => record.stage !== "draft").length}/${MA_VERIFICATION.length} area(s) source-checked; ${MA_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`FA verification: ${FA_VERIFICATION.filter((record) => record.stage !== "draft").length}/${FA_VERIFICATION.length} area(s) source-checked; ${FA_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`LW-ENG verification: ${LW_VERIFICATION.filter((record) => record.stage !== "draft").length}/${LW_VERIFICATION.length} area(s) source-checked; ${LW_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`PM verification: ${PM_VERIFICATION.filter((record) => record.stage !== "draft").length}/${PM_VERIFICATION.length} area(s) source-checked; ${PM_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`TX-UK verification: ${TX_VERIFICATION.filter((record) => record.stage !== "draft").length}/${TX_VERIFICATION.length} area(s) source-checked; ${TX_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`FR verification: ${FR_VERIFICATION.filter((record) => record.stage !== "draft").length}/${FR_VERIFICATION.length} area(s) source-checked; ${FR_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`AA verification: ${AA_VERIFICATION.filter((record) => record.stage !== "draft").length}/${AA_VERIFICATION.length} area(s) source-checked; ${AA_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`FM verification: ${FM_VERIFICATION.filter((record) => record.stage !== "draft").length}/${FM_VERIFICATION.length} area(s) source-checked; ${FM_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`SBL verification: ${SBL_VERIFICATION.filter((record) => record.stage !== "draft").length}/${SBL_VERIFICATION.length} area(s) source-checked; ${SBL_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`SBR-INT verification: ${SBR_VERIFICATION.filter((record) => record.stage !== "draft").length}/${SBR_VERIFICATION.length} area(s) source-checked; ${SBR_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`AFM verification: ${AFM_VERIFICATION.filter((record) => record.stage !== "draft").length}/${AFM_VERIFICATION.length} area(s) source-checked; ${AFM_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`APM verification: ${APM_VERIFICATION.filter((record) => record.stage !== "draft").length}/${APM_VERIFICATION.length} area(s) source-checked; ${APM_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`ATX-UK verification: ${ATX_VERIFICATION.filter((record) => record.stage !== "draft").length}/${ATX_VERIFICATION.length} area(s) source-checked; ${ATX_VERIFICATION.filter(isVerified).length} independently verified.`)
console.log(`AAA-INT verification: ${AAA_VERIFICATION.filter((record) => record.stage !== "draft").length}/${AAA_VERIFICATION.length} area(s) source-checked; ${AAA_VERIFICATION.filter(isVerified).length} independently verified.`)

if (problems.length) {
  console.error(`\n${problems.length} VERIFICATION PROBLEM(S):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log("Verification registry is internally consistent.")
