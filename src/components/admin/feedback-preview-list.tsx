import { MessageCircleHeart } from "lucide-react";

import { EmptyState } from "@/components/admin/empty-state";
import type { AdminFeedback } from "@/lib/admin/admin-data";

export function FeedbackPreviewList({ feedback }: { feedback: AdminFeedback[] }) {
  if (feedback.length === 0) return <EmptyState icon={MessageCircleHeart} title="Sin feedback recibido" description="Las opiniones simuladas aparecerán acá cuando existan datos mock." />;

  return (
    <div className="admin-data-list" role="table" aria-label="Feedback recibido">
      <div className="admin-data-header admin-feedback-header" role="row">
        <span role="columnheader">Rating</span>
        <span role="columnheader">Comentario</span>
        <span role="columnheader">Origen</span>
      </div>
      {feedback.map((item) => (
        <article key={item.id} className="admin-data-row admin-feedback-row" role="row">
          <p className="text-xs font-semibold text-[#c9b596]" aria-label={`${item.rating} de 5 estrellas`} role="cell">{"★".repeat(item.rating)}<span className="text-white/16">{"★".repeat(5 - item.rating)}</span></p>
          <p className="min-w-0 truncate text-sm text-[#efe7da]" role="cell">“{item.comment}”</p>
          <p className="whitespace-nowrap text-xs text-[#8f877d]" role="cell">{item.table} · {item.receivedAt}</p>
        </article>
      ))}
    </div>
  );
}
