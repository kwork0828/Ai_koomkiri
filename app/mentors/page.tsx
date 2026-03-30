"use client";

import { useState, useEffect } from "react";
import { MentorCard } from "@/components/mentor-card";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMentors } from "@/lib/firestore";
import type { Mentor } from "@/lib/types";

const CATEGORIES = ["전체", "개발", "디자인", "데이터", "기획/비즈니스"];

/** 카테고리 → 태그 매핑 (필터링용) */
const CATEGORY_TAG_MAP: Record<string, string[]> = {
  개발: ["React", "Python", "Claude", "LLM", "AI코딩"],
  디자인: ["Figma", "Midjourney", "UX", "UI/UX"],
  데이터: ["DataAnalysis", "MachineLearning", "SQL"],
  "기획/비즈니스": ["창업", "MVP", "비즈니스모델"],
};

export default function MentorsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  /** Firestore에서 불러온 멘토 목록 */
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ───────────────────────────────────────────────
  // Firestore에서 멘토 목록 로딩
  // ───────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const data = await getMentors();
      setMentors(data);
      setIsLoading(false);
    };
    load();
  }, []);

  // ───────────────────────────────────────────────
  // 클라이언트 사이드 필터링 (검색 + 카테고리)
  // ───────────────────────────────────────────────
  const filteredMentors = mentors.filter((mentor) => {
    // 검색어 필터: 이름, 역할, 태그에서 검색
    const matchesSearch =
      searchQuery === "" ||
      mentor.name.includes(searchQuery) ||
      mentor.role.includes(searchQuery) ||
      mentor.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // 카테고리 필터
    const categoryTags = CATEGORY_TAG_MAP[activeCategory] || [];
    const matchesCategory =
      activeCategory === "전체" ||
      mentor.tags.some((tag) => categoryTags.includes(tag));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 animate-in">
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
            멘토 보드 <span className="text-xl">☕</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            경험을 나누고 함께 성장하는 꿈끼리AI의 재능기부 멘토들입니다.
          </p>
        </div>
        <div className="mt-6 md:mt-0 relative w-full md:w-64">
          <input
            type="text"
            placeholder="멘토 이름, 분야 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
              activeCategory === cat
                ? "bg-primary text-white border-primary"
                : "bg-surface text-muted-foreground border-border hover:bg-muted"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 멘토 그리드 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
          <Loader2 size={40} className="animate-spin text-primary" />
          <p className="text-sm">멘토 목록을 불러오는 중...</p>
        </div>
      ) : filteredMentors.length === 0 ? (
        <div className="bg-surface border border-border border-dashed rounded-2xl py-24 flex flex-col items-center justify-center text-muted-foreground">
          <span className="text-4xl mb-4">🔍</span>
          <p>검색 결과가 없습니다.</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("전체"); }}
            className="mt-4 text-primary font-medium hover:underline"
          >
            초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))}
        </div>
      )}
    </div>
  );
}
