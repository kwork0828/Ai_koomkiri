/**
 * 초기 데이터 시딩 API 라우트 (POST /api/seed)
 * - 최초 Firebase 연결 후 스터디/멘토 더미 데이터를 한 번에 삽입
 * - 운영 중에는 사용하지 말 것! (중복 삽입 위험)
 * - 보안: 환경 변수로 시딩 토큰을 검증 (없으면 로컬에서만 허용)
 */
import { NextRequest, NextResponse } from "next/server";
import { seedStudies, seedMentors } from "@/lib/firestore";

export async function POST(req: NextRequest) {
  // 로컬 개발 환경에서만 허용 (또는 Authorization 헤더 확인)
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (process.env.NODE_ENV === "production" && secret !== process.env.SEED_SECRET) {
    return NextResponse.json(
      { error: "운영 환경에서는 seed 파라미터가 필요합니다." },
      { status: 403 }
    );
  }

  try {
    await seedStudies();
    await seedMentors();
    return NextResponse.json({ success: true, message: "초기 데이터 삽입이 완료되었습니다!" });
  } catch (error) {
    console.error("Seed 실패:", error);
    return NextResponse.json({ error: "데이터 삽입 중 오류가 발생했습니다." }, { status: 500 });
  }
}
