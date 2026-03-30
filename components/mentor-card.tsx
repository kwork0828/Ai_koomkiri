import { MessageCircleHeart, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MentorCardProps {
  id: string;
  name: string;
  image: string;
  role: string;
  company: string;
  bio: string;
  tags: string[];
}

export function MentorCard({ id, name, image, role, company, bio, tags }: MentorCardProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-24 bg-gradient-to-r from-primary/20 to-primary-light/10"></div>
      
      <div className="px-6 pb-6 pt-0 flex-1 flex flex-col items-center text-center -mt-12">
        {/* Avatar */}
        <div className="w-24 h-24 bg-surface rounded-full p-1 border border-border shadow-sm mb-4 relative z-10 transition-transform group-hover:scale-105">
          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-3xl overflow-hidden">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span>🧑‍💻</span>
            )}
          </div>
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold text-foreground flex items-center gap-1">
          {name}
        </h3>
        <p className="text-sm font-medium text-primary mt-1 mb-2">
          {role} <span className="text-muted-foreground mx-1">@</span> <span className="text-muted-foreground">{company}</span>
        </p>
        
        <p className="text-sm text-foreground/80 mt-2 mb-4 leading-relaxed line-clamp-2">
          "{bio}"
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-auto mb-6">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs font-medium bg-muted px-2 py-1 rounded-md text-muted-foreground">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md text-muted-foreground">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/apply?mentor=${id}`} className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 transition-colors py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group-hover:border-transparent mt-auto">
          <MessageCircleHeart size={16} />
          재능기부 멘토링 신청
        </Link>
      </div>
    </div>
  );
}
