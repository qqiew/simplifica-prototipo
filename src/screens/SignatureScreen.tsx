import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import s from './SignatureScreen.module.css';

const STEPS    = ['Documentos', 'LGPD', 'Assinatura'];
const MOCK_NAME = 'João Silva';

export default function SignatureScreen() {
  const navigate     = useNavigate();
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* Sync canvas bitmap resolution to its CSS display size */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  /* ── Drawing helpers ── */
  function getXY(
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): { x: number; y: number } {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left,
             y: (e as React.MouseEvent).clientY - rect.top };
  }

  function applyStrokeStyle(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#1A1A2E';
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
  }

  function beginStroke(x: number, y: number) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (!hasDrawn) setHasDrawn(true);
  }

  function continueStroke(x: number, y: number) {
    if (!isDrawingRef.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    applyStrokeStyle(ctx);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function endStroke() {
    isDrawingRef.current = false;
  }

  /* ── Controls ── */
  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    /* Reset transform, clear, re-apply dpr scale */
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);
    setHasDrawn(false);
  }

  function useFullName() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    clearCanvas();
    const cssHeight = canvas.getBoundingClientRect().height;
    ctx.font         = '44px cursive';
    ctx.fillStyle    = '#1A1A2E';
    ctx.textBaseline = 'middle';
    ctx.fillText(MOCK_NAME, 24, cssHeight / 2);
    setHasDrawn(true);
  }

  function handleSubmit() {
    setIsLoading(true);
    setTimeout(() => navigate('/contract/status'), 2000);
  }

  return (
    <div className={s.page}>
      {/* Navbar */}
      <nav className={s.navbar}>
        <button className={s.brandPill} onClick={() => navigate('/')}>
          Simplifica
        </button>
      </nav>

      <div className={s.container}>
        {/* Step indicator */}
        <div className={s.stepWrap}>
          <StepIndicator steps={STEPS} current={3} />
        </div>

        {/* Card */}
        <div className={s.card}>
          <h1 className={s.title}>Assine sua proposta</h1>
          <p className={s.subtitle}>
            Desenhe sua assinatura no campo abaixo ou clique em "Usar nome completo"
          </p>

          {/* Canvas wrapper */}
          <div className={s.canvasWrap}>
            <canvas
              ref={canvasRef}
              className={s.canvas}
              onMouseDown={e => { const { x, y } = getXY(e); beginStroke(x, y); }}
              onMouseMove={e => { const { x, y } = getXY(e); continueStroke(x, y); }}
              onMouseUp={endStroke}
              onMouseLeave={endStroke}
              onTouchStart={e => { const { x, y } = getXY(e); beginStroke(x, y); }}
              onTouchMove={e => { const { x, y } = getXY(e); continueStroke(x, y); }}
              onTouchEnd={endStroke}
            />
            {!hasDrawn && (
              <p className={s.canvasHint}>Assine dentro do campo acima</p>
            )}
          </div>

          {/* Canvas controls */}
          <div className={s.canvasActions}>
            <button className={s.btnGhost} onClick={clearCanvas}>
              Limpar
            </button>
            <button className={s.btnGhost} onClick={useFullName}>
              Usar nome completo
            </button>
          </div>

          {/* Submit */}
          <button
            className={s.btnPrimary}
            disabled={!hasDrawn || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <span className={s.loadingRow}>
                <span className={s.spinner} />
                Enviando proposta…
              </span>
            ) : (
              'Assinar e enviar proposta'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
