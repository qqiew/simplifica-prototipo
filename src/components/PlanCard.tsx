import type { Plan, Operator } from '../data/useMockData';
import s from './PlanCard.module.css';

interface Props {
  plan: Plan;
  operator: Operator | undefined;
  selected: boolean;
  onToggleCompare: () => void;
  onDetail: () => void;
}

function categoryLabel(cat: string) {
  if (cat === 'individual') return 'Individual';
  if (cat === 'family') return 'Família';
  if (cat === 'corporate') return 'Empresarial';
  return cat;
}

function categoryBadgeClass(cat: string, styles: typeof s) {
  if (cat === 'family') return styles.badgeAmber;
  if (cat === 'corporate') return styles.badgeGreen;
  return styles.badgeBlue;
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PlanCard({ plan, operator, selected, onToggleCompare, onDetail }: Props) {
  return (
    <div className={s.card}>
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          {operator?.name?.[0] ?? '?'}
        </div>
        <div className={s.meta}>
          <p className={s.planName}>{plan.name}</p>
          <p className={s.operatorCat}>
            {operator?.name} · {categoryLabel(plan.category)}
          </p>
          <span className={`${s.badge} ${categoryBadgeClass(plan.category, s)}`}>
            {categoryLabel(plan.category)}
          </span>
        </div>
        <div className={s.priceBlock}>
          <div className={s.priceValue}>R$ {formatPrice(plan.monthlyPrice)}</div>
          <span className={s.priceUnit}>/mês</span>
        </div>
      </div>

      {/* Highlights */}
      {plan.highlights.length > 0 && (
        <div className={s.highlights}>
          {plan.highlights.slice(0, 3).map(h => (
            <div key={h} className={s.highlight}>
              <span className={s.check}>✓</span>
              {h}
            </div>
          ))}
        </div>
      )}

      {/* Network */}
      <div className={s.network}>
        <span className={s.networkBadge}>
          Rede: {plan.accreditedNetworkCount.toLocaleString('pt-BR')} prestadores
        </span>
      </div>

      {/* Actions */}
      <div className={s.actions}>
        <button className={s.btnDetail} onClick={onDetail}>
          Ver detalhes
        </button>
        <button
          className={`${s.btnCompare} ${selected ? s.btnCompareSelected : ''}`}
          onClick={onToggleCompare}
        >
          {selected ? '✓ Adicionado' : '+ Comparar'}
        </button>
      </div>
    </div>
  );
}
