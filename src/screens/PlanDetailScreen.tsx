import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMockData, COVERAGE_LABELS, type Coverage } from '../data/useMockData';
import { usePrototypeStore } from '../store/usePrototypeStore';
import s from './PlanDetailScreen.module.css';

function categoryLabel(cat: string) {
  if (cat === 'individual') return 'Individual';
  if (cat === 'family') return 'Família';
  if (cat === 'corporate') return 'Empresarial';
  return cat;
}

function categoryBadgeClass(cat: string) {
  if (cat === 'family') return s.badgeAmber;
  if (cat === 'corporate') return s.badgeGreen;
  return s.badgeBlue;
}

const COVERAGE_KEYS = Object.keys(COVERAGE_LABELS) as (keyof Coverage)[];

export default function PlanDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = useMockData();
  const { selectedPlanIds, togglePlanSelection, setContractPlanId } = usePrototypeStore();
  const [toast, setToast] = useState(false);

  const plan     = data?.plans.find(p => p.id === id);
  const operator = data?.operators.find(op => op.id === plan?.operatorId);
  const isSelected = plan ? selectedPlanIds.includes(plan.id) : false;

  if (!data) {
    return (
      <div className={s.page}>
        <p className={s.loading}>Carregando…</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className={s.page}>
        <p className={s.notFound}>Plano não encontrado.</p>
      </div>
    );
  }

  const priceFormatted = plan.monthlyPrice.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function handleToggleCompare() {
    if (!isSelected && selectedPlanIds.length >= 4) {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      return;
    }
    togglePlanSelection(plan!.id);
  }

  function handleContract() {
    setContractPlanId(plan!.id);
    navigate('/contract');
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
        {/* Breadcrumb */}
        <div className={s.breadcrumb}>
          <button className={s.breadcrumbLink} onClick={() => navigate('/plans')}>
            Planos
          </button>
          <span className={s.breadcrumbSep}>›</span>
          <span>{plan.name}</span>
        </div>

        {/* ── Header + Coverage table ── */}
        <div className={s.card}>
          <div className={s.header}>
            <div className={s.logo}>{operator?.name?.[0] ?? '?'}</div>

            <div className={s.meta}>
              <h1 className={s.planName}>{plan.name}</h1>
              <p className={s.operatorCat}>
                {operator?.name} · {categoryLabel(plan.category)}
              </p>
              <div className={s.metaRow}>
                <span className={`${s.badge} ${categoryBadgeClass(plan.category)}`}>
                  {categoryLabel(plan.category)}
                </span>
                <span className={s.ansCode}>ANS: {plan.ansCode}</span>
              </div>
            </div>

            <div className={s.priceBlock}>
              <div className={s.priceValue}>R$ {priceFormatted}</div>
              <span className={s.priceUnit}>/mês</span>
            </div>
          </div>

          {/* Coverage table */}
          <table className={s.table}>
            <tbody>
              <tr className={s.sectionHeaderRow}>
                <th colSpan={2}>Cobertura</th>
              </tr>

              {COVERAGE_KEYS.map(key => (
                <tr key={key} className={s.tableRow}>
                  <td className={s.tdLabel}>{COVERAGE_LABELS[key]}</td>
                  <td className={s.tdValue}>
                    {plan.coverage[key]
                      ? <span className={s.coverageYes}>✓</span>
                      : <span className={s.coverageNo}>✗</span>
                    }
                  </td>
                </tr>
              ))}

              <tr className={s.sectionHeaderRow}>
                <th colSpan={2}>Valores</th>
              </tr>

              <tr className={s.tableRow}>
                <td className={s.tdLabel}>Coparticipação</td>
                <td className={s.tdValue}>
                  <span className={plan.coparticipation ? s.coverageNo : s.coverageYes}>
                    {plan.coparticipation ? 'Sim' : 'Não'}
                  </span>
                </td>
              </tr>

              <tr className={s.tableRow}>
                <td className={s.tdLabel}>Nº de prestadores na rede</td>
                <td className={s.tdValue}>
                  <span className={s.neutralValue}>
                    {plan.accreditedNetworkCount.toLocaleString('pt-BR')}
                  </span>
                </td>
              </tr>

              <tr className={s.tableRow}>
                <td className={s.tdLabel}>Preço mensal</td>
                <td className={s.tdValue}>
                  <span className={s.neutralValue}>R$ {priceFormatted}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Highlights ── */}
        {plan.highlights.length > 0 && (
          <div className={s.card}>
            <h2 className={s.sectionTitle}>Destaques</h2>
            <ul className={s.highlightList}>
              {plan.highlights.map(h => (
                <li key={h} className={s.highlightItem}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Network ── */}
        <div className={s.card}>
          <div className={s.networkRow}>
            <div>
              <p className={s.networkTitle}>Rede credenciada</p>
              <p className={s.networkSub}>
                {plan.accreditedNetworkCount.toLocaleString('pt-BR')} prestadores disponíveis
              </p>
            </div>
            <button
              className={s.btnNetwork}
              onClick={() => navigate(`/plans/${plan.id}/network`)}
            >
              Ver {plan.accreditedNetworkCount.toLocaleString('pt-BR')} prestadores próximos →
            </button>
          </div>
        </div>
      </div>

      {/* ── Sticky footer ── */}
      <footer className={s.footer}>
        <button
          className={`${s.btnSecondary} ${isSelected ? s.btnSecondarySelected : ''}`}
          onClick={handleToggleCompare}
        >
          {isSelected ? '✓ Na comparação' : 'Adicionar à comparação'}
        </button>
        <button className={s.btnPrimary} onClick={handleContract}>
          Quero contratar
        </button>
      </footer>

      {/* Toast */}
      {toast && (
        <div className={s.toast} role="alert">
          Máximo de 4 planos para comparação
        </div>
      )}
    </div>
  );
}
