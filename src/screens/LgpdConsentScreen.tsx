import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import s from './LgpdConsentScreen.module.css';

const STEPS = ['Documentos', 'LGPD', 'Assinatura'];

const LGPD_TEXT = `
Ao prosseguir, você autoriza a Simplifica Corretora de Planos Ltda. a compartilhar seus dados pessoais — incluindo nome completo, CPF, data de nascimento, endereço e documentos enviados — com a operadora de plano odontológico selecionada, com a única finalidade de processar a contratação do plano escolhido.

Seus dados serão utilizados exclusivamente para:
• Análise e aprovação da proposta de contratação;
• Emissão do contrato e apólice de cobertura;
• Comunicações relacionadas ao seu plano (boletos, renovações, atualizações de rede credenciada).

O compartilhamento segue as diretrizes da Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018). Você pode revogar esta autorização a qualquer momento entrando em contato com nosso suporte. A revogação não afeta tratamentos já realizados.

A Simplifica não vende nem cede seus dados a terceiros para fins comerciais ou publicitários. Para mais informações, acesse nossa Política de Privacidade completa em nosso site.
`.trim();

export default function LgpdConsentScreen() {
  const navigate = useNavigate();
  const [agreed, setAgreed]         = useState(false);
  const [showModal, setShowModal]   = useState(false);

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
          <StepIndicator steps={STEPS} current={2} />
        </div>

        {/* Card */}
        <div className={s.card}>
          <h1 className={s.title}>Autorização de uso de dados</h1>
          <p className={s.subtitle}>
            Leia o texto abaixo antes de prosseguir para a assinatura.
          </p>

          {/* Scrollable text block */}
          <div className={s.textBlock}>
            {LGPD_TEXT.split('\n').map((line, i) =>
              line === '' ? (
                <br key={i} />
              ) : (
                <p key={i} className={s.textParagraph}>{line}</p>
              )
            )}
          </div>

          {/* Checkbox */}
          <label className={s.checkRow}>
            <input
              type="checkbox"
              className={s.checkbox}
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
            />
            <span className={s.checkLabel}>
              Li e autorizo o uso dos meus dados conforme descrito acima
            </span>
          </label>

          {/* Primary CTA */}
          <button
            className={s.btnPrimary}
            disabled={!agreed}
            onClick={() => navigate('/contract/signature')}
          >
            Autorizar e assinar
          </button>

          {/* Reject link */}
          <button className={s.rejectLink} onClick={() => setShowModal(true)}>
            Não autorizo
          </button>
        </div>
      </div>

      {/* Rejection modal */}
      {showModal && (
        <div className={s.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={s.modalPanel} onClick={e => e.stopPropagation()}>
            <h2 className={s.modalTitle}>
              Sem autorização não é possível continuar a contratação. Deseja cancelar?
            </h2>
            <div className={s.modalActions}>
              <button
                className={s.btnGhost}
                onClick={() => navigate('/plans')}
              >
                Cancelar contratação
              </button>
              <button
                className={s.btnPrimaryModal}
                onClick={() => setShowModal(false)}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
