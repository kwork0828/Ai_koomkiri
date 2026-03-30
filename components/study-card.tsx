import Link from "next/link";
import { Users, Clock, Award, HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";

export type StudyStatus = "모집중" | "진행중" | "완료";

export interface StudyCardProps {
  id: string;
  title: string;
  mentor: string;
  status: StudyStatus;
  period: string;
  currentUsers: number;
  maxUsers: number;
  difficulty: "초급" | "중급" | "고급";
  tags: string[];
}

export function StudyCard({
  id,
  title,
  mentor,
  status,
  period,
  currentUsers,
  maxUsers,
  difficulty,
  tags,
}: StudyCardProps) {
  const statusColors = {
    모집중: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    진행중: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
    완료: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
  };

  return (
    <Link href={`/studies/${id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-border">
          <div className="flex justify-between items-start mb-3">
            <span className={cn("px-2.5 py-1 rounded-md text-xs font-semibold border", statusColors[status])}>
              {status}
            </span>
            <span className="text-xs font-medium px-2 py-1 bg-muted rounded-md text-muted-foreground">
              {difficulty}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
            <span className="font-medium text-foreground">{mentor}</span> 멘토
          </p>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col gap-3">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Clock size={16} className="text-primary/70" />
            <span>{period}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Users size={16} className="text-primary/70" />
            <span>{currentUsers} / {maxUsers}명</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer (Donation highlight) */}
        <div className="bg-primary/5 p-4 border-t border-primary/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">참가비</span>
            <span className="font-bold text-primary">50,000원</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary-dark">
            <HandHeart size={16} />
            전액 기부
          </div>
        </div>
      </div>
    </Link>
  );
}
