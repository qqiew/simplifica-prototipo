import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../data/useMockData';
import { usePrototypeStore } from '../store/usePrototypeStore';
import s from './ContractStartScreen.module.css';

function categoryLabel(cat: string) {
  if (cat === 'individual') return 'Individual';
  if (cat === 'family')     return 'Família';
  if (cat === 'corporate')  return 'Empresarial';
  return cat;
}

const NEXT_STEPS = [
  {
    label: 'Envio de documentos',
    description: 'Envie RG/CNH, CPF e comprovante de residência para validar seu cadastro.',
  },
  {
    label: 'Assinatura digital',
    description: 'Assine sua proposta eletronicamente — sem papel, sem cartório.',
  },
  {
    label: 'Início da cobertura',
    description: 'Após aprovação da operadora, sua cobertura começa em até 5 dias úteis.',
  },
];

export default function ContractStartScreen() {
  const navigate = useNavigate();
  const data = useMockData();
  const { contractPlanId } = usePrototypeStore();

  useEffect(() => {
    if (data && !contractPlanId) {
      navigate('/plans');
    }
  }, [data, contractPlanId, navigate]);

  if (!data || !contractPlanId) {
    return (
      <div className={s.page}>
        <p className={s.loading}>Carregando…</p>
      </div>
    );
  }

  const plan     = data.plans.find(p => p.id === contractPlanId);
  const operator = data.operators.find(op => op.id === plan?.operatorId);

  if (!plan) {
    return (
      <div className={s.page}>
        <p className={s.loading}>Plano não encontrado.</p>
      </div>
    );
  }

  const priceFormatted = plan.monthlyPrice.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={s.page}>
      {/* Navbar */}
      <nav className={s.navbar}>
        <button className={s.brandPill} onClick={() => navigate('/')}>
          Simplifica
        </button>
      </nav>

      <div className={s.container}>
        {/* Page title */}
        <h1 className={s.pageTitle}>Você escolheu:</h1>

        {/* Plan summary card */}
        <div className={s.summaryCard}>
          <div className={s.summaryHeader}>
            <div className={s.planLogo}>{operator?.name?.[0] ?? '?'}</div>

            <div className={s.planMeta}>
              <p className={s.planName}>{plan.name}</p>
              <p className={s.planSub}>
                {operator?.name} · {categoryLabel(plan.category)}
              </p>
              <div className={s.planTagRow}>
                <span className={s.badgeAmber}>Em análise</span>
                <span className={s.proposalCode}>Proposta #2025</span>
              </div>
            </div>

            <div className={s.priceBlock}>
              <p className={s.priceValue}>R$ {priceFormatted}</p>
              <span className={s.priceUnit}>/mês</span>
            </div>
          </div>

          <div className={s.divider} />

          <div className={s.paymentRow}>
            <span className={s.paymentIcon}>📅</span>
            <span className={s.paymentText}>Vencimento: dia 10 do próximo mês</span>
          </div>
        </div>

        {/* What happens next */}
        <div className={s.nextSection}>
          <h2 className={s.nextTitle}>O que acontece a seguir</h2>

          <div className={s.stepList}>
            {NEXT_STEPS.map((step, i) => (
              <div key={i} className={s.stepRow}>
                <div className={s.stepCircle}>{i + 1}</div>
                <div className={s.stepContent}>
                  <p className={s.stepLabel}>{step.label}</p>
                  <p className={s.stepDesc}>{step.description}</p>
                </div>
                {i < NEXT_STEPS.length - 1 && <div className={s.stepConnector} />}
              </div>
            ))}
          </div>
        </div>

        {/* Button row */}
        <div className={s.actions}>
          <button className={s.btnGhost} onClick={() => navigate('/plans')}>
            Escolher outro plano
          </button>
          <button className={s.btnPrimary} onClick={() => navigate('/contract/documents')}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
