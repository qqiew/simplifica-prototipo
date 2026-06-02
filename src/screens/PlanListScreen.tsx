import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../data/useMockData';
import { usePrototypeStore } from '../store/usePrototypeStore';
import PlanCard from '../components/PlanCard';
import CompareBar from '../components/CompareBar';
import s from './PlanListScreen.module.css';

type Sort     = 'price' | 'coverage' | 'network';
type Category = 'all' | 'individual' | 'family' | 'corporate';
type PriceRange = 'all' | '<50' | '50-100' | '100-150' | '150+';

const CATEGORIES: [Category, string][] = [
  ['all', 'Todos'],
  ['individual', 'Individual'],
  ['family', 'Família'],
  ['corporate', 'Empresarial'],
];

const PRICE_RANGES: [PriceRange, string][] = [
  ['all', 'Todos'],
  ['<50', 'Até R$50'],
  ['50-100', 'R$50–R$100'],
  ['100-150', 'R$100–R$150'],
  ['150+', 'R$150+'],
];

const SORTS: [Sort, string][] = [
  ['price', 'Menor preço'],
  ['coverage', 'Maior cobertura'],
  ['network', 'Mais prestadores'],
];

export default function PlanListScreen() {
  const navigate = useNavigate();
  const data = useMockData();
  const { selectedPlanIds, togglePlanSelection } = usePrototypeStore();

  const [sort, setSort]             = useState<Sort>('price');
  const [catFilter, setCatFilter]   = useState<Category>('all');
  const [priceFilter, setPriceFilter] = useState<PriceRange>('all');
  const [coverOrtho, setCoverOrtho]     = useState(false);
  const [coverImplants, setCoverImplants] = useState(false);
  const [coverUrgency, setCoverUrgency]   = useState(false);
  const [opFilters, setOpFilters]   = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast]           = useState(false);

  function resetFilters() {
    setCatFilter('all');
    setPriceFilter('all');
    setCoverOrtho(false);
    setCoverImplants(false);
    setCoverUrgency(false);
    setOpFilters([]);
  }

  function toggleOpFilter(opId: string) {
    setOpFilters(prev =>
      prev.includes(opId) ? prev.filter(id => id !== opId) : [...prev, opId]
    );
  }

  function handleToggleCompare(planId: string) {
    if (!selectedPlanIds.includes(planId) && selectedPlanIds.length >= 4) {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      return;
    }
    togglePlanSelection(planId);
  }

  const filteredPlans = useMemo(() => {
    if (!data) return [];
    let result = [...data.plans];

    if (catFilter !== 'all') {
      result = result.filter(p => p.category === catFilter);
    }

    result = result.filter(p => {
      if (priceFilter === '<50')      return p.monthlyPrice < 50;
      if (priceFilter === '50-100')   return p.monthlyPrice >= 50  && p.monthlyPrice < 100;
      if (priceFilter === '100-150')  return p.monthlyPrice >= 100 && p.monthlyPrice < 150;
      if (priceFilter === '150+')     return p.monthlyPrice >= 150;
      return true;
    });

    if (coverOrtho)    result = result.filter(p => p.orthodontics);
    if (coverImplants) result = result.filter(p => p.implants);
    if (coverUrgency)  result = result.filter(p => p.urgencyEmergency);

    if (opFilters.length > 0) {
      result = result.filter(p => opFilters.includes(p.operatorId));
    }

    if (sort === 'price') {
      result.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
    } else if (sort === 'coverage') {
      result.sort((a, b) => {
        const ca = Object.values(a.coverage).filter(Boolean).length;
        const cb = Object.values(b.coverage).filter(Boolean).length;
        return cb - ca;
      });
    } else if (sort === 'network') {
      result.sort((a, b) => b.accreditedNetworkCount - a.accreditedNetworkCount);
    }

    return result;
  }, [data, catFilter, priceFilter, coverOrtho, coverImplants, coverUrgency, opFilters, sort]);

  const operators = data?.operators ?? [];
  const showCompareBar = selectedPlanIds.length >= 2;

  return (
    <div className={s.page}>
      {/* Navbar */}
      <nav className={s.navbar}>
        <button className={s.brandPill} onClick={() => navigate('/')}>
          Simplifica
        </button>
      </nav>

      <div className={s.body}>
        {/* Filter sidebar */}
        <aside className={`${s.sidebar} ${sidebarOpen ? s.sidebarOpen : ''}`}>

          {/* Category */}
          <div className={s.filterSection}>
            <p className={s.filterLabel}>Categoria</p>
            <div className={s.filterChips}>
              {CATEGORIES.map(([val, label]) => (
                <button
                  key={val}
                  className={`${s.chip} ${catFilter === val ? s.chipActive : ''}`}
                  onClick={() => setCatFilter(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className={s.filterSection}>
            <p className={s.filterLabel}>Preço mensal</p>
            <div className={s.filterChips}>
              {PRICE_RANGES.map(([val, label]) => (
                <button
                  key={val}
                  className={`${s.chip} ${priceFilter === val ? s.chipActive : ''}`}
                  onClick={() => setPriceFilter(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Coverage toggles */}
          <div className={s.filterSection}>
            <p className={s.filterLabel}>Cobertura</p>
            <div className={s.checkRow}>
              <input
                type="checkbox" id="f-ortho"
                checked={coverOrtho}
                onChange={e => setCoverOrtho(e.target.checked)}
              />
              <label htmlFor="f-ortho">Ortodontia</label>
            </div>
            <div className={s.checkRow}>
              <input
                type="checkbox" id="f-implants"
                checked={coverImplants}
                onChange={e => setCoverImplants(e.target.checked)}
              />
              <label htmlFor="f-implants">Implante</label>
            </div>
            <div className={s.checkRow}>
              <input
                type="checkbox" id="f-urgency"
                checked={coverUrgency}
                onChange={e => setCoverUrgency(e.target.checked)}
              />
              <label htmlFor="f-urgency">Urgência/Emergência</label>
            </div>
          </div>

          {/* Operators */}
          <div className={s.filterSection}>
            <p className={s.filterLabel}>Operadora</p>
            {operators.map(op => (
              <div key={op.id} className={s.checkRow}>
                <input
                  type="checkbox"
                  id={`f-op-${op.id}`}
                  checked={opFilters.includes(op.id)}
                  onChange={() => toggleOpFilter(op.id)}
                />
                <label htmlFor={`f-op-${op.id}`}>{op.name}</label>
              </div>
            ))}
          </div>

          <button className={s.btnClear} onClick={resetFilters}>
            Limpar filtros
          </button>
        </aside>

        {/* Main */}
        <main className={`${s.main} ${showCompareBar ? s.mainWithBar : ''}`}>

          {/* Filter toggle — tablet/mobile */}
          <button className={s.filterToggle} onClick={() => setSidebarOpen(v => !v)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Filtros {sidebarOpen ? '▲' : '▼'}
          </button>

          {/* Sort bar */}
          <div className={s.sortBar}>
            {SORTS.map(([val, label]) => (
              <button
                key={val}
                className={`${s.sortPill} ${sort === val ? s.sortPillActive : ''}`}
                onClick={() => setSort(val)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className={s.resultsCount}>
            {filteredPlans.length} plano{filteredPlans.length !== 1 ? 's' : ''} encontrado{filteredPlans.length !== 1 ? 's' : ''}
          </p>

          {/* Plan grid */}
          {!data ? (
            <div className={s.loading}>Carregando planos…</div>
          ) : filteredPlans.length === 0 ? (
            <div className={s.empty}>
              Nenhum plano encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className={s.planGrid}>
              {filteredPlans.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  operator={operators.find(op => op.id === plan.operatorId)}
                  selected={selectedPlanIds.includes(plan.id)}
                  onToggleCompare={() => handleToggleCompare(plan.id)}
                  onDetail={() => navigate(`/plans/${plan.id}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Compare bar */}
      {showCompareBar && (
        <CompareBar
          count={selectedPlanIds.length}
          onCompare={() => navigate('/plans/compare')}
        />
      )}

      {/* Max-plans toast */}
      {toast && (
        <div className={s.toast} role="alert">
          Máximo de 4 planos para comparação
        </div>
      )}
    </div>
  );
}
