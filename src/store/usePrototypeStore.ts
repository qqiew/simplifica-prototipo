import { create } from 'zustand';

interface OnboardingAnswers {
  hasCurrentPlan?: boolean;
  hasCnpj?: boolean;
  lives?: number;
  state?: string;
  needs?: string[];
}

interface PrototypeStore {
  onboardingAnswers: OnboardingAnswers;
  setOnboardingAnswer: (key: keyof OnboardingAnswers, value: unknown) => void;

  selectedPlanIds: string[];
  togglePlanSelection: (planId: string) => void;
  clearSelection: () => void;

  contractPlanId: string | null;
  setContractPlanId: (id: string) => void;
}

export const usePrototypeStore = create<PrototypeStore>((set, get) => ({
  onboardingAnswers: {},
  setOnboardingAnswer: (key, value) =>
    set(s => ({ onboardingAnswers: { ...s.onboardingAnswers, [key]: value } })),

  selectedPlanIds: [],
  togglePlanSelection: (planId) => {
    const { selectedPlanIds } = get();
    if (selectedPlanIds.includes(planId)) {
      set({ selectedPlanIds: selectedPlanIds.filter(id => id !== planId) });
    } else if (selectedPlanIds.length < 4) {
      set({ selectedPlanIds: [...selectedPlanIds, planId] });
    }
  },
  clearSelection: () => set({ selectedPlanIds: [] }),

  contractPlanId: null,
  setContractPlanId: (id) => set({ contractPlanId: id }),
}));
