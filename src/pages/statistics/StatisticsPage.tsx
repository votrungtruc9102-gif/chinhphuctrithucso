import React, { useState, useMemo } from 'react';
import {
  BarChart2,
  Trophy,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  Target,
  Flame,
  Calendar,
  Layers,
  User,
  LogIn,
  Gamepad2,
  History,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sword,
  CheckCircle2
} from 'lucide-react';
import { UserExamResult, StudentProfile, GradeLevel, SubjectMeta, GameRewardRecord } from '../../types';
import { SmartBackButton } from '../../components/common/SmartBackButton';
import { storageService } from '../../services/storageService';
import { studentAccountService } from '../../services/studentAccountService';

interface StatisticsPageProps {
  examResults: UserExamResult[];
  profile: StudentProfile;
  grade: GradeLevel;
  subject: SubjectMeta;
  onOpenDrawer: () => void;
  onResetData: () => void;
  onBackToHome?: () => void;
  onOpenLogin?: () => void;
}

export const StatisticsPage: React.FC<StatisticsPageProps> = ({
  examResults,
  profile,
  grade,
  subject,
  onOpenDrawer,
  onResetData,
  onBackToHome,
  onOpenLogin
}) => {
  const activeStudent = studentAccountService.getActiveStudent();
  const accountIdentifier = activeStudent?.uid || activeStudent?.accountCode || profile.avatarSeed;
  const isStudentLoggedIn = Boolean(activeStudent && activeStudent.uid);

  // Tab switch between Exam Stats & Game Reward Stats
  const [activeView, setActiveView] = useState<'overview' | 'game_rewards' | 'tests'>('overview');

  // Load real game reward records strictly scoped by Account ID
  const rewardRecords: GameRewardRecord[] = useMemo(() => {
    return storageService.getGameRewardHistory(accountIdentifier);
  }, [accountIdentifier, profile.totalPoints]);

  // Aggregate Game Statistics
  const totalGamesParticipated = useMemo(() => {
    const fromRecords = rewardRecords.length;
    const fromStudentHistory = activeStudent?.gameHistory?.length || 0;
    return Math.max(fromRecords, fromStudentHistory);
  }, [rewardRecords, activeStudent]);

  const totalChallengesCompleted = useMemo(() => {
    const bossCount = activeStudent?.bossDefeatedCount || 0;
    const arenaStage = Math.max(0, (activeStudent?.maxUnlockedArenaStage || 1) - 1);
    const regularChallenges = rewardRecords.filter(r =>
      r.activity.toLowerCase().includes('hoàn thành') ||
      r.activity.toLowerCase().includes('chính xác') ||
      r.activity.toLowerCase().includes('bứt tốc')
    ).length;
    return bossCount + arenaStage + regularChallenges;
  }, [activeStudent, rewardRecords]);

  const totalVictories = useMemo(() => {
    const studentWins = activeStudent?.wins || 0;
    const victoryRecords = rewardRecords.filter(r =>
      r.activity.toLowerCase().includes('chiến thắng') ||
      r.activity.toLowerCase().includes('thắng')
    ).length;
    return Math.max(studentWins, victoryRecords);
  }, [activeStudent, rewardRecords]);

  // Points distribution by game category
  const pointsByGameCategory = useMemo(() => {
    const map: Record<string, number> = {};
    rewardRecords.forEach(r => {
      const g = r.gameName || 'Khác';
      map[g] = (map[g] || 0) + r.points;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [rewardRecords]);

  // Exam Statistics
  const totalTests = examResults.length;
  const totalCorrect = examResults.reduce((acc, curr) => acc + curr.correctCount, 0);
  const totalQuestionsAnswered = examResults.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const accuracyRate = totalQuestionsAnswered > 0
    ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
    : 0;

  const averageScore = totalTests > 0
    ? Math.round((examResults.reduce((acc, curr) => acc + curr.score, 0) / totalTests) * 10) / 10
    : 0;

  const testsNeedingReview = examResults.filter(r => r.score < 6.5);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {onBackToHome && (
              <SmartBackButton
                onClick={onBackToHome}
                label="Quay lại"
                contextHint="Trang chủ"
                size="sm"
                className="shadow-xs mr-1"
              />
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              Hồ sơ học tập học sinh
            </span>
            <span className="text-xs text-slate-400 font-medium">• Năm học 2026–2027</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
            Thống kê kết quả & Tiến độ học tập
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            {profile.name || activeStudent?.displayName
              ? `Dữ liệu đồng bộ từ các lần làm bài kiểm tra và thử thách trò chơi thực tế của học sinh ${profile.name || activeStudent?.displayName} (${profile.className || activeStudent?.className}).`
              : 'Dữ liệu tổng hợp từ các lần làm bài kiểm tra trắc nghiệm và thử thách trò chơi học tập trên thiết bị.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 flex items-center gap-2 text-xs font-bold shadow-xs">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-400 shrink-0" />
            <div>
              <span className="block text-[10px] text-amber-700 font-bold uppercase">Tổng điểm tích lũy</span>
              <strong className="text-lg text-orange-600 font-mono font-black">{profile.totalPoints}</strong> điểm
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Tabs for Statistics */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeView === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Tổng Quan Chung</span>
        </button>

        <button
          onClick={() => setActiveView('game_rewards')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeView === 'game_rewards'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Điểm Thưởng Trò Chơi ({rewardRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveView('tests')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeView === 'tests'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Bài Thi Trắc Nghiệm ({examResults.length})</span>
        </button>
      </div>

      {/* 3. KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng điểm tích lũy */}
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Tổng điểm tích lũy</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500" />
            </span>
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono">{profile.totalPoints}</div>
          <p className="text-[11px] text-slate-500">Đồng bộ tất cả trò chơi & bài thi</p>
        </div>

        {/* Card 2: Tổng trò chơi tham gia */}
        <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Trò chơi đã tham gia</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-[#172B4D]">{totalGamesParticipated}</div>
          <p className="text-[11px] text-slate-500">Lượt thử thách ghi nhận thực tế</p>
        </div>

        {/* Card 3: Thử thách đã hoàn thành */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Thử thách hoàn thành</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-600">{totalChallengesCompleted}</div>
          <p className="text-[11px] text-slate-500">Ải Boss, Đấu trường & 6 Môn THCS</p>
        </div>

        {/* Card 4: Tổng số chiến thắng */}
        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Tổng số chiến thắng</span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-purple-600">{totalVictories}</div>
          <p className="text-[11px] text-slate-500">PVP 1v1 & Đấu trường tri thức</p>
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Active View */}
        <div className="lg:col-span-8 space-y-6">

          {/* VIEW: GAME REWARDS HISTORY TABLE */}
          {(activeView === 'game_rewards' || activeView === 'overview') && (
            <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                    <History className="w-5 h-5 text-amber-500" />
                    Lịch sử tích lũy điểm thưởng trò chơi
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Giao dịch điểm thưởng gắn liền với Account ID của từng học sinh
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {rewardRecords.length} giao dịch hợp lệ
                </span>
              </div>

              {rewardRecords.length > 0 ? (
                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-extrabold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-3.5">Tên trò chơi</th>
                        <th className="py-3 px-3.5">Hoạt động</th>
                        <th className="py-3 px-3.5 text-center">Điểm thưởng</th>
                        <th className="py-3 px-3.5">Thời gian</th>
                        <th className="py-3 px-3.5">Tài khoản</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {rewardRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                              <Gamepad2 className="w-3.5 h-3.5 text-blue-600" />
                              {rec.gameName}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 text-slate-700 max-w-[220px] truncate" title={rec.activity}>
                            {rec.activity}
                          </td>
                          <td className="py-3 px-3.5 text-center font-black text-amber-600 font-mono whitespace-nowrap">
                            +{rec.points}
                          </td>
                          <td className="py-3 px-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                            {new Date(rec.timestamp).toLocaleDateString('vi-VN')} {new Date(rec.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3 px-3.5 text-slate-600 text-[11px] whitespace-nowrap">
                            <span className="font-mono font-bold text-slate-800">{rec.accountId}</span>
                            {rec.accountName && <span className="block text-[10px] text-slate-400">{rec.accountName}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
                  <Gamepad2 className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="font-bold text-slate-700">Chưa có lịch sử điểm thưởng nào được ghi nhận</p>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    Hãy tham gia các trò chơi học tập như Thử tài kiến thức, Đấu trường trí tuệ, Đấu Boss, Thể dục trí tuệ để nhận điểm thưởng thật vào tài khoản nhé!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW: POINTS TIMELINE & CATEGORY BREAKDOWN */}
          {(activeView === 'game_rewards' || activeView === 'overview') && pointsByGameCategory.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Phân bổ điểm thưởng theo từng tựa game
              </h3>

              <div className="space-y-3">
                {pointsByGameCategory.map(([game, pts]) => {
                  const pct = profile.totalPoints > 0 ? Math.round((pts / profile.totalPoints) * 100) : 0;
                  return (
                    <div key={game} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <Gamepad2 className="w-3.5 h-3.5 text-blue-500" />
                          {game}
                        </span>
                        <span className="font-mono text-amber-600">
                          +{pts} điểm ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW: EXAM TEST HISTORY */}
          {(activeView === 'tests' || activeView === 'overview') && (
            <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-blue-600" />
                  Lịch sử làm bài thi trắc nghiệm
                </h3>
                <span className="text-xs text-slate-500 font-medium">{examResults.length} bài đã làm</span>
              </div>

              {examResults.length > 0 ? (
                <div className="space-y-3">
                  {examResults.map((result, idx) => (
                    <div
                      key={result.id || idx}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                            Lớp {result.grade}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-[#172B4D] truncate">
                            {result.examTitle}
                          </h4>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(result.completedAt).toLocaleDateString('vi-VN')} {new Date(result.completedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span>•</span>
                          <span>Đúng: <strong>{result.correctCount}/{result.totalQuestions}</strong> câu</span>
                          <span>•</span>
                          <span>Thời gian: {Math.round(result.timeSpentSeconds)}s</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div
                          className={`text-xl font-black ${
                            result.score >= 8
                              ? 'text-emerald-600'
                              : result.score >= 5
                              ? 'text-blue-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {result.score.toFixed(1)}
                          <span className="text-xs text-slate-400 font-normal"> / 10</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {result.score >= 8 ? 'Xuất sắc' : result.score >= 5 ? 'Đạt' : 'Cần ôn lại'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                  Chưa có dữ liệu bài làm. Hãy vào mục "Luyện tập" để bắt đầu thử sức nhé!
                </div>
              )}
            </div>
          )}

          {/* Topics Needing Review */}
          {testsNeedingReview.length > 0 && (
            <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Chủ đề gợi ý cần ôn tập lại
              </div>
              <p className="text-xs text-slate-600">
                Các bài kiểm tra dưới 6.5 điểm em nên vào lại "Kho kiến thức" để đọc lại lý thuyết và làm lại bài:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {testsNeedingReview.map(item => (
                  <div key={item.id} className="p-3 rounded-xl bg-white border border-amber-200 text-xs">
                    <strong className="text-slate-800">{item.examTitle}</strong>
                    <div className="text-red-600 font-semibold mt-1">
                      Điểm lần trước: {item.score} điểm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Student Profile & Badges */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Student Profile Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4 text-center">
            {profile.name || activeStudent?.displayName ? (
              <>
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] text-white flex items-center justify-center text-2xl font-black mx-auto shadow-md shadow-blue-500/20">
                  {(profile.name || activeStudent?.displayName || 'HS')
                    .split(' ')
                    .filter(Boolean)
                    .map(w => w[0])
                    .slice(-2)
                    .join('')
                    .toUpperCase() || 'HS'}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#172B4D]">
                    {profile.name || activeStudent?.displayName}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Học sinh {profile.className || activeStudent?.className ? `Lớp ${profile.className || activeStudent?.className}` : `Khối ${grade}`}
                  </p>
                  {activeStudent?.accountCode && (
                    <span className="mt-1 inline-block text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Mã: {activeStudent.accountCode}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-3 py-2">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center text-2xl font-black mx-auto border border-slate-200">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#172B4D]">Chưa đăng nhập</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Đăng nhập để lưu tiến độ và tích lũy điểm cá nhân
                  </p>
                </div>
                {onOpenLogin && (
                  <button
                    onClick={onOpenLogin}
                    className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Đăng nhập ngay</span>
                  </button>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-left">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Chuỗi chăm chỉ</span>
                <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                  🔥 {profile.streakDays} ngày
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Khối lớp học</span>
                <span className="text-xs font-bold text-blue-600">
                  Khối {grade}
                </span>
              </div>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[#172B4D] flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Bộ sưu tập Huy hiệu danh dự
            </h3>

            <div className="space-y-2">
              {profile.badges.length > 0 ? (
                profile.badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-gradient-to-r from-amber-50/70 to-orange-50/50 border border-amber-200/80 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                      🎖️
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-amber-950">{badge}</h5>
                      <span className="text-[10px] text-amber-700">Đạt thành tích học tập tốt</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 text-xs">
                  Chưa mở khóa huy hiệu. Hoàn thành các thử thách để nhận huy hiệu danh dự!
                </div>
              )}
            </div>
          </div>

          {/* Reset Device Storage Button */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <span className="text-[11px] text-slate-500 block">
              Dữ liệu được lưu trữ trực tiếp và liên kết với tài khoản học sinh.
            </span>
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn đặt lại dữ liệu mẫu ban đầu?')) {
                  onResetData();
                }
              }}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 underline cursor-pointer"
            >
              Đặt lại dữ liệu mẫu hệ thống
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
