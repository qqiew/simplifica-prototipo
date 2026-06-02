import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import { usePrototypeStore } from '../store/usePrototypeStore';
import s from './OnboardingScreen.module.css';

const STEP_LABELS = ['Plano', 'Pessoas', 'CNPJ', 'Estado', 'Extras'];

const BR_STATES = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' },
];

const NEEDS_OPTIONS = ['Ortodontia', 'Implante', 'Urgência/Emergência', 'Nenhuma'];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { setOnboardingAnswer } = usePrototypeStore();

  const [step, setStep] = useState(1);

  // Step 1
  const [hasCurrentPlan, setHasCurrentPlan] = useState<boolean | null>(null);

  // Step 2
  const [forFamily, setForFamily] = useState<boolean | null>(null);
  const [dependents, setDependents] = useState(1);

  // Step 3
  const [hasCnpj, setHasCnpj] = useState<boolean | null>(null);

  // Step 4
  const [uf, setUf] = useState('SP');

  // Step 5
  const [needs, setNeeds] = useState<string[]>([]);

  function goBack() {
    setStep(s => Math.max(1, s - 1));
  }

  function goNext() {
    setStep(s => Math.min(5, s + 1));
  }

  function handleStep1Select(value: boolean) {
    setHasCurrentPlan(value);
    setTimeout(() => setStep(2), 150);
  }

  function toggleNeed(need: string) {
    if (need === 'Nenhuma') {
      setNeeds(prev => (prev.includes('Nenhuma') ? [] : ['Nenhuma']));
    } else {
      setNeeds(prev => {
        const without = prev.filter(n => n !== 'Nenhuma');
        return without.includes(need)
          ? without.filter(n => n !== need)
          : [...without, need];
      });
    }
  }

  function handleFinish() {
    setOnboardingAnswer('hasCurrentPlan', hasCurrentPlan);
    setOnboardingAnswer('hasCnpj', hasCnpj);
    setOnboardingAnswer('lives', forFamily ? 1 + dependents : 1);
    setOnboardingAnswer('state', uf);
    setOnboardingAnswer('needs', needs);
    navigate('/plans');
  }

  return (
    <div className={s.page}>
      <div className={s.container}>
        <StepIndicator steps={STEP_LABELS} current={step} />

        <div className={s.card}>
          {/* ── Step 1 ── */}
          {step === 1 && (
            <>
              <p className={s.question}>Você já tem plano odontológico?</p>
              <div className={s.optionGrid}>
                <button
                  className={`${s.optionCard} ${hasCurrentPlan === true ? s.selected : ''}`}
                  onClick={() => handleStep1Select(true)}
                >
                  <span className={s.optionEmoji}>✅</span>
                  Sim
                </button>
                <button
                  className={`${s.optionCard} ${hasCurrentPlan === false ? s.selected : ''}`}
                  onClick={() => handleStep1Select(false)}
                >
                  <span className={s.optionEmoji}>❌</span>
                  Não
                </button>
              </div>
            </>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <>
              <p className={s.question}>Para quantas pessoas?</p>
              <div className={s.optionGrid}>
                <button
                  className={`${s.optionCard} ${forFamily === false ? s.selected : ''}`}
                  onClick={() => setForFamily(false)}
                >
                  <span className={s.optionEmoji}>🧍</span>
                  Só para mim
                </button>
                <button
                  className={`${s.optionCard} ${forFamily === true ? s.selected : ''}`}
                  onClick={() => setForFamily(true)}
                >
                  <span className={s.optionEmoji}>👨‍👩‍👧</span>
                  Eu + dependentes
                </button>
              </div>

              {forFamily && (
                <>
                  <p className={s.stepperLabel}>Quantos dependentes?</p>
                  <div className={s.stepper}>
                    <button
                      className={s.stepperBtn}
                      onClick={() => setDependents(d => Math.max(1, d - 1))}
                      disabled={dependents <= 1}
                    >
                      −
                    </button>
                    <span className={s.stepperCount}>{dependents}</span>
                    <button
                      className={s.stepperBtn}
                      onClick={() => setDependents(d => Math.min(10, d + 1))}
                      disabled={dependents >= 10}
                    >
                      +
                    </button>
                  </div>
                </>
              )}

              <div className={s.nav}>
                <button className={s.btnGhost} onClick={goBack}>Voltar</button>
                <button
                  className={s.btnPrimary}
                  onClick={goNext}
                  disabled={forFamily === null}
                >
                  Próximo
                </button>
              </div>
            </>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <>
              <p className={s.question}>Você tem CNPJ?</p>
              <div className={s.optionGrid}>
                <button
                  className={`${s.optionCard} ${hasCnpj === true ? s.selected : ''}`}
                  onClick={() => setHasCnpj(true)}
                >
                  <span className={s.optionEmoji}>🏢</span>
                  Sim, sou PJ
                </button>
                <button
                  className={`${s.optionCard} ${hasCnpj === false ? s.selected : ''}`}
                  onClick={() => setHasCnpj(false)}
                >
                  <span className={s.optionEmoji}>🧑</span>
                  Não, sou PF
                </button>
              </div>

              <div className={s.nav}>
                <button className={s.btnGhost} onClick={goBack}>Voltar</button>
                <button
                  className={s.btnPrimary}
                  onClick={goNext}
                  disabled={hasCnpj === null}
                >
                  Próximo
                </button>
              </div>
            </>
          )}

          {/* ── Step 4 ── */}
          {step === 4 && (
            <>
              <p className={s.question}>Em qual estado você mora?</p>
              <div className={s.selectWrap}>
                <select
                  className={s.select}
                  value={uf}
                  onChange={e => setUf(e.target.value)}
                >
                  {BR_STATES.map(st => (
                    <option key={st.code} value={st.code}>
                      {st.code} — {st.name}
                    </option>
                  ))}
                </select>
                <svg
                  className={s.selectArrow}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className={s.nav}>
                <button className={s.btnGhost} onClick={goBack}>Voltar</button>
                <button className={s.btnPrimary} onClick={goNext}>Próximo</button>
              </div>
            </>
          )}

          {/* ── Step 5 ── */}
          {step === 5 && (
            <>
              <p className={s.question}>Há alguma necessidade específica?</p>
              <div className={s.chipGroup}>
                {NEEDS_OPTIONS.map(need => (
                  <button
                    key={need}
                    className={`${s.chip} ${needs.includes(need) ? s.chipSelected : ''}`}
                    onClick={() => toggleNeed(need)}
                  >
                    {need}
                  </button>
                ))}
              </div>

              <div className={s.nav}>
                <button className={s.btnGhost} onClick={goBack}>Voltar</button>
                <button className={s.btnPrimary} onClick={handleFinish}>
                  Ver planos disponíveis
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
