"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Users, Clock, Calendar, HandHeart, BookOpen, ExternalLink, ChevronDown, CheckCircle, ChevronUp } from "lucide-react";

const TABS = ["커리큘럼", "학습가이드", "인증게시판", "참가자"];

export default function StudyDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // In a real app, fetch data using 'id'
  const study = {
    title: "클로드 코드 바이브 코딩 (1기)",
    mentor: "김개발",
    status: "진행중",
    period: "2026.04.01 - 2026.05.01",
    currentUsers: 10,
    maxUsers: 10,
    difficulty: "초급",
    tags: ["바이브코딩", "Claude", "AI활용"],
    charity: "재단법인 위키코리아",
    price: 50000,
    curriculum: [
      { day: 1, title: "OT & 클로드 준비하기", task: "Claude 가입 및 기본 프롬프팅 실습" },
      { day: 2, title: "에이전트 코딩의 이해", task: "간단한 HTML/CSS 페이지 생성" },
      { day: 3, title: "API 연동 기초", task: "날씨 API 연동 코드 작성" },
      { day: 4, title: "미니 프로젝트 (1)", task: "할일 관리 앱 기능 구현" },
      { day: 5, title: "미니 프로젝트 (2)", task: "할일 관리 앱 디자인 고도화" },
      { day: 6, title: "디버깅 및 배포", task: "Vercel 배포 인증" },
      { day: 7, title: "회고", task: "완성된 결과물 및 후기 제출" },
    ]
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 animate-in pb-24">
      
      {/* Top Section */}
      <div className="bg-surface border border-border rounded-3xl overflow-hidden mb-12 shadow-sm">
        <div className="h-32 bg-primary/10 relative">
          <div className="absolute -bottom-4 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-2xl opacity-60"></div>
        </div>
        
        <div className="px-8 pb-8 pt-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
          {/* Badge & Title */}
          <div className="-mt-16 bg-surface p-6 rounded-2xl shadow-sm border border-border w-full md:w-2/3">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-green-700 bg-green-100 border border-green-200">
                {study.status}
              </span>
              <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                {study.difficulty}
              </span>
            </div>
            
            <h1 className="text-3xl font-extrabold mb-4">{study.title}</h1>
            
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Users size={18} className="text-primary" /> {study.currentUsers}/{study.maxUsers}명</span>
              <span className="flex items-center gap-1.5"><Calendar size={18} className="text-primary" /> {study.period}</span>
              <span className="flex items-center gap-1.5"><BookOpen size={18} className="text-primary" /> 멘토: <strong className="text-foreground">{study.mentor}</strong></span>
            </div>
          </div>

          {/* Checkout Info */}
          <div className="bg-muted p-5 rounded-2xl w-full md:w-1/3 flex flex-col justify-between self-stretch shrink-0 border border-border">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">참가비</p>
              <p className="text-2xl font-bold font-mono tracking-tight text-foreground">{study.price.toLocaleString()}원</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-start gap-2 text-sm">
              <HandHeart className="text-primary shrink-0 mt-0.5" size={18} />
              <p className="font-medium text-foreground">
                <span className="text-primary">전액 기부</span> ({study.charity})
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1 w-full max-w-full overflow-hidden">
          
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-border scrollbar-hide mb-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap border-b-2",
                  activeTab === tab 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 min-h-[500px] border border-border shadow-sm">
            
            {activeTab === "커리큘럼" && (
              <div className="space-y-8 animate-in">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><BookOpen className="text-primary" size={24} /> 상세 커리큘럼</h3>
                <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-12">
                  {study.curriculum.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/10" />
                      
                      <div className="text-primary font-black mb-1 text-sm tracking-wider uppercase">DAY {item.day}</div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                      <div className="bg-muted p-4 rounded-xl text-sm border border-border">
                        <strong className="text-muted-foreground block mb-1">실습 미션:</strong>
                        <p>{item.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "학습가이드" && (
              <div className="space-y-4 animate-in">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><ExternalLink className="text-primary" size={24} /> 상세 가이드</h3>
                {study.curriculum.map((item, idx) => (
                  <div key={idx} className="border border-border rounded-xl overflow-hidden shadow-sm transition-all">
                    <button 
                      onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                      className="w-full text-left px-5 py-4 bg-muted/30 hover:bg-muted/50 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary w-12 shrink-0">D-{item.day}</span>
                        <span className="font-semibold text-foreground">{item.title}</span>
                      </div>
                      {expandedDay === item.day ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
                    </button>
                    {expandedDay === item.day && (
                      <div className="p-5 border-t border-border bg-surface text-sm text-muted-foreground leading-relaxed animate-in">
                        <p className="mb-3">[{item.title}] 주제에 대한 핵심 학습 자료 및 영상 링크입니다.</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          <li>주제 관련 공식 문서 읽어보기</li>
                          <li>참고 Youtube 영상 시청 (약 15분)</li>
                        </ul>
                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-primary-dark">
                          <strong>🎯 미션:</strong> {item.task}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "인증게시판" && (
              <div className="space-y-6 animate-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-primary" size={24} /> 인증 피드</h3>
                  <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg">인증 올리기</button>
                </div>
                
                <div className="bg-muted/50 border border-border rounded-xl p-8 text-center text-muted-foreground">
                  <span className="text-4xl mb-4 block">📸</span>
                  <p>스터디가 시작되면 인증 미션이 활성화됩니다.</p>
                </div>
              </div>
            )}

            {activeTab === "참가자" && (
              <div className="space-y-8 animate-in">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><Users className="text-primary" size={24} /> 함께하는 10명의 동료</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bg-muted/30 rounded-xl p-4 flex flex-col items-center justify-center border border-border">
                      <div className="w-14 h-14 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-lg mb-3">
                        U{i+1}
                      </div>
                      <span className="text-sm font-medium mb-2">스터디원 {i+1}</span>
                      
                      <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${Math.floor(Math.random() * 80) + 10}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Floating Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24 bg-surface border border-primary/20 ring-1 ring-primary/5 rounded-3xl p-6 shadow-xl shadow-primary/5">
            <h3 className="text-lg font-bold mb-4">함께 성장해볼까요?</h3>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2"><Clock size={16}/> 모집 마감</span>
                <span className="font-semibold text-foreground">D-3</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2"><Users size={16}/> 모집 인원</span>
                <span className="font-semibold text-foreground">단 2자리 남음!</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground flex items-center gap-2"><HandHeart size={16}/> 참가비</span>
                <span className="font-semibold font-mono text-primary">50,000원</span>
              </div>
            </div>
            
            <Link 
              href={`/apply?study=${study.title}`}
              className="w-full block text-center bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-1"
            >
              참가 신청하기
            </Link>
            <p className="text-xs text-center text-muted-foreground mt-4">
              참가비는 모두의 따뜻한 성장을 위해<br/>위키코리아 등에 <strong className="text-primary font-medium">전액 기부</strong>됩니다.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
