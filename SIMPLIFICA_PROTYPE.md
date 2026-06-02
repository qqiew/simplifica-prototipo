# Simplifica — Prototype Guide
> Consumer-facing interface only | Mock data via JSON | No backend required  
> Goal: Deploy a testable UI to measure user interaction and navigation patterns

---

## Overview

This prototype is a **static React web app** (or React Native app) that renders all consumer-facing screens using local JSON mock data. No API calls, no database, no auth backend — just screens and navigation.

**What we are building:**
- All screens a consumer touches from landing to post-signature
- Navigation between screens works fully
- Data comes from a local `mock-data.json` file

**What we are NOT building:**
- Admin or broker screens
- Real API calls
- Real authentication
- Payment processing
- D4Sign integration

---

## Tech Choice for Prototype

Use **React + Vite + React Router**. Reasons:
- Runs in any browser, shareable via a simple URL (Vercel, Netlify, GitHub Pages)
- Same React knowledge reused for the final mobile app
- Easiest to deploy fast for user testing

```bash
npm create vite@latest simplifica-prototype -- --template react-ts
cd simplifica-prototype
npm install react-router-dom
```

---

## Project Structure

```
simplifica-prototype/
├── public/
│   └── mock-data.json          # All mock plans and operators
├── src/
│   ├── main.tsx
│   ├── App.tsx                 # Router setup
│   ├── data/
│   │   └── useMockData.ts      # Hook that reads mock-data.json
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── PlanListScreen.tsx
│   │   ├── PlanDetailScreen.tsx
│   │   ├── PlanCompareScreen.tsx
│   │   ├── NetworkScreen.tsx
│   │   ├── ContractStartScreen.tsx
│   │   ├── DocumentUploadScreen.tsx
│   │   ├── LgpdConsentScreen.tsx
│   │   ├── SignatureScreen.tsx
│   │   └── ProposalStatusScreen.tsx
│   ├── components/
│   │   ├── PlanCard.tsx
│   │   ├── CompareBar.tsx      # Sticky bar showing selected plans count
│   │   ├── CoverageTag.tsx
│   │   ├── StepIndicator.tsx
│   │   └── BottomSheet.tsx
│   ├── store/
│   │   └── usePrototypeStore.ts  # Zustand — selected plans, onboarding answers
│   └── styles/
│       └── global.css
```

---

## Mock Data Format

File: `public/mock-data.json`

This is the single source of truth for the prototype. All screens read from it.

