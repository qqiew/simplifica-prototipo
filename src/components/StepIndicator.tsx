import { Fragment } from 'react';
import s from './StepIndicator.module.css';

interface Props {
  steps: string[];
  current: number; // 1-indexed
}

export default function StepIndicator({ steps, current }: Props) {
  return (
    <div className={s.row}>
      {steps.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;

        return (
          <Fragment key={label}>
            {i > 0 && (
              <div className={`${s.connector} ${done ? s.connectorDone : ''}`} />
            )}
            <div className={s.item}>
              <div className={`${s.circle} ${done ? s.done : ''} ${active ? s.active : ''}`}>
                {done ? '✓' : num}
              </div>
              <span className={`${s.label} ${active ? s.labelActive : ''}`}>
                {label}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
