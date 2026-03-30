"use client";

import { ExternalLink, GitFork, Heart } from "lucide-react";
import { useState } from "react";

const PROJECTS = [
  {
    id: "p1",
    title: "AI 할 일 관리 봇",
    author: "User_123",
    cohort: "클로드 코드 바이브 코딩 (1기)",
    tags: ["Claude", "Telegram", "Python"],
    demoLabel: "Demo",
    likes: 12,
  },
  {
    id: "p2",
    title: "나만의 포트폴리오 웹사이트",
    author: "김코딩",
    cohort: "코알누 바이브코딩 입문",
    tags: ["Next.js", "Tailwind", "Vercel"],
    demoLabel: "Link",
    likes: 8,
  },
  {
    id: "p3",
    title: "자동화된 독서 기록 템플릿",
    author: "박자동",
    cohort: "AI 업무 자동화 워크샵",
    tags: ["Notion", "Zapier"],
    demoLabel: "Template",
    likes: 24,
  },
  {
    id: "p4",
    title: "AI 면접 코치 앱",
    author: "취준생A",
    cohort: "클로드 코드 바이브 코딩 (1기)",
    tags: ["OpenAI API", "React", "Vercel"],
    demoLabel: "App",
    likes: 45,
  }
];

export default function ShowcasePage() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 animate-in pb-24">
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-border">
        <h1 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
          에브리데이 쇼케이스 <span className="text-xl">✨</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          스터디를 통해 탄생한 참가자들의 멋진 결과물을 구경하고 응원해주세요!
        </p>
      </div>

      {/* Masonry-like Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className="break-inside-avoid bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            {/* Random height image placeholder for masonry effect */}
            <div 
              className="bg-muted w-full relative group-hover:bg-primary/5 transition-colors"
              style={{ height: `${150 + (index % 3) * 50}px` }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                  <ExternalLink size={16} /> 구경하기
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                  {project.cohort}
                </span>
              </div>
              
              <h3 className="text-lg font-bold mb-1 leading-tight">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">by {project.author}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-muted border border-border px-2 py-1 rounded text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <button 
                  onClick={() => toggleLike(project.id)}
                  className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                  style={{ color: liked[project.id] ? '#FF6B6B' : 'var(--muted-foreground)' }}
                >
                  <Heart size={18} fill={liked[project.id] ? '#FF6B6B' : 'transparent'} /> 
                  {project.likes + (liked[project.id] ? 1 : 0)}
                </button>
                
                <div className="flex gap-2">
                  <a href="#" className="p-1.5 text-muted-foreground hover:text-foreground bg-muted rounded-full transition-colors" title="GitHub">
                    <GitFork size={16} />
                  </a>
                  <a href="#" className="p-1.5 text-muted-foreground hover:text-primary bg-primary/5 rounded-full transition-colors" title={project.demoLabel}>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Call to action card */}
        <div className="break-inside-avoid bg-primary text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-md">
          <span className="text-4xl mb-4">💡</span>
          <h3 className="text-xl font-bold mb-2">다음 주인공은 바로 당신!</h3>
          <p className="text-primary-light mb-6 text-sm">스터디에 참가하고 멋진 프로젝트를 뽐내보세요.</p>
          <a href="/studies" className="bg-white text-primary font-bold px-6 py-3 rounded-full hover:bg-neutral-100 transition-colors">
            스터디 찾기
          </a>
        </div>
      </div>
    </div>
  );
}
