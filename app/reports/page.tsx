"use client";

import { PieChart, Info, Image as ImageIcon, ExternalLink } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    {
      id: "rt-0",
      cohort: "시범 운영 (0기)",
      period: "2026.01 - 2026.02",
      users: 10,
      totalAmount: 500000,
      wekey: 250000,
      compassion: 250000,
    }
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 animate-in pb-24">
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-border">
        <h1 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
          기부 리포트 <span className="text-xl">📊</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          꿈끼리AI를 통해 모인 따뜻한 마음들이 어디로 어떻게 흘러가는지 투명하게 공개합니다.
        </p>
      </div>

      {/* Principle */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex shrink-0 items-center justify-center text-primary">
            <Info size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">투명성 원칙 (Transparency Principle)</h3>
            <p className="text-muted-foreground leading-relaxed">
              꿈끼리AI의 모든 스터디 참가비는 부가세, 카드수수료, 운영비 명목으로 <strong>단 1원도 차감하지 않고 100% 전액 기부</strong>됨을 원칙으로 합니다. (운영에 필요한 플랫폼 유지비 등은 전액 재능기부 멘토들의 후원으로 충당됩니다.)
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Cumulative Stats */}
        <div className="lg:col-span-1 bg-surface border border-border rounded-3xl p-8 flex flex-col justify-center shadow-sm">
          <h3 className="font-semibold text-muted-foreground mb-6 flex items-center gap-2">
            <PieChart size={20} /> 누적 기부 현황
          </h3>
          
          <div className="text-center mb-8">
            <span className="text-sm text-muted-foreground block mb-2">총 모금액</span>
            <span className="text-4xl md:text-5xl font-black text-foreground">500,000<span className="text-2xl text-muted-foreground ml-1 font-medium">원</span></span>
          </div>

          <div className="space-y-4 text-sm mt-auto">
            <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg border border-border">
              <span className="font-medium">위키코리아</span>
              <span className="font-bold text-primary">250,000원</span>
            </div>
            <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg border border-border">
              <span className="font-medium text-blue-600 dark:text-blue-400">한국컴패션</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">250,000원</span>
            </div>
            <div className="flex justify-between items-center p-3 text-muted-foreground">
              <span className="font-medium">기부 참여자 수</span>
              <span className="font-bold text-foreground">10명</span>
            </div>
          </div>
        </div>

        {/* Cohort Reports */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold mb-6">기수별 상세 내역</h3>
          
          {reports.map((report) => (
            <div key={report.id} className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm transition-hover hover:border-primary/30">
              <div className="bg-muted p-5 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h4 className="font-bold text-lg">{report.cohort}</h4>
                  <span className="text-sm text-muted-foreground">{report.period}</span>
                </div>
                <div className="bg-primary text-white font-bold px-5 py-2 rounded-full text-center shadow-sm tracking-widest tabular-nums">
                  ₩ {report.totalAmount.toLocaleString()}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">위기청소년 (위키코리아)</span>
                    <p className="text-xl font-bold">{report.wekey.toLocaleString()}원 <span className="text-sm font-normal text-muted-foreground ml-1">전달 완료</span></p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">어린이양육 (컴패션)</span>
                    <p className="text-xl font-bold text-blue-800 dark:text-blue-300">{report.compassion.toLocaleString()}원 <span className="text-sm font-normal text-blue-500 ml-1">결연 지원</span></p>
                  </div>
                </div>

                <div className="border border-border bg-muted/30 rounded-xl p-5">
                  <h5 className="font-bold text-sm mb-4 flex items-center gap-2">
                    <ImageIcon size={16} /> 기부 영수증 증빙
                  </h5>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <a href="#" className="w-32 h-40 shrink-0 bg-surface border border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
                      <ExternalLink size={24} className="mb-2 group-hover:text-primary transition-colors" />
                      <span className="text-xs">이체확인증.pdf</span>
                    </a>
                    <a href="#" className="w-32 h-40 shrink-0 bg-surface border border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
                      <ExternalLink size={24} className="mb-2 group-hover:text-primary transition-colors" />
                      <span className="text-xs">기부금영수증.png</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty state for upcoming cohorts */}
          <div className="bg-surface border border-border border-dashed rounded-2xl p-8 text-center text-muted-foreground">
            <span className="text-3xl mb-3 block">🌱</span>
            <p>1기 스터디 기부액은 5월 말에 업데이트 됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
