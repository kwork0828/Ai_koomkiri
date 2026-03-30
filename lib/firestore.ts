/**
 * Firestore CRUD 헬퍼 함수 모음
 * - 각 컬렉션(studies, mentors, applications)에 대한 읽기/쓰기를 담당
 * - 컴포넌트에서 직접 Firestore API를 호출하지 않고 이 파일을 통해 접근
 *   → 나중에 백엔드가 바뀌어도 이 파일만 수정하면 됨
 */
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Study, Mentor, ApplicationInput } from "./types";

// ───────────────────────────────────────────────
// 내부 유틸: Firestore 문서 → 앱 타입 변환
// ───────────────────────────────────────────────

/**
 * Firestore QuerySnapshot을 순수 JS 객체 배열로 변환
 * - document id를 포함시키기 위해 따로 처리
 */
const snapshotToArray = <T>(snapshot: QuerySnapshot<DocumentData>): (T & { id: string })[] =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T & { id: string }));

// ───────────────────────────────────────────────
// 스터디
// ───────────────────────────────────────────────

/** Firestore에서 모든 스터디를 가져옴 (최신순) */
export const getStudies = async (): Promise<Study[]> => {
  try {
    const ref = collection(db, "studies");
    const q = query(ref, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshotToArray<Study>(snapshot);
  } catch (error) {
    console.error("스터디 목록 조회 실패:", error);
    // DB 연결 실패 시 빈 배열 반환 (폴백 처리)
    return [];
  }
};

// ───────────────────────────────────────────────
// 멘토
// ───────────────────────────────────────────────

/** Firestore에서 모든 멘토를 가져옴 (최신순) */
export const getMentors = async (): Promise<Mentor[]> => {
  try {
    const ref = collection(db, "mentors");
    const q = query(ref, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshotToArray<Mentor>(snapshot);
  } catch (error) {
    console.error("멘토 목록 조회 실패:", error);
    return [];
  }
};

// ───────────────────────────────────────────────
// 신청서 (Applications)
// ───────────────────────────────────────────────

/**
 * 신청서를 Firestore에 저장
 * @param data - 폼에서 제출한 신청 데이터
 * @returns 저장된 문서의 ID
 */
export const createApplication = async (data: ApplicationInput): Promise<string> => {
  const ref = collection(db, "applications");
  const docRef = await addDoc(ref, {
    ...data,
    // 서버 타임스탬프를 사용해 시간 불일치 방지
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// ───────────────────────────────────────────────
// 초기 데이터 시딩 (최초 1회 실행용)
// ───────────────────────────────────────────────

/**
 * Firestore에 스터디 초기 데이터 삽입
 * - Firebase Console에서 직접 넣어도 되지만,
 *   이 함수를 호출하면 코드로 초기화할 수 있음
 * - 주의: 중복 삽입을 막는 로직이 없으므로 최초 1회만 실행
 */
export const seedStudies = async (): Promise<void> => {
  const initialStudies = [
    {
      title: "클로드 코드 바이브 코딩 (1기)",
      mentor: "김개발",
      status: "진행중",
      difficulty: "중급",
      period: "2026.04.01 - 2026.05.01",
      currentUsers: 10,
      maxUsers: 10,
      tags: ["바이브코딩", "Claude", "AI활용"],
      description: "Claude를 활용한 실전 바이브코딩 스터디입니다.",
      createdAt: serverTimestamp(),
    },
    {
      title: "코알누 바이브코딩 입문",
      mentor: "이코알",
      status: "모집중",
      difficulty: "초급",
      period: "2026.04.15 - 2026.05.15",
      currentUsers: 4,
      maxUsers: 8,
      tags: ["코알누", "AI코딩", "입문"],
      description: "코알누 플랫폼으로 AI 코딩을 처음 시작하는 분들을 위한 입문 스터디입니다.",
      createdAt: serverTimestamp(),
    },
    {
      title: "AI 업무 자동화 워크샵",
      mentor: "박자동",
      status: "완료",
      difficulty: "초급",
      period: "2026.03.01 - 2026.03.14",
      currentUsers: 15,
      maxUsers: 15,
      tags: ["자동화", "Zapier", "ChatGPT"],
      description: "업무 효율을 극대화하는 AI 자동화 도구 활용법을 배웁니다.",
      createdAt: serverTimestamp(),
    },
    {
      title: "AI 디자이너 실무 뽀개기",
      mentor: "최디자인",
      status: "모집중",
      difficulty: "중급",
      period: "2026.05.01 - 2026.05.30",
      currentUsers: 2,
      maxUsers: 12,
      tags: ["디자인", "Midjourney", "Figma"],
      description: "Midjourney와 Figma를 활용한 실무 AI 디자인 워크플로우를 배웁니다.",
      createdAt: serverTimestamp(),
    },
  ];

  const ref = collection(db, "studies");
  for (const study of initialStudies) {
    await addDoc(ref, study);
  }
  console.log("✅ 스터디 초기 데이터 삽입 완료");
};

/**
 * Firestore에 멘토 초기 데이터 삽입
 * - 주의: 중복 삽입을 막는 로직이 없으므로 최초 1회만 실행
 */
export const seedMentors = async (): Promise<void> => {
  const initialMentors = [
    {
      name: "김재능",
      image: "",
      role: "AI 엔지니어",
      company: "네비오",
      bio: "현업에서 쓰는 LLM 활용법부터 자동화 팁까지 아낌없이 나누겠습니다.",
      tags: ["LLM", "Python", "업무자동화"],
      createdAt: serverTimestamp(),
    },
    {
      name: "이코딩",
      image: "",
      role: "프론트엔드 개발자",
      company: "토스페이먼트",
      bio: "비전공자도 할 수 있는 AI 기반 프론트엔드 개발, 제가 도와드릴게요!",
      tags: ["React", "UI/UX", "Claude"],
      createdAt: serverTimestamp(),
    },
    {
      name: "박데이터",
      image: "",
      role: "데이터 사이언티스트",
      company: "카카오모빌리티",
      bio: "데이터 분석과 AI 모델링의 기초를 단단하게 다져주는 멘토링",
      tags: ["DataAnalysis", "MachineLearning", "SQL"],
      createdAt: serverTimestamp(),
    },
    {
      name: "최디자인",
      image: "",
      role: "프로덕트 디자이너",
      company: "라인",
      bio: "Midjourney와 Figma를 활용한 압도적인 생산성 향상 노하우",
      tags: ["Figma", "Midjourney", "UX"],
      createdAt: serverTimestamp(),
    },
    {
      name: "정스타트",
      image: "",
      role: "CEO",
      company: "AI스타트업",
      bio: "AI 기술을 활용한 1인 창업과 MVP 검증, 실전 경험을 공유합니다.",
      tags: ["창업", "MVP", "비즈니스모델"],
      createdAt: serverTimestamp(),
    },
  ];

  const ref = collection(db, "mentors");
  for (const mentor of initialMentors) {
    await addDoc(ref, mentor);
  }
  console.log("✅ 멘토 초기 데이터 삽입 완료");
};
