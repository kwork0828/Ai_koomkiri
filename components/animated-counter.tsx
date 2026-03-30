"use client";

import { useEffect, useState, useRef } from "react";

/**
 * 뷰포트에 들어올 때 숫자가 카운트업되는 애니메이션 컴포넌트
 * - react-intersection-observer 대신 IntersectionObserver API 직접 사용
 *   (외부 라이브러리 의존성 제거, 번들 크기 감소)
 */
export function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  // 애니메이션이 이미 작동했는지 추적 (한 번만 실행)
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver로 요소가 화면에 보이는 시점을 감지
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // 카운트업 애니메이션 (easeOut 효과)
          const totalDuration = 2000;
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / totalDuration, 1);
            // easeOut: 처음에 빠르고 끝에서 느리게
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-bold tracking-tight text-white">
      {count.toLocaleString()}
    </span>
  );
}
