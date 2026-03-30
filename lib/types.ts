/**
 * 프로젝트 전체에서 사용되는 공통 타입 정의
 * - Firestore 문서 구조와 1:1로 매핑
 * - 컴포넌트 props 타입도 이 파일을 기준으로 맞춤
 */
import { Timestamp } from "firebase/firestore";

// ───────────────────────────────────────────────
// 스터디 관련 타입
// ───────────────────────────────────────────────

/** 스터디 진행 상태 */
export type StudyStatus = "모집중" | "진행중" | "완료";

/** 스터디 난이도 */
export type StudyDifficulty = "초급" | "중급" | "고급";

/** Firestore `studies` 컬렉션의 문서 타입 */
export interface Study {
  id: string;
  title: string;
  mentor: string;
  status: StudyStatus;
  difficulty: StudyDifficulty;
  period: string;
  currentUsers: number;
  maxUsers: number;
  tags: string[];
  description?: string;
  createdAt?: Timestamp;
}

// ───────────────────────────────────────────────
// 멘토 관련 타입
// ───────────────────────────────────────────────

/** Firestore `mentors` 컬렉션의 문서 타입 */
export interface Mentor {
  id: string;
  name: string;
  image: string;
  role: string;
  company: string;
  bio: string;
  tags: string[];
  linkedIn?: string;
  createdAt?: Timestamp;
}

// ───────────────────────────────────────────────
// 신청서 관련 타입
// ───────────────────────────────────────────────

/** 기부처 선택 옵션 */
export type CharityChoice = "all" | "wekey" | "compassion";

/** Firestore `applications` 컬렉션의 문서 타입 */
export interface Application {
  id?: string;
  name: string;
  phone: string;
  email: string;
  studyId: string;
  charity: CharityChoice;
  message?: string;
  createdAt?: Timestamp;
}

/** 폼 제출 시 사용하는 DTO (id, createdAt 제외) */
export type ApplicationInput = Omit<Application, "id" | "createdAt">;
