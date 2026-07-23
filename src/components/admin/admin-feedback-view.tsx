import { FeedbackPreviewList } from "@/components/admin/feedback-preview-list";
import { listAdminFeedback } from "@/lib/admin/admin-data";

export function AdminFeedbackView() {
  const feedback = listAdminFeedback();
  return (
    <section className="admin-panel-section" aria-labelledby="admin-feedback-title">
      <div className="admin-section-head">
        <div>
          <p className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-[#c9b596]">Opiniones</p>
          <h3 id="admin-feedback-title" className="mt-0.5 text-base font-semibold">Feedback recibido</h3>
        </div>
        <p className="text-right text-xs text-[#8f877d]">Sin integraciones</p>
      </div>
      <FeedbackPreviewList feedback={feedback} />
    </section>
  );
}