```json
{
  "operators": [
    {
      "id": "op1",
      "name": "OdontoPrev",
      "logoUrl": "/logos/odontoprev.png"
    },
    {
      "id": "op2",
      "name": "Amil Dental",
      "logoUrl": "/logos/amil.png"
    },
    {
      "id": "op3",
      "name": "SulAmérica Odonto",
      "logoUrl": "/logos/sulameria.png"
    },
    {
      "id": "op4",
      "name": "Porto Seguro Dental",
      "logoUrl": "/logos/porto.png"
    }
  ],
  "plans": [
    {
      "id": "plan1",
      "operatorId": "op1",
      "name": "OdontoPrev Essencial",
      "category": "individual",
      "monthlyPrice": 49.90,
      "coparticipation": false,
      "orthodontics": false,
      "implants": false,
      "urgencyEmergency": true,
      "ansCode": "123456",
      "accreditedNetworkCount": 1240,
      "coverage": {
        "prevention": true,
        "basicRestoration": true,
        "endodontics": false,
        "periodontics": false,
        "prosthetics": false,
        "orthodontics": false,
        "implants": false,
        "urgencyEmergency": true
      },
      "highlights": ["Sem carência para urgências", "Rede ampla em SP"],
      "accreditedProviders": [
        { "id": "prov1", "name": "Clínica Sorriso", "type": "clinic", "address": "Rua das Flores, 100", "city": "Mogi das Cruzes", "state": "SP", "lat": -23.5229, "lng": -46.1876 },
        { "id": "prov2", "name": "OdontoCenter", "type": "clinic", "address": "Av. Brasil, 500", "city": "Mogi das Cruzes", "state": "SP", "lat": -23.5190, "lng": -46.1920 }
      ]
    },
    {
      "id": "plan2",
      "operatorId": "op1",
      "name": "OdontoPrev Família",
      "category": "family",
      "monthlyPrice": 89.90,
      "coparticipation": false,
      "orthodontics": false,
      "implants": false,
      "urgencyEmergency": true,
      "ansCode": "123457",
      "accreditedNetworkCount": 1240,
      "coverage": {
        "prevention": true,
        "basicRestoration": true,
        "endodontics": true,
        "periodontics": false,
        "prosthetics": false,
        "orthodontics": false,
        "implants": false,
        "urgencyEmergency": true
      },
      "highlights": ["Até 4 dependentes", "Endodontia incluída"],
      "accreditedProviders": []
    },
    {
      "id": "plan3",
      "operatorId": "op2",
      "name": "Amil Dental Top",
      "category": "individual",
      "monthlyPrice": 79.90,
      "coparticipation": false,
      "orthodontics": true,
      "implants": false,
      "urgencyEmergency": true,
      "ansCode": "234561",
      "accreditedNetworkCount": 2100,
      "coverage": {
        "prevention": true,
        "basicRestoration": true,
        "endodontics": true,
        "periodontics": true,
        "prosthetics": false,
        "orthodontics": true,
        "implants": false,
        "urgencyEmergency": true
      },
      "highlights": ["Ortodontia coberta", "Maior rede credenciada"],
      "accreditedProviders": []
    },
    {
      "id": "plan4",
      "operatorId": "op3",
      "name": "SulAmérica Especial",
      "category": "individual",
      "monthlyPrice": 119.90,
      "coparticipation": false,
      "orthodontics": true,
      "implants": true,
      "urgencyEmergency": true,
      "ansCode": "345678",
      "accreditedNetworkCount": 1850,
      "coverage": {
        "prevention": true,
        "basicRestoration": true,
        "endodontics": true,
        "periodontics": true,
        "prosthetics": true,
        "orthodontics": true,
        "implants": true,
        "urgencyEmergency": true
      },
      "highlights": ["Implante coberto", "Cobertura completa"],
      "accreditedProviders": []
    },
    {
      "id": "plan5",
      "operatorId": "op4",
      "name": "Porto Dental Basic",
      "category": "individual",
      "monthlyPrice": 39.90,
      "coparticipation": true,
      "orthodontics": false,
      "implants": false,
      "urgencyEmergency": false,
      "ansCode": "456789",
      "accreditedNetworkCount": 980,
      "coverage": {
        "prevention": true,
        "basicRestoration": true,
        "endodontics": false,
        "periodontics": false,
        "prosthetics": false,
        "orthodontics": false,
        "implants": false,
        "urgencyEmergency": false
      },
      "highlights": ["Menor preço", "Ideal para prevenção"],
      "accreditedProviders": []
    },
    {
      "id": "plan6",
      "operatorId": "op4",
      "name": "Porto Dental Plus",
      "category": "family",
      "monthlyPrice": 159.90,
      "coparticipation": false,
      "orthodontics": true,
      "implants": false,
      "urgencyEmergency": true,
      "ansCode": "456790",
      "accreditedNetworkCount": 1600,
      "coverage": {
        "prevention": true,
        "basicRestoration": true,
        "endodontics": true,
        "periodontics": true,
        "prosthetics": true,
        "orthodontics": true,
        "implants": false,
        "urgencyEmergency": true
      },
      "highlights": ["Família completa", "Ortodontia para todos"],
      "accreditedProviders": []
    }
  ]
}
```

---

## State Management

Install Zustand: `npm install zustand`

```typescript
// src/store/usePrototypeStore.ts
import { create } from 'zustand';

interface OnboardingAnswers {
  hasCurrentPlan?: boolean;
  hasCnpj?: boolean;
  lives?: number;
  state?: string;
}

interface PrototypeStore {
  // Onboarding
  onboardingAnswers: OnboardingAnswers;
  setOnboardingAnswer: (key: keyof OnboardingAnswers, value: unknown) => void;

  // Plan comparison (max 4)
  selectedPlanIds: string[];
  togglePlanSelection: (planId: string) => void;
  clearSelection: () => void;

  // Contract flow
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
```

