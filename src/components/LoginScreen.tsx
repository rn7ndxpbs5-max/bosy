import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const checkPin = () => {
    const cleanPin = pin.trim().replace(/\s+/g, ' ');
    // Accepts "بحب احمد" or "بحب أحمد"
    if (cleanPin === 'بحب احمد' || cleanPin === 'بحب أحمد') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4b72', '#ff85a2', '#ffd1dc', '#fde047'],
      });
      setErrorMsg('');
      // No localStorage persistence - PIN is strictly required on every refresh/visit
      onLoginSuccess();
    } else {
      setErrorMsg('الرمز خاطئ! اكتبي "بحب احمد" 💕');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkPin();
    }
  };

  return (
    <div id="login-screen" className="fixed inset-0 bg-[linear-gradient(135deg,#ffe6eb_0%,#ffd3dd_50%,#ffb3c6_100%)] z-[9999] flex justify-center items-center p-5">
      <div className="login-card bg-white/85 backdrop-blur-[16px] border-2 border-white/60 rounded-[30px] p-8 sm:p-10 w-full max-w-[440px] text-center shadow-[0_8px_32px_0_rgba(255,75,114,0.18)] login-card-glow transition-all">
        <i
          className="fa-solid fa-heart-circle-bolt text-5xl sm:text-6xl text-[#ff4b72] mb-4 inline-block drop-shadow-xs"
        ></i>
        
        <h1 className="love-title text-3xl sm:text-4xl font-extrabold text-[#ff4b72] mb-2 font-marhey drop-shadow-xs">
          بحب احمد 💖
        </h1>
        <p className="love-subtitle text-base sm:text-lg text-[#7a4253] mb-6 font-semibold">
          ادخلي الرمز السري لفتح برنامجكِ الخاص
        </p>

        <div className="relative mb-5">
          <input
            type={showPassword ? 'text' : 'password'}
            id="pin-code"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            onKeyDown={handleKeyDown}
            className="pin-input w-full p-4 pl-12 border-2 border-[#ff85a2] rounded-[20px] text-lg text-center outline-hidden bg-white/95 text-[#ff4b72] font-bold transition-all focus:border-[#ff4b72] focus:shadow-[0_0_15px_rgba(255,75,114,0.3)] placeholder:text-[#ff85a2]/60 placeholder:font-normal"
            placeholder="اكتبي: بحب احمد"
            autoComplete="off"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff85a2] hover:text-[#ff4b72] transition-colors cursor-pointer"
            title={showPassword ? 'إخفاء الرمز' : 'إظهار الرمز'}
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>

        <button
          onClick={checkPin}
          className="login-btn w-full p-4 bg-gradient-to-r from-[#ff4b72] to-[#ff85a2] border-none rounded-[20px] text-white text-lg font-bold cursor-pointer shadow-[0_6px_20px_rgba(255,75,114,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,75,114,0.4)] transition-all active:scale-98"
        >
          دخول لقلب أحمد 🔑
        </button>

        {errorMsg && (
          <p
            id="error-msg"
            className="text-[#d9534f] mt-3 font-bold text-xs sm:text-sm animate-in fade-in"
          >
            {errorMsg}
          </p>
        )}

        <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-center gap-1.5 text-xs text-[#7a4253]">
          <i className="fa-solid fa-crown text-amber-400"></i>
          <span>البرنامج مُهدى خصيصاً لعيون بسملة</span>
        </div>
      </div>
    </div>
  );
};
