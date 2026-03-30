"use client";

import { StudyCard } from "@/components/study-card";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Filter, Loader2 } from "lucide-react";
import { getStudies } from "@/lib/firestore";
import type { Study } from "@/lib/types";

// 상태/카테고리 필터 옵션
const FILTERS = ["전체", "모집중", "진행중", "완료"];
const CATEGORIES = ["전체", "AI코딩", "바이브코딩", "AI활용", "AI디자인"];

export default function StudiesPage() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [activeCategory, setActiveCategory] = useState("전체");

  /** Firestore에서 불러온 스터디 목록 */
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ───────────────────────────────────────────────
  // Firestore에서 스터디 목록 로딩
  // ───────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const data = await getStudies();
      setStudies(data);
      setIsLoading(false);
    };
    load();
  }, []);

  // ───────────────────────────────────────────────
  // 클라이언트 사이드 필터링
  // ───────────────────────────────────────────────
  const filteredStudies = studies.filter((study) => {
    const filterMatch = activeFilter === "전체" || study.status === activeFilter;
    const catMatch =
      activeCategory === "전체" ||
      study.tags.some(
        (tag) =>
          tag.includes(activeCategory) || activeCategory.includes(tag.replace("AI", ""))
      );
    return filterMatch && catMatch;
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 animate-in pb-24">
      {/* 헤더 */}
      <div className="mb-10 pb-6 border-b border-border">
        <h1 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
          스터디 찾기 <span className="text-xl">🚀</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          나에게 딱 맞는 스터디를 찾고 성장의 기쁨을 나눠보세요.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* 사이드바 필터 */}
        <div className="w-full lg:w-64 shrink-0 space-y-8">
          {/* 상태 필터 */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Filter size={18} /> 상태
            </h3>
            <div className="flex flex-col gap-2">
              {FILTERS.map((filter) => (
                <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                      activeFilter === filter
                        ? "border-primary bg-primary"
                        : "border-border group-hover:border-primary/50"
                    )}
                  >
                    {activeFilter === filter && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="statusFilter"
                    value={filter}
                    checked={activeFilter === filter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="hidden"
                  />
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      activeFilter === filter
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {filter}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 카테고리 태그 필터 */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold mb-4">카테고리 태그</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                    activeCategory === cat
                      ? "bg-primary text-white border-primary"
                      : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 스터디 목록 */}
        <div className="flex-1">
          {/* 로딩 스켈레톤 */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
              <Loader2 size={40} className="animate-spin text-primary" />
              <p className="text-sm">스터디 목록을 불러오는 중...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground font-medium">
                  총 <span className="text-foreground">{filteredStudies.length}</span>개의 스터디
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudies.map((study) => (
                  <StudyCard key={study.id} {...study} />
                ))}
              </div>

              {filteredStudies.length === 0 && (
                <div className="bg-surface border border-border border-dashed rounded-2xl py-24 flex flex-col items-center justify-center text-muted-foreground">
                  <span className="text-4xl mb-4">🥲</span>
                  <p>조건에 맞는 스터디가 없습니다.</p>
                  <button
                    onClick={() => {
                      setActiveFilter("전체");
                      setActiveCategory("전체");
                    }}
                    className="mt-4 text-primary font-medium hover:underline"
                  >
                    필터 초기화
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
