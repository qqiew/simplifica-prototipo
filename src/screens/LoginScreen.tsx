import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './LoginScreen.module.css';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  function showForgotToast() {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <div className={s.split}>
      {/* ── Left panel ── */}
      <div className={s.left}>
        <div className={s.logoIcon}>S</div>
        <p className={s.wordmark}>Simplifica</p>
        <p className={s.tagline}>Seu plano de saúde ideal</p>

        <div className={s.mockCard}>
          <div className={s.mockRow}>
            <div className={s.mockAvatar} />
            <div className={s.mockLines}>
              <div className={`${s.mockLine} ${s.medium}`} />
              <div className={`${s.mockLine} ${s.short}`} />
            </div>
            <div className={s.mockLines} style={{ alignItems: 'flex-end', flex: 'unset' }}>
              <div className={`${s.mockLine} ${s.price}`} />
            </div>
          </div>
          <div className={s.mockDivider} />
          <div className={s.mockTags}>
            <div className={s.mockTag} />
            <div className={s.mockTag} />
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className={s.right}>
        <div className={s.card}>
          {/* Tab switcher */}
          <div className={s.tabs}>
            <button className={`${s.tab} ${s.active}`}>Entrar</button>
            <button className={s.tab} onClick={() => navigate('/register')}>
              Cadastrar
            </button>
          </div>

          {/* Form */}
          <div className={s.form}>
            <label className={s.label}>
              E-mail
              <input
                className={s.input}
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
              />
            </label>

            <label className={s.label}>
              Senha
              <input
                className={s.input}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            <div className={s.forgotRow}>
              <button className={s.forgotLink} onClick={showForgotToast}>
                Esqueci minha senha
              </button>
            </div>

            <button className={s.btnPrimary} onClick={() => navigate('/plans')}>
              Entrar
            </button>
          </div>

          {/* Divider */}
          <div className={s.divider}>
            <div className={s.dividerLine} />
            <span className={s.dividerText}>ou continue com</span>
            <div className={s.dividerLine} />
          </div>

          {/* Social buttons */}
          <div className={s.socialRow}>
            <button className={s.btnSocial}>
              <svg className={s.socialIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className={s.btnSocial}>
              <svg className={s.socialIcon} viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                <path d="M12.47 0c.072 1.01-.29 2.01-.88 2.74-.59.74-1.54 1.32-2.52 1.26-.09-.98.35-2.01.9-2.65C10.55.67 11.56.1 12.47 0ZM15.98 12.1c-.44 1.02-.65 1.48-1.21 2.38-.79 1.28-1.9 2.87-3.27 2.88-1.22.01-1.53-.79-3.18-.78-1.65.01-1.99.8-3.22.79-1.37-.01-2.41-1.44-3.2-2.72C.2 12.1-.33 8.87.98 6.77c.9-1.47 2.32-2.34 3.67-2.34 1.37 0 2.23.79 3.36.79 1.09 0 1.76-.79 3.33-.79 1.2 0 2.47.65 3.37 1.78-2.96 1.62-2.48 5.85.27 5.89Z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Toast */}
          {toast && (
            <div className={s.toast} role="status">
              Funcionalidade em breve
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
