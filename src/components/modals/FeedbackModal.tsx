import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquareQuote, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { GradeLevel, SubjectId } from '../../types';
import { SmartBackButton } from '../common/SmartBackButton';

interface FeedbackItem {
  id: string;
  senderName: string;
  grade: GradeLevel;
  type: 'question' | 'feedback' | 'suggestion';
  content: string;
  timestamp: string;
}

const STORAGE_KEY = 'thcs_myhoa_feedbacks';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: GradeLevel;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  currentGrade
}) => {
  const [senderName, setSenderName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>(currentGrade);
  const [feedbackType, setFeedbackType] = useState<'question' | 'feedback' | 'suggestion'>('question');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFeedbacks(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load feedbacks:', e);
    }
  }, []);

  if (!isOpen) return null;

  const handleSafeClose = () => {
    if (content.trim().length > 0) {
      if (!window.confirm('Em đang soạn dở nội dung góp ý. Em có chắc muốn quay lại và hủy nội dung này không?')) {
        return;
      }
    }
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newFeedback: FeedbackItem = {
      id: 'fb_' + Date.now(),
      senderName: senderName.trim() || 'Học sinh',
      grade,
      type: feedbackType,
      content: content.trim(),
      timestamp: new Date().toLocaleDateString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save feedback:', err);
    }

    setContent('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SmartBackButton
              onClick={handleSafeClose}
              label="Quay lại"
              theme="tech-dark"
              size="sm"
            />
            <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">
                Hồi đáp & Góp ý trực tuyến
              </h3>
              <p className="text-xs text-slate-300">
                Gửi câu hỏi hoặc ý kiến tới thầy cô
              </p>
            </div>
          </div>
          <button
            onClick={handleSafeClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold">Ý kiến đã được gửi thành công!</p>
                <p className="mt-0.5 text-emerald-700">
                  Thầy cô bộ môn sẽ ghi nhận và giải đáp trực tiếp trên hệ thống hoặc qua tiết học.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Họ và tên học sinh / Phụ huynh
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Khối lớp
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white text-xs font-semibold"
                >
                  <option value={6}>Khối Lớp 6</option>
                  <option value={7}>Khối Lớp 7</option>
                  <option value={8}>Khối Lớp 8</option>
                  <option value={9}>Khối Lớp 9</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phân loại phản hồi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'question', label: 'Hỏi bài học' },
                  { id: 'feedback', label: 'Góp ý website' },
                  { id: 'suggestion', label: 'Đề xuất mới' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFeedbackType(t.id as any)}
                    className={`py-2 px-2 rounded-xl text-center font-bold border transition-all cursor-pointer ${
                      feedbackType === t.id
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nội dung câu hỏi hoặc phản hồi <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                placeholder="Nhập chi tiết câu hỏi về bài giảng hoặc góp ý xây dựng bài tập cho thầy cô..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Gửi hồi đáp tới nhà trường
            </button>
          </form>

          {/* School official contact details */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-slate-500 text-[11px]">
            <p className="font-bold text-slate-700">Thông tin liên hệ trực tiếp:</p>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Số điện thoại: <strong>(02703) 891198</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Email: <strong>hotro.hocsinh@vinhlong.edu.vn</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Thị xã Bình Minh, Vĩnh Long</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
