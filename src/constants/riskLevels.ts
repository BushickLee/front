import { RiskPhase } from '../types/risk';

export type RiskSeverity = 'safe' | 'caution' | 'danger' | 'critical';

export interface RiskLevelMeta {
  title: string;
  description: string;
  severity: RiskSeverity;
  displayColorName: string;
  color: string;
}

export const riskLevelMeta: Record<RiskPhase, RiskLevelMeta> = {
  normal: {
    title: '정상',
    description: '현재 감지된 낙상 위험이 없습니다.',
    severity: 'safe',
    displayColorName: 'green',
    color: '#2E7D32',
  },
  early_warning: {
    title: '주의 / 조기경보',
    description: '낙상으로 이어질 수 있는 행동이 감지되었습니다.',
    severity: 'caution',
    displayColorName: 'orange',
    color: '#F57C00',
  },
  imminent_fall: {
    title: '낙상 임박',
    description: '즉시 확인이 필요한 높은 낙상 위험 상태입니다.',
    severity: 'danger',
    displayColorName: 'red',
    color: '#D32F2F',
  },
  post_fall: {
    title: '낙상 감지',
    description: '낙상으로 판단되는 상황이 감지되었습니다.',
    severity: 'critical',
    displayColorName: 'dark red',
    color: '#B71C1C',
  },
};
