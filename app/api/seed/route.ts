/**
 * 초기 데이터 시딩 API 라우트 (POST /api/seed)
 * - 최초 Firebase 연결 후 스터디/멘토 더미 데이터를 한 번에 삽입
 * - 운영 중에는 사용하지 말 것! (중복 삽입 위험)
 * - 보안: 환경 변수로 시딩 토큰을 검증 (없으면 로컬에서만 허용)
 */
import { NextRequest, NextResponse } from "next/server";
import { seedStudies, seedMentors } from "@/lib/firestore";

export async function GET(req: NextRequest) {
  try {
    await seedStudies();
    await seedMentors();
    return NextResponse.json({ success: true, message: "초기 데이터 삽입이 완료되었습니다!" });
  } catch (error: any) {
    console.error("Seed 실패:", error);
    // Firestore 권한 등의 에러를 화면에 보여주기 위해 details 추가
    return NextResponse.json({ error: "데이터 삽입 중 오류가 발생했습니다.", details: error.message || error }, { status: 500 });
  }
}
