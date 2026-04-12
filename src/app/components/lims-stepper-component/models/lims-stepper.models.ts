export type LimsStepStatus = 'pending' | 'active' | 'completed' | 'disabled';

export interface LimsStepItem {
  id: string;
  label: string;
  description?: string;
  status?: LimsStepStatus;
  optional?: boolean;
  disabled?: boolean;
}