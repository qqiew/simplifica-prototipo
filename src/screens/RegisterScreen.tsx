import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RegisterScreen.module.css';

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [lgpd, setLgpd] = useState(false);

  return (
    <div className={s.page}>
      <div className={s.card}>
        {/* Tab switcher */}
        <div className={s.tabs}>
          <button className={s.tab} onClick={() => navigate('/login')}>
            Entrar
          </button>
          <button className={`${s.tab} ${s.active}`}>Cadastrar</button>
        </div>

        {/* Form */}
        <div className={s.form}>
          <label className={s.label}>
            Nome completo
            <input
              className={s.input}
              type="text"
              placeholder="João Silva"
              autoComplete="name"
            />
          </label>

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
            Telefone
            <input
              className={s.input}
              type="tel"
              placeholder="(11) 99999-0000"
              autoComplete="tel"
              inputMode="tel"
            />
          </label>

          <label className={s.label}>
            Data de nascimento
            <input
              className={s.input}
              type="date"
              autoComplete="bday"
            />
          </label>

          {/* LGPD consent */}
          <div className={s.checkRow}>
            <input
              id="lgpd"
              className={s.checkbox}
              type="checkbox"
              checked={lgpd}
              onChange={e => setLgpd(e.target.checked)}
            />
            <label htmlFor="lgpd" className={s.checkLabel}>
              Li e aceito os{' '}
              <a href="#" onClick={e => e.preventDefault()}>
                termos de uso e política de privacidade
              </a>
            </label>
          </div>

          <button
            className={s.btnPrimary}
            onClick={() => navigate('/onboarding')}
          >
            Criar conta
          </button>
        </div>

        <p className={s.footer}>
          Já tem uma conta?{' '}
          <button className={s.footerLink} onClick={() => navigate('/login')}>
            Já tenho conta
          </button>
        </p>
      </div>
    </div>
  );
}
