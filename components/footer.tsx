import Link from "next/link";
import { X, Link2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-muted-foreground pt-12 pb-8 mt-16">
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Mission */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold text-foreground">꿈끼리AI</h3>
          <p className="text-sm leading-relaxed max-w-sm">
            함께 배우고, 재능을 나누며,
            <br />
            참가비는 전액 기부하는 따뜻한 스터디 커뮤니티입니다.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors hover:scale-110"
              aria-label="X (Twitter)"
            >
              <X size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors hover:scale-110"
              aria-label="Instagram"
            >
              <Link2 size={20} />
            </Link>
            <Link
              href="mailto:contact@ai-koomkiri.com"
              className="hover:text-primary transition-colors hover:scale-110"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">메뉴</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/studies" className="hover:text-primary transition-colors">스터디 찾기</Link>
            </li>
            <li>
              <Link href="/mentors" className="hover:text-primary transition-colors">멘토 보드</Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-primary transition-colors">기부 리포트</Link>
            </li>
            <li>
              <Link href="/apply" className="hover:text-primary transition-colors">참가 신청</Link>
            </li>
          </ul>
        </div>

        {/* Donation Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">후원 안내</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">🏦</span>
              <span>
                <strong>국민은행</strong><br />
                873201-04-123456<br />
                <span className="text-xs">(예금주: 꿈끼리AI)</span>
              </span>
            </li>
            <li className="flex flex-col gap-1 mt-4 border-t border-border pt-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">함께하는 기부처</span>
              <div className="flex gap-2">
                <span className="text-xs bg-muted px-2 py-1 rounded">위키코리아</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">한국컴패션</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs">
        <p>© 2026 꿈끼리AI. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-foreground transition-colors">이용약관</Link>
          <Link href="#" className="hover:text-foreground transition-colors">개인정보처리방침</Link>
        </div>
      </div>
    </footer>
  );
}
