import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMockData } from '../data/useMockData';
import s from './NetworkScreen.module.css';

type ProviderType = 'all' | 'hospital' | 'clinic' | 'lab' | 'pharmacy';

const TYPE_TABS: [ProviderType, string][] = [
  ['all',      'Todos'],
  ['hospital', 'Hospitais'],
  ['clinic',   'Clínicas'],
  ['lab',      'Laboratórios'],
  ['pharmacy', 'Farmácias'],
];

function typeLabel(type: string) {
  if (type === 'hospital') return 'Hospital';
  if (type === 'clinic')   return 'Clínica';
  if (type === 'lab')      return 'Laboratório';
  if (type === 'pharmacy') return 'Farmácia';
  return type;
}

function typeInitial(type: string) {
  if (type === 'hospital') return 'H';
  if (type === 'clinic')   return 'C';
  if (type === 'lab')      return 'L';
  if (type === 'pharmacy') return 'F';
  return '?';
}

export default function NetworkScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = useMockData();
  const [search, setSearch]         = useState('');
  const [typeFilter, setTypeFilter] = useState<ProviderType>('all');

  if (!data) {
    return <div className={s.page}><p className={s.loading}>Carregando…</p></div>;
  }

  const plan     = data.plans.find(p => p.id === id);
  const operator = data.operators.find(op => op.id === plan?.operatorId);

  if (!plan) {
    return <div className={s.page}><p className={s.loading}>Plano não encontrado.</p></div>;
  }

  const providers = plan.accreditedProviders.filter(p => {
    const matchesType   = typeFilter === 'all' || p.type === typeFilter;
    const q             = search.toLowerCase();
    const matchesSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.city.toLowerCase().includes(q);
    return matchesType && matchesSearch;
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
        {/* Breadcrumb */}
        <div className={s.breadcrumb}>
          <button className={s.breadcrumbLink} onClick={() => navigate('/plans')}>
            Planos
          </button>
          <span className={s.breadcrumbSep}>›</span>
          <button className={s.breadcrumbLink} onClick={() => navigate(`/plans/${plan.id}`)}>
            {plan.name}
          </button>
          <span className={s.breadcrumbSep}>›</span>
          <span>Rede credenciada</span>
        </div>

        {/* Header */}
        <div className={s.header}>
          <div className={s.headerLogo}>{operator?.name?.[0] ?? '?'}</div>
          <div className={s.headerMeta}>
            <h1 className={s.headerTitle}>{plan.name}</h1>
            <p className={s.headerSub}>
              {operator?.name} · {plan.accreditedNetworkCount.toLocaleString('pt-BR')} prestadores na rede
            </p>
          </div>
        </div>

        {/* Search */}
        <div className={s.searchWrap}>
          <svg className={s.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className={s.searchInput}
            type="text"
            placeholder="Buscar por nome ou cidade…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Type filter tabs */}
        <div className={s.typeTabs}>
          {TYPE_TABS.map(([val, label]) => (
            <button
              key={val}
              className={`${s.typeTab} ${typeFilter === val ? s.typeTabActive : ''}`}
              onClick={() => setTypeFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className={s.resultsCount}>
          {providers.length} prestador{providers.length !== 1 ? 'es' : ''} encontrado{providers.length !== 1 ? 's' : ''}
        </p>

        {/* Provider list */}
        {providers.length === 0 ? (
          <div className={s.empty}>
            Nenhum prestador encontrado para sua busca.
          </div>
        ) : (
          <div className={s.providerList}>
            {providers.map(provider => (
              <div key={provider.id} className={s.providerCard}>
                <div className={`${s.providerIcon} ${s[`icon_${provider.type}` as keyof typeof s]}`}>
                  {typeInitial(provider.type)}
                </div>
                <div className={s.providerInfo}>
                  <p className={s.providerName}>{provider.name}</p>
                  <p className={s.providerAddress}>
                    {provider.address} — {provider.city}, {provider.state}
                  </p>
                </div>
                <span className={`${s.typeBadge} ${s[`badge_${provider.type}` as keyof typeof s]}`}>
                  {typeLabel(provider.type)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
