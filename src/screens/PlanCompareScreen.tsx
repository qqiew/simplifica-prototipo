import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData, COVERAGE_LABELS, type Coverage } from '../data/useMockData';
import { usePrototypeStore } from '../store/usePrototypeStore';
import s from './PlanCompareScreen.module.css';

const COVERAGE_KEYS = Object.keys(COVERAGE_LABELS) as (keyof Coverage)[];

export default function PlanCompareScreen() {
  const navigate = useNavigate();
  const data = useMockData();
  const { selectedPlanIds, togglePlanSelection, setContractPlanId } = usePrototypeStore();

  const plans = selectedPlanIds
    .map(id => data?.plans.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  useEffect(() => {
    if (data && plans.length < 2) {
      navigate('/plans');
    }
  }, [data, plans.length, navigate]);

  if (!data || plans.length < 2) {
    return (
      <div className={s.page}>
        <p className={s.loading}>Carregando…</p>
      </div>
    );
  }

  const hasAddCol = plans.length < 4;
  const totalCols = 1 + plans.length + (hasAddCol ? 1 : 0);

  function handleContract(planId: string) {
    setContractPlanId(planId);
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
          <span>Comparação</span>
        </div>

        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.emptyCorner} />

                {plans.map((plan, i) => {
                  const operator = data.operators.find(op => op.id === plan.operatorId);
                  const isFeatured = i === 0;
                  const priceFormatted = plan.monthlyPrice.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  return (
                    <th
                      key={plan.id}
                      className={`${s.planHeader} ${isFeatured ? s.planHeaderFeatured : ''}`}
                    >
                      <div className={s.headerLogo}>
                        {operator?.name?.[0] ?? '?'}
                      </div>
                      <p className={s.headerName}>{plan.name}</p>
                      <p className={s.headerPrice}>
                        R$ {priceFormatted}
                        <span className={s.headerPriceUnit}>/mês</span>
                      </p>
                      <button
                        className={s.removeBtn}
                        onClick={() => togglePlanSelection(plan.id)}
                      >
                        Remover
                      </button>
                    </th>
                  );
                })}

                {hasAddCol && (
                  <th className={s.addHeader}>
                    <button
                      className={s.addBtn}
                      onClick={() => navigate('/plans')}
                    >
                      <span className={s.addIcon}>+</span>
                      Adicionar plano
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {/* Coverage section */}
              <tr className={s.sectionRow}>
                <td colSpan={totalCols}>Cobertura</td>
              </tr>

              {COVERAGE_KEYS.map((key, i) => (
                <tr key={key} className={i % 2 === 0 ? s.rowEven : s.rowOdd}>
                  <td className={`${s.labelCell} ${s.labelCol}`}>
                    {COVERAGE_LABELS[key]}
                  </td>
                  {plans.map(plan => (
                    <td key={plan.id} className={s.valueCell}>
                      {plan.coverage[key]
                        ? <span className={s.coverageYes}>✓</span>
                        : <span className={s.coverageNo}>✗</span>
                      }
                    </td>
                  ))}
                  {hasAddCol && <td className={s.addCell} />}
                </tr>
              ))}

              {/* Valores section */}
              <tr className={s.sectionRow}>
                <td colSpan={totalCols}>Valores</td>
              </tr>

              {/* Coparticipação */}
              <tr className={(COVERAGE_KEYS.length) % 2 === 0 ? s.rowEven : s.rowOdd}>
                <td className={`${s.labelCell} ${s.labelCol}`}>Coparticipação</td>
                {plans.map(plan => (
                  <td key={plan.id} className={s.valueCell}>
                    <span className={plan.coparticipation ? s.coverageNo : s.coverageYes}>
                      {plan.coparticipation ? 'Sim' : 'Não'}
                    </span>
                  </td>
                ))}
                {hasAddCol && <td className={s.addCell} />}
              </tr>

              {/* Nº de prestadores */}
              <tr className={(COVERAGE_KEYS.length + 1) % 2 === 0 ? s.rowEven : s.rowOdd}>
                <td className={`${s.labelCell} ${s.labelCol}`}>Nº de prestadores</td>
                {plans.map(plan => (
                  <td key={plan.id} className={s.valueCell}>
                    <span className={s.neutralVal}>
                      {plan.accreditedNetworkCount.toLocaleString('pt-BR')}
                    </span>
                  </td>
                ))}
                {hasAddCol && <td className={s.addCell} />}
              </tr>

              {/* Preço mensal */}
              <tr className={(COVERAGE_KEYS.length + 2) % 2 === 0 ? s.rowEven : s.rowOdd}>
                <td className={`${s.labelCell} ${s.labelCol}`}>Preço mensal</td>
                {plans.map(plan => (
                  <td key={plan.id} className={s.valueCell}>
                    <span className={s.priceVal}>
                      R$ {plan.monthlyPrice.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                ))}
                {hasAddCol && <td className={s.addCell} />}
              </tr>

              {/* CTA row */}
              <tr className={s.ctaRow}>
                <td className={s.ctaLabelCell} />
                {plans.map((plan, i) => (
                  <td key={plan.id} className={s.ctaCell}>
                    <button
                      className={i === 0 ? s.btnPrimary : s.btnSecondary}
                      onClick={() => handleContract(plan.id)}
                    >
                      Quero contratar
                    </button>
                  </td>
                ))}
                {hasAddCol && <td className={s.ctaAddCell} />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
