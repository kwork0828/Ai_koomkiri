"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Info, Loader2 } from "lucide-react";
import { createApplication } from "@/lib/firestore";
import { getStudies } from "@/lib/firestore";
import type { ApplicationInput, Study, CharityChoice } from "@/lib/types";

export default function ApplyPage() {
  // ───────────────────────────────────────────────
  // 상태 관리
  // ───────────────────────────────────────────────

  /** 폼 제출 성공 여부 */
  const [isSubmitted, setIsSubmitted] = useState(false);

  /** 폼 제출 중 로딩 상태 (중복 제출 방지) */
  const [isLoading, setIsLoading] = useState(false);

  /** 에러 메시지 */
  const [error, setError] = useState<string | null>(null);

  /** 폼 입력값 상태 */
  const [formData, setFormData] = useState<ApplicationInput>({
    name: "",
    phone: "",
    email: "",
    studyId: "",
    charity: "all",
    message: "",
  });

  /** Firestore에서 불러온 스터디 목록 */
  const [studies, setStudies] = useState<Study[]>([]);
  const [studiesLoading, setStudiesLoading] = useState(true);

  // ───────────────────────────────────────────────
  // 데이터 로딩
  // ───────────────────────────────────────────────

  useEffect(() => {
    const loadStudies = async () => {
      const data = await getStudies();
      // 모집중인 스터디만 선택 옵션으로 표시
      setStudies(data.filter((s) => s.status === "모집중"));
      setStudiesLoading(false);
    };
    loadStudies();
  }, []);

  // ───────────────────────────────────────────────
  // 이벤트 핸들러
  // ───────────────────────────────────────────────

  /** 입력값 변경 핸들러 */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, name, value } = e.target;
    setFormData((prev) => ({ ...prev, [id || name]: value }));
  };

  /**
   * 폼 제출 핸들러
   * - Firestore에 신청서를 저장하고 성공 화면으로 전환
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createApplication(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error("신청서 저장 실패:", err);
      setError("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // ───────────────────────────────────────────────
  // 렌더링
  // ───────────────────────────────────────────────

  // 제출 성공 시 완료 화면 표시
  if (isSubmitted) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-32 text-center animate-in flex flex-col items-center">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">신청서가 접수되었습니다</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          신청해주셔서 감사합니다! 아래 계좌로 참가비(5만원) 입금이 확인되면 최종 참가 확정
          안내 메일을 보내드립니다.
        </p>

        <div className="bg-surface border border-border rounded-xl p-8 max-w-sm w-full shadow-sm text-left mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <h3 className="font-semibold text-sm text-muted-foreground mb-4">참가비 입금 계좌</h3>
          <p className="text-2xl font-bold font-mono tracking-tight mb-1">
            국민 873201-04-123456
          </p>
          <p className="text-sm font-medium">예금주: 꿈끼리AI</p>
          <p className="text-xs text-primary font-semibold mt-4 py-2 px-3 bg-primary/10 rounded-md">
            입금된 참가비 50,000원은 전액 기부됩니다.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-full transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 animate-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-3">스터디 참가 신청</h1>
        <p className="text-muted-foreground">
          함께 성장하고 따뜻한 마음을 나누는 여정에 동참하세요.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 rounded-xl p-4 mb-8 flex gap-3 text-sm">
        <Info className="shrink-0 mt-0.5" size={18} />
        <div>
          <strong className="block mb-1">참가비 안내</strong>
          <p className="leading-relaxed">
            꿈끼리AI의 모든 스터디 참가비(50,000원)는{" "}
            <strong>단 1원도 제외하지 않고 위키코리아 및 한국컴패션에 전액 기부</strong>됩니다.
            지출 내역은 기부 리포트에서 투명하게 공개됩니다.
          </p>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface border border-border shadow-sm rounded-2xl p-8 space-y-8">
        {/* 기본 정보 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b border-border pb-2">기본 정보</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                이름(실명)
              </label>
              <input
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="홍길동"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                연락처
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일 (스터디 안내용)
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="user@example.com"
            />
          </div>
        </div>

        {/* 신청 스터디 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b border-border pb-2">신청 스터디</h2>
          <div className="space-y-2">
            <label htmlFor="studyId" className="text-sm font-medium">
              참가할 스터디 선택
            </label>
            <select
              id="studyId"
              required
              value={formData.studyId}
              onChange={handleChange}
              disabled={studiesLoading}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer disabled:opacity-60"
            >
              <option value="">
                {studiesLoading ? "스터디 목록 불러오는 중..." : "스터디를 선택해주세요"}
              </option>
              {studies.map((study) => (
                <option key={study.id} value={study.id}>
                  {study.title} (모집중)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 기부처 선택 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b border-border pb-2">기부처 선택</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-3">
              내 참가비가 기부될 단체를 선택해주세요.
            </p>

            {(
              [
                { value: "all", label: "균등 분배 (추천)", desc: "위키코리아와 한국컴패션에 50%씩 나누어 기부합니다." },
                { value: "wekey", label: "위키코리아 전액 기부", desc: "가정 밖 위기 청소년들의 건강한 자립을 위해 전액 기부합니다." },
                { value: "compassion", label: "한국컴패션 전액 기부", desc: "가난으로 고통받는 전 세계 어린이 양육을 위해 전액 기부합니다." },
              ] as { value: CharityChoice; label: string; desc: string }[]
            ).map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  name="charity"
                  value={option.value}
                  checked={formData.charity === option.value}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary/20 border-border"
                />
                <div>
                  <span className="font-semibold block text-sm">{option.label}</span>
                  <span className="text-xs text-muted-foreground mt-1 block">{option.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 참가 다짐 */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            참가 다짐 한마디 (선택)
          </label>
          <textarea
            id="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            placeholder="스터디에 임하는 각오를 자유롭게 적어주세요!"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md mt-4 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              처리 중...
            </>
          ) : (
            "신청 완료하기"
          )}
        </button>
      </form>
    </div>
  );
}
