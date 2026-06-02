import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ProposalStatusScreen.module.css';

type StepStatus = 'done' | 'active' | 'pending';

interface TimelineStep {
  label:  string;
  sub:    string;
  chip?:  string;
  status: StepStatus;
}

const INITIAL_TIMELINE: TimelineStep[] = [
  {
    label:  'Documentos recebidos',
    sub:    'Recebidos em 01/06/2025',
    status: 'done',
  },
  {
    label:  'Proposta assinada',
    sub:    'Assinada digitalmente',
    status: 'done',
  },
  {
    label:  'Em análise pela operadora',
    sub:    'Aguardando aprovação',
    chip:   'Prazo: 3–5 dias úteis',
    status: 'active',
  },
  {
    label:  'Aprovação e início da cobertura',
    sub:    'Início após aprovação da operadora',
    status: 'pending',
  },
];

const ADVANCED_TIMELINE: TimelineStep[] = [
  {
    label:  'Documentos recebidos',
    sub:    'Recebidos em 01/06/2025',
    status: 'done',
  },
  {
    label:  'Proposta assinada',
    sub:    'Assinada digitalmente',
    status: 'done',
  },
  {
    label:  'Em análise pela operadora',
    sub:    'Aprovado pela operadora',
    status: 'done',
  },
  {
    label:  'Aprovação e início da cobertura',
    sub:    'Cobertura ativa a partir de 06/06/2025',
    chip:   'Aprovado!',
    status: 'active',
  },
];

const DOCS = [
  { name: 'documento_rg.pdf',              size: '45 KB' },
  { name: 'cpf_documento.jpg',             size: '32 KB' },
  { name: 'comprovante_residencia.pdf',    size: '78 KB' },
];

export default function ProposalStatusScreen() {
  const navigate  = useNavigate();
  const [timeline, setTimeline]   = useState<TimelineStep[]>(INITIAL_TIMELINE);
  const [advancing, setAdvancing] = useState(false);
  const [advanced, setAdvanced]   = useState(false);

  function handleAdvance() {
    setAdvancing(true);
    setTimeout(() => {
      setTimeline(ADVANCED_TIMELINE);
      setAdvancing(false);
      setAdvanced(true);
    }, 2000);
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

        {/* ── Success hero ── */}
        <div className={s.hero}>
          <div className={s.successCircle}>
            <span className={s.successCheck}>✓</span>
          </div>
          <h1 className={s.heroTitle}>Proposta enviada com sucesso!</h1>
          <p className={s.heroSub}>
            Prazo estimado: <strong>3 a 5 dias úteis</strong> para análise
          </p>
        </div>

        {/* ── Two-column body ── */}
        <div className={s.body}>

          {/* Left — timeline */}
          <div className={s.leftCol}>
            <div className={s.timelineCard}>
              <h2 className={s.colTitle}>Acompanhamento</h2>

              <div className={s.timeline}>
                {timeline.map((step, i) => {
                  const isLast = i === timeline.length - 1;
                  const connectorDone =
                    i < timeline.length - 1 &&
                    (timeline[i].status === 'done');

                  return (
                    <div key={i} className={s.timelineStep}>
                      {/* Left: circle + connector */}
                      <div className={s.timelineLeft}>
                        <div
                          className={`${s.circle} ${
                            step.status === 'done'   ? s.circleDone   :
                            step.status === 'active' ? s.circleActive :
                            s.circlePending
                          }`}
                        >
                          {step.status === 'done' ? '✓' : i + 1}
                        </div>
                        {!isLast && (
                          <div
                            className={`${s.connector} ${
                              connectorDone ? s.connectorDone : ''
                            }`}
                          />
                        )}
                      </div>

                      {/* Right: text */}
                      <div className={`${s.timelineRight} ${isLast ? s.timelineRightLast : ''}`}>
                        <p
                          className={`${s.stepLabel} ${
                            step.status === 'pending' ? s.stepLabelPending : ''
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className={s.stepSub}>{step.sub}</p>
                        {step.chip && (
                          <span className={s.stepChip}>{step.chip}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Advance button */}
              {!advanced ? (
                <button
                  className={s.btnAdvance}
                  onClick={handleAdvance}
                  disabled={advancing}
                >
                  {advancing ? (
                    <span className={s.loadingRow}>
                      <span className={s.spinner} />
                      Verificando…
                    </span>
                  ) : (
                    'Acompanhar minha proposta'
                  )}
                </button>
              ) : (
                <div className={s.approvedBanner}>
                  🎉 Proposta aprovada! Sua cobertura está ativa.
                </div>
              )}
            </div>
          </div>

          {/* Right — documents + info */}
          <div className={s.rightCol}>

            {/* Document list card */}
            <div className={s.card}>
              <h2 className={s.colTitle}>Documentos</h2>

              <div className={s.docList}>
                {DOCS.map((doc, i) => (
                  <div key={i} className={s.docRow}>
                    <div className={s.pdfIcon}>PDF</div>
                    <div className={s.docMeta}>
                      <p className={s.docName}>{doc.name}</p>
                      <p className={s.docSize}>{doc.size} · Aprovado</p>
                    </div>
                    <span className={s.docCheck}>✓</span>
                  </div>
                ))}
              </div>

              <button className={s.btnAddDoc}>
                + Adicionar documento
              </button>
            </div>

            {/* Alert info box */}
            <div className={s.alertBox}>
              <p className={s.alertText}>
                Você receberá atualizações por <strong>WhatsApp</strong> e <strong>e-mail</strong> conforme o andamento da proposta.
              </p>
            </div>

            {/* Contact row */}
            <div className={s.contactRow}>
              <button className={s.btnWhatsApp}>
                WhatsApp
              </button>
              <button className={s.btnGhost}>
                Ligar agora
              </button>
            </div>
          </div>
        </div>

        {/* ── Back link ── */}
        <div className={s.backRow}>
          <button className={s.backLink} onClick={() => navigate('/plans')}>
            Voltar ao início
          </button>
        </div>

      </div>
    </div>
  );
}
