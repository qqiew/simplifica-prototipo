import s from './CompareBar.module.css';

interface Props {
  count: number;
  onCompare: () => void;
}

export default function CompareBar({ count, onCompare }: Props) {
  return (
    <div className={s.bar} role="region" aria-label="Comparação de planos">
      <span className={s.label}>
        {count} planos selecionados
        <span className={s.labelSub}>máximo 4</span>
      </span>
      <button className={s.btnCompare} onClick={onCompare}>
        Comparar agora ›
      </button>
    </div>
  );
}