---

## Router Setup

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<SplashScreen />} />
        <Route path="/login"             element={<LoginScreen />} />
        <Route path="/register"          element={<RegisterScreen />} />
        <Route path="/onboarding"        element={<OnboardingScreen />} />
        <Route path="/plans"             element={<PlanListScreen />} />
        <Route path="/plans/:id"         element={<PlanDetailScreen />} />
        <Route path="/plans/compare"     element={<PlanCompareScreen />} />
        <Route path="/plans/:id/network" element={<NetworkScreen />} />
        <Route path="/contract"          element={<ContractStartScreen />} />
        <Route path="/contract/documents"  element={<DocumentUploadScreen />} />
        <Route path="/contract/lgpd"       element={<LgpdConsentScreen />} />
        <Route path="/contract/signature"  element={<SignatureScreen />} />
        <Route path="/contract/status"     element={<ProposalStatusScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Screens Specification

Each section below describes: what the screen shows and what the user can do.

---

### Screen 1 — Splash

**Route:** `/`  
**Purpose:** Brand entry point, single CTA to start.

**UI elements:**
- Simplifica logo (centered)
- Tagline: *"Compare e contrate seu plano odontológico em minutos"*
- Primary button: **"Começar"** → navigates to `/login`
- Secondary link: **"Já tenho conta"** → navigates to `/login`

---

### Screen 2 — Login

**Route:** `/login`  
**Purpose:** Simulate login. In the prototype, any input goes through.

**UI elements:**
- Input: Email
- Input: Password
- Primary button: **"Entrar"** → navigates to `/plans` (skip onboarding if already done)
- Link: **"Criar conta"** → navigates to `/register`
- Link: **"Esqueci minha senha"** → shows inline toast "Funcionalidade em breve"

**Prototype behavior:** Tapping "Entrar" always succeeds, no validation needed.

---

### Screen 3 — Register

**Route:** `/register`  
**Purpose:** Simulate account creation.

**UI elements:**
- Input: Nome completo
- Input: E-mail
- Input: Telefone
- Input: Data de nascimento
- Checkbox: LGPD consent ("Li e aceito os termos de uso e política de privacidade")
- Primary button: **"Criar conta"** → navigates to `/onboarding`
- Link: **"Já tenho conta"** → `/login`

**Prototype behavior:** Tapping "Criar conta" always succeeds.

---

### Screen 4 — Onboarding (Quotation Wizard)

**Route:** `/onboarding`  
**Purpose:** Collect the minimum info needed to filter plans. 5 steps, one question per screen.

**Step indicator:** Show `1 / 5`, `2 / 5`, etc. at the top.

#### Step 1 — Você já tem plano odontológico?
- Two option cards: **"Sim"** / **"Não"**
- Selecting one auto-advances to step 2

#### Step 2 — Para quantas pessoas?
- Options: **"Só para mim"** / **"Eu + dependentes"**
- If "Eu + dependentes": show number input (1–10)

#### Step 3 — Você tem CNPJ?
- Two option cards: **"Sim, sou PJ"** / **"Não, sou PF"**

#### Step 4 — Em qual estado você mora?
- Dropdown or scrollable list of Brazilian states (UF)
- Preselect SP

#### Step 5 — Há alguma necessidade específica?
- Multi-select chips: **Ortodontia** | **Implante** | **Urgência/Emergência** | **Nenhuma**
- Button: **"Ver planos disponíveis"** → saves answers to store → navigates to `/plans`

---

### Screen 5 — Plan List

**Route:** `/plans`  
**Purpose:** Main browsing screen. Shows all plans from `mock-data.json`, filterable.

**UI elements:**

*Filter bar (horizontal scroll or dropdown row):*
- Category: Todos | Individual | Família | Empresarial
- Price: slider or range chips (Até R$50 | R$50–R$100 | R$100–R$150 | R$150+)
- Cobertura: Ortodontia | Implante | Urgência (toggle chips)
- Operator: multi-select from operators list

*Plan cards (vertical list):*
- Operator logo + name
- Plan name
- Monthly price (large, prominent)
- 3 coverage highlights (icons + labels)
- "Rede: X prestadores" badge
- Button: **"Ver detalhes"** → `/plans/:id`
- Checkbox or toggle: **"Comparar"** → adds to compare selection

*Sticky bottom bar (CompareBar):*
- Appears when ≥ 2 plans selected
- Shows: "X planos selecionados"
- Button: **"Comparar agora"** → `/plans/compare`
- Max 4 plans enforced: show toast "Máximo de 4 planos para comparação" if user tries to add a 5th

---

### Screen 6 — Plan Detail

**Route:** `/plans/:id`  
**Purpose:** Full plan information before deciding to contract or compare.

**UI elements:**
- Header: operator logo + plan name + monthly price
- Coverage table: all 8 coverage items with ✓ / ✗ indicators
- Highlights section: bullet list from `plan.highlights`
- ANS code badge
- "Rede credenciada" button: **"Ver X prestadores próximos"** → `/plans/:id/network`
- Sticky footer with two buttons:
  - **"Adicionar à comparação"** (if not already selected)
  - **"Quero contratar"** → saves `contractPlanId` to store → `/contract`

---

### Screen 7 — Plan Comparison

**Route:** `/plans/compare`  
**Purpose:** Side-by-side comparison of 2–4 selected plans.

**UI elements:**
- Column header per plan: operator logo + plan name + price
- Row per coverage item: label on left, ✓ / ✗ in each column
- Rows: Prevenção | Restauração | Endodontia | Periodontia | Prótese | Ortodontia | Implante | Urgência/Emergência
- Extra rows: Coparticipação | Nº de prestadores | Preço mensal (repeated at bottom for quick scan)
- "Remover" link under each plan header (removes from comparison, updates store)
- Per-plan CTA button: **"Contratar este plano"** → `/contract`

---

### Screen 8 — Accredited Network

**Route:** `/plans/:id/network`  
**Purpose:** Show where the user can use the plan.

**UI elements:**
- Plan name + operator in header
- List of providers from `plan.accreditedProviders` in mock data
- Each provider card: name, type badge (Clínica / Hospital / Laboratório), address, city
- Search input to filter providers by name or city
- Empty state: "Nenhum prestador encontrado para sua busca"
- Note: Map view is out of scope for prototype — show list only

---

### Screen 9 — Contract Start

**Route:** `/contract`  
**Purpose:** Summary screen before the user commits to contracting.

**UI elements:**
- "Você escolheu:" section with selected plan card (read-only)
- Price summary: monthly price + first payment date (hardcoded mock: "Vencimento: 10 do próximo mês")
- What happens next: numbered steps (1. Envio de documentos → 2. Assinatura digital → 3. Início da cobertura)
- Primary button: **"Continuar"** → `/contract/documents`
- Link: **"Escolher outro plano"** → `/plans`

---

### Screen 10 — Document Upload

**Route:** `/contract/documents`  
**Purpose:** Simulate document upload (no actual upload needed — just UI).

**UI elements:**
- Step indicator: step 1 of 3
- Instruction text: "Envie os documentos abaixo para continuarmos"
- Document slots (each as a card with an upload area):
  - RG ou CNH (frente)
  - CPF
  - Comprovante de residência
- Each slot has: document name, icon, status badge (Pendente / Enviado), and a tap area that simulates upload (click → show "Enviado" badge after 1s delay)
- Accepted formats note: "PDF, JPG ou PNG. Máximo 5MB por arquivo"
- Primary button: **"Próximo"** (enabled only when all 3 slots show "Enviado") → `/contract/lgpd`

**Prototype behavior:** Tapping the upload area sets the slot to "Enviado" after a 1-second fake delay. No real file is processed.

---

### Screen 11 — LGPD Consent

**Route:** `/contract/lgpd`  
**Purpose:** Explicit consent before proceeding to signature.

**UI elements:**
- Step indicator: step 2 of 3
- Title: "Autorização de uso de dados"
- Text block (scrollable): explain that the user authorizes Simplifica to share their data with the selected operator for the purpose of contracting the plan (keep this short and plain-language)
- Checkbox: "Li e autorizo o uso dos meus dados conforme descrito acima"
- Primary button: **"Autorizar e assinar"** (enabled only when checkbox checked) → `/contract/signature`
- Link: **"Não autorizo"** → shows modal: "Sem autorização não é possível continuar a contratação. Deseja cancelar?" with options "Cancelar contratação" (→ `/plans`) and "Voltar" (close modal)

---

### Screen 12 — Signature

**Route:** `/contract/signature`  
**Purpose:** Simulate the e-signature step.

**UI elements:**
- Step indicator: step 3 of 3
- Title: "Assine sua proposta"
- Instruction: "Desenhe sua assinatura no campo abaixo ou clique em 'Usar nome completo'"
- Signature pad (HTML canvas where user can draw with mouse/touch)
- Button below pad: **"Limpar"** (clears canvas)
- Alternative: **"Usar nome completo"** (renders name as signature in a cursive-style font)
- Primary button: **"Assinar e enviar proposta"** → simulated 2s loading → `/contract/status`

**Prototype behavior:** No real signature processing. After tapping "Assinar", show a loading spinner for 2 seconds then navigate automatically.

---

### Screen 13 — Proposal Status

**Route:** `/contract/status`  
**Purpose:** Confirmation screen and status tracker.

**UI elements:**
- Success illustration or checkmark animation at top
- Title: "Proposta enviada com sucesso!"
- Status tracker (vertical timeline):
  - ✅ Documentos recebidos
  - ✅ Proposta assinada
  - 🔄 Em análise pela operadora (current, animated pulse)
  - ○ Aprovação e início da cobertura
- Estimated timeline note: "Prazo estimado: 3 a 5 dias úteis"
- Info box: "Você receberá atualizações por WhatsApp e e-mail"
- Button: **"Acompanhar minha proposta"** → shows mock status (stays on same screen, updates the timeline to next step after 2s to simulate progress)
- Link: **"Voltar ao início"** → `/plans`

---

## Navigation Flow Summary

```
/  (Splash)
  └── /login
        ├── /plans  (skip onboarding if returning user)
        └── /register
              └── /onboarding  (5 steps, state in store)
                    └── /plans
                          ├── /plans/:id  (detail)
                          │     ├── /plans/:id/network
                          │     └── /contract  ──────────────┐
                          └── /plans/compare                  │
                                └── /contract  ───────────────┘
                                                    │
                                          /contract/documents
                                                    │
                                          /contract/lgpd
                                                    │
                                          /contract/signature
                                                    │
                                          /contract/status
```

---

## Coverage Labels (for UI display)

Use these human-readable labels when rendering coverage items across Plan Detail and Plan Comparison screens.

```typescript
export const COVERAGE_LABELS: Record<string, string> = {
  prevention:       'Prevenção',
  basicRestoration: 'Restauração',
  endodontics:      'Endodontia (canal)',
  periodontics:     'Periodontia (gengiva)',
  prosthetics:      'Prótese',
  orthodontics:     'Ortodontia (aparelho)',
  implants:         'Implante',
  urgencyEmergency: 'Urgência / Emergência',
};
```

---

## Mock Data Hook

```typescript
// src/data/useMockData.ts
import { useEffect, useState } from 'react';

export function useMockData() {
  const [data, setData] = useState<MockData | null>(null);

  useEffect(() => {
    fetch('/mock-data.json')
      .then(r => r.json())
      .then(setData);
  }, []);

  return data;
}
```

---

## Deployment

```bash
npm run build
# Output: dist/

# Deploy options (all free):
# Vercel:  vercel deploy
# Netlify: netlify deploy --dir=dist
# GitHub Pages: push dist/ to gh-pages branch
```

Add the **Microsoft Clarity** snippet to `index.html` before deploying. Clarity will automatically record sessions, heatmaps, and click data with no extra code required.