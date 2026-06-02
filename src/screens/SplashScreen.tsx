import { useNavigate } from 'react-router-dom';
import s from './SplashScreen.module.css';

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className={s.screen}>
      <div className={s.logoIcon}>S</div>
      <p className={s.wordmark}>Simplifica</p>
      <div className={s.separator} />
      <p className={s.tagline}>Seu plano de saúde ideal</p>

      <div className={s.actions}>
        <button className={s.btnPrimary} onClick={() => navigate('/login')}>
          Começar
        </button>
        <button className={s.linkSecondary} onClick={() => navigate('/login')}>
          Já tenho conta
        </button>
      </div>
    </div>
  );
}
