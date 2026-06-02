import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import s from './DocumentUploadScreen.module.css';

type SlotStatus = 'pending' | 'uploading' | 'done';

const STEPS = ['Documentos', 'LGPD', 'Assinatura'];

const DOCS = [
  {
    label:    'RG ou CNH (frente)',
    hint:     'Documento de identidade com foto',
    fakeFile: 'documento_rg.pdf',
    fakeSize: '45 KB',
  },
  {
    label:    'CPF',
    hint:     'Cadastro de Pessoa Física',
    fakeFile: 'cpf_documento.jpg',
    fakeSize: '32 KB',
  },
  {
    label:    'Comprovante de residência',
    hint:     'Conta de luz, água ou telefone (últimos 90 dias)',
    fakeFile: 'comprovante_residencia.pdf',
    fakeSize: '78 KB',
  },
];

export default function DocumentUploadScreen() {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<SlotStatus[]>(['pending', 'pending', 'pending']);

  const allDone = statuses.every(s => s === 'done');

  function handleUpload(index: number) {
    if (statuses[index] !== 'pending') return;
    setStatuses(prev => prev.map((st, i) => (i === index ? 'uploading' : st)));
    setTimeout(() => {
      setStatuses(prev => prev.map((st, i) => (i === index ? 'done' : st)));
    }, 1000);
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
          <StepIndicator steps={STEPS} current={1} />
        </div>

        {/* Heading */}
        <h1 className={s.pageTitle}>Documentos</h1>
        <p className={s.pageSubtitle}>Envie os documentos abaixo para continuarmos</p>

        {/* Upload slots */}
        <div className={s.slotList}>
          {DOCS.map((doc, i) => {
            const status = statuses[i];
            const isDone = status === 'done';
            const isUploading = status === 'uploading';

            return (
              <div
                key={i}
                className={`${s.slot} ${isDone ? s.slotDone : ''} ${isUploading ? s.slotUploading : ''}`}
                onClick={() => handleUpload(i)}
                role="button"
                aria-label={`Enviar ${doc.label}`}
              >
                {isDone ? (
                  /* Uploaded state */
                  <div className={s.slotDoneContent}>
                    <span className={s.doneCheck}>✓</span>
                    <div className={s.slotDoneMeta}>
                      <p className={s.doneFilename}>{doc.fakeFile}</p>
                      <p className={s.doneSize}>{doc.fakeSize} · Enviado</p>
                    </div>
                    <span className={s.doneLabel}>{doc.label}</span>
                  </div>
                ) : isUploading ? (
                  /* Uploading state */
                  <div className={s.slotUploadingContent}>
                    <div className={s.spinner} />
                    <p className={s.uploadingText}>Enviando…</p>
                  </div>
                ) : (
                  /* Pending state */
                  <div className={s.slotPendingContent}>
                    <span className={s.plusIcon}>+</span>
                    <p className={s.slotLabel}>{doc.label}</p>
                    <p className={s.slotHint}>{doc.hint}</p>
                    <span className={s.pendingBadge}>Pendente</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Caption */}
        <p className={s.caption}>
          Arrastar ou clicar para enviar · PDF, JPG ou PNG · máx. 5MB por arquivo
        </p>

        {/* Actions */}
        <div className={s.actions}>
          <button className={s.btnGhost} onClick={() => navigate('/contract')}>
            Voltar
          </button>
          <button
            className={s.btnPrimary}
            disabled={!allDone}
            onClick={() => navigate('/contract/lgpd')}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
