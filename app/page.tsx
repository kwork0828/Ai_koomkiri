import Link from "next/link";
import { StudyCard } from "@/components/study-card";
import { AnimatedCounter } from "@/components/animated-counter";
import { ArrowRight, BookOpen, Users, Gift, Heart, GraduationCap } from "lucide-react";
import { getStudies } from "@/lib/firestore";

/**
 * 홈 페이지 (Server Component)
 * - Next.js App Router에서 기본으로 Server Component로 동작
 * - 서버 사이드에서 Firestore 데이터를 가져와 초기 렌더링 성능을 높임
 */
export default async function Home() {
  // 서버에서 스터디 데이터 미리 불러오기 (최대 3개만 미리보기로 표시)
  const allStudies = await getStudies();
  const previewStudies = allStudies.slice(0, 3);

  return (
    <div className="flex flex-col animate-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 lg:py-32">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />

        <div className="container relative z-10 mx-auto max-w-6xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <Heart size={16} />
            <span className="text-sm font-semibold tracking-wide">AI 재능기부 플랫폼</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            AI를 배우고, 재능을 나누고,
            <br className="hidden md:block" />
            참가비는{" "}
            <span className="text-primary relative inline-block">
              전액 기부
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-primary/30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            합니다.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            따뜻한 성장을 위한 커뮤니티 &quot;꿈끼리AI&quot;에서 여러분의 가치를 높이고, 선한
            영향력을 실천해보세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/studies"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
            >
              스터디 찾아보기 <ArrowRight size={20} />
            </Link>
            <Link
              href="/apply"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface border-2 border-primary/20 text-primary font-bold text-lg hover:bg-primary/5 transition-all flex items-center justify-center"
            >
              재능기부 멘토 지원
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Counter Banner */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center justify-center">
          <h2 className="text-primary-light font-semibold mb-2">우리가 함께 나눈 따뜻한 마음</h2>
          <div className="text-4xl md:text-6xl font-black tabular-nums flex items-baseline gap-2">
            <span>₩</span>
            <AnimatedCounter value={750000} />
          </div>
          <p className="mt-4 text-sm font-medium text-white/80 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            위키코리아(위기청소년) &amp; 한국컴패션(전세계어린이) 지원
          </p>
        </div>
      </section>

      {/* Operation Process (Infographic) */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">어떻게 운영되나요?</h2>
            <p className="text-muted-foreground">꿈끼리AI의 투명하고 따뜻한 3단계 프로세스</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="relative z-10 flex flex-col items-center text-center p-6 bg-surface rounded-2xl shadow-sm border border-border">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <BookOpen size={40} />
              </div>
              <div className="bg-muted px-3 py-1 rounded-full text-xs font-bold mb-3">STEP 1</div>
              <h3 className="text-xl font-bold mb-2">스터디 신청</h3>
              <p className="text-muted-foreground text-sm">
                참가비(5만원)만 내고
                <br />
                양질의 AI 스터디에 합류하세요
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-6 bg-surface rounded-2xl shadow-sm border border-border">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                <Users size={40} />
              </div>
              <div className="bg-muted px-3 py-1 rounded-full text-xs font-bold mb-3">STEP 2</div>
              <h3 className="text-xl font-bold mb-2">함께 배우기</h3>
              <p className="text-muted-foreground text-sm">
                전문 멘토, 동료들과 함께
                <br />4 주 동안 밀도 있게 성장합니다
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-6 bg-surface rounded-2xl shadow-sm border border-primary/20 ring-1 ring-primary/10 shadow-primary/5">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Gift size={40} />
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
                STEP 3
              </div>
              <h3 className="text-xl font-bold mb-2">참가비 전액 기부</h3>
              <p className="text-muted-foreground text-sm">
                모금된 참가비 100%는
                <br />
                NGO 단체를 통해 기부됩니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studies Section - Firestore 실시간 데이터 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">진행 중인 스터디</h2>
              <p className="text-muted-foreground">지금 합류할 수 있는 스터디를 확인하세요.</p>
            </div>
            <Link
              href="/studies"
              className="text-sm font-semibold flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
            >
              전체보기 <ArrowRight size={16} />
            </Link>
          </div>

          {previewStudies.length > 0 ? (
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x gap-6 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:px-0 md:mx-0">
              {previewStudies.map((study) => (
                <div key={study.id} className="min-w-[300px] sm:min-w-[350px] md:min-w-0 snap-center">
                  <StudyCard {...study} />
                </div>
              ))}
            </div>
          ) : (
            /* Firestore가 연결되지 않았거나 데이터가 없을 때 안내 메시지 */
            <div className="bg-surface border border-border border-dashed rounded-2xl py-16 text-center text-muted-foreground">
              <p className="text-4xl mb-4">🌱</p>
              <p className="font-medium">곧 스터디가 열릴 예정입니다!</p>
              <p className="text-sm mt-2">Firebase가 연결되면 스터디 목록이 여기에 표시됩니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Charities Info */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">우리의 나눔이 닿는 곳</h2>
            <p className="text-muted-foreground">참가 신청 시 선호하는 기부처를 선택할 수 있습니다.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-border">
                <span className="text-2xl font-black text-gray-400">WEKEY KOREA</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">위키코리아</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  가정 밖 위기 청소년들이 안전하게 자립하고 건강한 사회 구성원으로 성장할 수
                  있도록 돕습니다.
                </p>
                <div className="flex gap-2 mb-6">
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">위기청소년</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">자립지원</span>
                </div>
                <Link
                  href="#"
                  className="font-semibold text-primary hover:text-primary-dark text-sm flex items-center gap-1"
                >
                  단체 소개 자세히 보기 <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-border">
                <span className="text-2xl font-black text-blue-400">COMPASSION</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">한국컴패션</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  가난으로 고통받는 전 세계 어린이들이 영적, 경제적, 사회적, 신체적으로 자립할
                  수 있도록 1:1 결연 양육을 지원합니다.
                </p>
                <div className="flex gap-2 mb-6">
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">어린이양육</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">글로벌지원</span>
                </div>
                <Link
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  단체 소개 자세히 보기 <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Teaser */}
      <section className="py-20 bg-muted/50 border-t border-border">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <GraduationCap size={48} className="mx-auto text-primary mb-6" />
          <h2 className="text-3xl font-bold mb-6">재능을 나누실 멘토를 찾습니다</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            당신의 작은 지식이 누군가에게는 큰 도약의 발판이 됩니다. 참가자들의 성장을 돕고
            나눔의 가치를 실천할 따뜻한 멘토가 되어주세요.
          </p>
          <Link
            href="/mentors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border-2 border-border font-semibold hover:border-primary/50 hover:text-primary transition-colors"
          >
            멘토 보드 구경하기
          </Link>
        </div>
      </section>
    </div>
  );
}
