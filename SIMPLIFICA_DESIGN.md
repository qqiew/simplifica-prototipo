# Simplifica — Design System
> Reference for all UI decisions. Read this before building any screen.
> Every color, spacing, component, and layout rule is defined here.

---

## Table of Contents

1. [Setup](#1-setup)
2. [Color Tokens](#2-color-tokens)
3. [Typography](#3-typography)
4. [Spacing & Radius](#4-spacing--radius)
5. [Shadows](#5-shadows)
6. [Buttons](#6-buttons)
7. [Inputs & Form Controls](#7-inputs--form-controls)
8. [Cards](#8-cards)
9. [Badges & Tags](#9-badges--tags)
10. [Navigation Bar](#10-navigation-bar)
11. [Step Indicator](#11-step-indicator)
12. [Coverage Indicators](#12-coverage-indicators)
13. [Compare Bar](#13-compare-bar)
14. [Screen-Specific Layouts](#14-screen-specific-layouts)

---

## 1. Setup

### Google Font

Add to `index.html` inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Global CSS

Create `src/styles/global.css` with the full token set below, then import it in `main.tsx`:

```css
@import './styles/global.css';
```

---

## 2. Color Tokens

Paste this block as the content of `src/styles/global.css`:

```css
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--color-bg-page);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
}

:root {
  /* ── Brand ── */
  --color-primary:        #2F5EA8;
  --color-primary-dark:   #1E3F72;
  --color-primary-light:  #EAF0FB;

  /* ── Backgrounds ── */
  --color-bg-page:        #F2F4F7;
  --color-bg-surface:     #FFFFFF;
  --color-bg-sidebar:     #F8F9FB;

  /* ── Text ── */
  --color-text-primary:   #1A1A2E;
  --color-text-secondary: #5A6478;
  --color-text-price:     #2F5EA8;
  --color-text-link:      #2F5EA8;

  /* ── Borders ── */
  --color-border:         #E2E6EE;
  --color-border-focus:   #2F5EA8;

  /* ── Status badges ── */
  --badge-green-bg:       #E8F5E9;
  --badge-green-text:     #2E7D32;
  --badge-amber-bg:       #FFF8E1;
  --badge-amber-text:     #E65100;
  --badge-blue-bg:        #EAF0FB;
  --badge-blue-text:      #2F5EA8;
  --badge-red-bg:         #FFEBEE;
  --badge-red-text:       #C62828;

  /* ── Feedback ── */
  --color-success:        #2E7D32;
  --color-error:          #C62828;

  /* ── Spacing ── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;

  /* ── Radius ── */
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   14px;
  --radius-pill: 999px;

  /* ── Shadows ── */
  --shadow-card:       0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-card-hover: 0 4px 12px rgba(47,94,168,0.12);
  --shadow-dropdown:   0 8px 24px rgba(0,0,0,0.12);
}
```

---

## 3. Typography

Never use hardcoded font sizes. Use these rules consistently:

| Role | Size | Weight | Color |
|---|---|---|---|
| Page title (h1) | 24px | 700 | `--color-text-primary` |
| Section heading (h2) | 18px | 600 | `--color-text-primary` |
| Card title | 16px | 600 | `--color-text-primary` |
| Body / labels | 14px | 400 | `--color-text-secondary` |
| Small / breadcrumb | 13px | 400 | `--color-text-secondary` |
| Price value | 22px | 700 | `--color-text-price` |
| Price unit (/mês) | 13px | 400 | `--color-text-secondary` |
| Button text | 14px | 600 | (per button variant) |
| Badge text | 12px | 500 | (per badge variant) |

---

## 4. Spacing & Radius

Always use spacing tokens. Never write raw pixel values for margin or padding unless they are in the token scale.

```
--space-1 =  4px   → icon gaps, tight padding
--space-2 =  8px   → between inline elements
--space-3 = 12px   → small internal padding
--space-4 = 16px   → standard internal padding
--space-5 = 24px   → card padding, section gaps
--space-6 = 32px   → between cards
--space-7 = 48px   → section vertical spacing
--space-8 = 64px   → page-level vertical spacing
```

```
--radius-sm   =   6px  → badges, small chips
--radius-md   =  10px  → buttons, inputs
--radius-lg   =  14px  → cards, panels
--radius-pill = 999px  → pill buttons, badges
```

---

## 5. Shadows

```
--shadow-card        → default card resting state
--shadow-card-hover  → card on hover or selected state
--shadow-dropdown    → dropdowns and floating panels
```

---

## 6. Buttons

### Primary (solid blue)

```css
background:    var(--color-primary);
color:         #FFFFFF;
border:        none;
border-radius: var(--radius-md);
padding:       10px 20px;
font-size:     14px;
font-weight:   600;
cursor:        pointer;
transition:    background 150ms ease;
```

Hover: `background: var(--color-primary-dark)`

### Secondary (outline blue)

```css
background:    transparent;
color:         var(--color-primary);
border:        1.5px solid var(--color-primary);
border-radius: var(--radius-md);
padding:       10px 20px;
font-size:     14px;
font-weight:   600;
cursor:        pointer;
transition:    background 150ms ease;
```

Hover: `background: var(--color-primary-light)`

### Ghost (neutral outline)

```css
background:    transparent;
color:         var(--color-text-primary);
border:        1.5px solid var(--color-border);
border-radius: var(--radius-md);
padding:       10px 20px;
font-size:     14px;
font-weight:   500;
cursor:        pointer;
```

Hover: `background: var(--color-bg-page)`

### Disabled state (all variants)

```css
opacity:        0.45;
cursor:         not-allowed;
pointer-events: none;
```

### Full-width variant

Add `width: 100%` when a button should span its container (primary CTA in forms and contract flow).

---

## 7. Inputs & Form Controls

### Text input / select

```css
width:         100%;
background:    #FFFFFF;
border:        1.5px solid var(--color-border);
border-radius: var(--radius-md);
padding:       10px 14px;
font-size:     14px;
font-family:   'Inter', sans-serif;
color:         var(--color-text-primary);
outline:       none;
transition:    border-color 150ms ease, box-shadow 150ms ease;
```

Focus:
```css
border-color: var(--color-border-focus);
box-shadow:   0 0 0 3px rgba(47, 94, 168, 0.12);
```

Placeholder: `color: var(--color-text-secondary)`

### Checkbox

```css
width:         18px;
height:        18px;
accent-color:  var(--color-primary);
cursor:        pointer;
```

### Range slider

```css
accent-color: var(--color-primary);
```

### Option card (used in Onboarding)

Two-up layout. Each card:

```css
border:        1.5px solid var(--color-border);
border-radius: var(--radius-lg);
padding:       var(--space-4) var(--space-5);
background:    var(--color-bg-surface);
cursor:        pointer;
transition:    border-color 150ms ease, background 150ms ease;
```

Selected state:
```css
border-color: var(--color-primary);
background:   var(--color-primary-light);
```

---

## 8. Cards

### Default card

```css
background:    var(--color-bg-surface);
border:        1px solid var(--color-border);
border-radius: var(--radius-lg);
padding:       var(--space-5);
box-shadow:    var(--shadow-card);
```

### Card hover

```css
box-shadow:   var(--shadow-card-hover);
border-color: var(--color-primary-light);
```

### Selected / featured card (e.g. "Mais escolhido" plan)

```css
border:     2px solid var(--color-primary);
box-shadow: var(--shadow-card-hover);
```

### Document slot card (upload areas)

```css
border:        1.5px dashed var(--color-border);
border-radius: var(--radius-md);
padding:       var(--space-5);
background:    var(--color-bg-page);
text-align:    center;
cursor:        pointer;
transition:    border-color 150ms ease, background 150ms ease;
```

Hover:
```css
border-color: var(--color-primary);
background:   var(--color-primary-light);
```

Uploaded state:
```css
border-style:  solid;
border-color:  var(--color-success);
background:    var(--badge-green-bg);
```

---

## 9. Badges & Tags

All badges share this base:

```css
display:       inline-flex;
align-items:   center;
border-radius: var(--radius-pill);
padding:       3px 10px;
font-size:     12px;
font-weight:   500;
```

| Variant | Background | Text color |
|---|---|---|
| Green (success, "Aprovado") | `--badge-green-bg` | `--badge-green-text` |
| Amber (warning, "Hospitalar", "Em análise") | `--badge-amber-bg` | `--badge-amber-text` |
| Blue (info, "Ambulatorial", active states) | `--badge-blue-bg` | `--badge-blue-text` |
| Red (error, "Rejeitado") | `--badge-red-bg` | `--badge-red-text` |

---

## 10. Navigation Bar

```css
position:      sticky;
top:           0;
z-index:       100;
height:        64px;
background:    #FFFFFF;
border-bottom: 1px solid var(--color-border);
display:       flex;
align-items:   center;
padding:       0 var(--space-5);
```

**Brand pill** (left side):

```css
background:    var(--color-primary);
color:         #FFFFFF;
border-radius: var(--radius-sm);
padding:       6px 14px;
font-size:     15px;
font-weight:   700;
letter-spacing: -0.3px;
```

**Nav links** (center, desktop only):

```css
font-size:   14px;
font-weight: 500;
color:       var(--color-text-secondary);
```

Hover: `color: var(--color-text-primary)`

**Right side:** ghost "Entrar" button + primary "Cadastrar" button, gap `var(--space-2)`.

**Breadcrumb** (below navbar, above page title):

```css
font-size:  13px;
color:      var(--color-text-secondary);
margin-bottom: var(--space-2);
```

Separator: ` › `

---

## 11. Step Indicator

Used in Onboarding (4 steps) and Contract flow (Documents → LGPD → Signature).

```
[✓]───[✓]───[3]───[ 4 ]
 Cotação  Plano  Docs  Contrato
```

**Completed step circle:**
```css
width:      32px;
height:     32px;
background: var(--color-primary);
color:      #FFFFFF;
border-radius: 50%;
display:    flex;
align-items: center;
justify-content: center;
font-size:  14px;
font-weight: 700;
```
Shows a `✓` checkmark icon.

**Active step circle:**
```css
background: var(--color-primary);
color:      #FFFFFF;
/* same size as above */
```
Shows the step number.

**Upcoming step circle:**
```css
background: #FFFFFF;
border:     1.5px solid var(--color-border);
color:      var(--color-text-secondary);
```
Shows the step number.

**Connector line:**
```css
flex:             1;
height:           2px;
background:       var(--color-border);
```

Completed connector: `background: var(--color-primary)`

**Step label** (below circle):
```css
font-size:   12px;
font-weight: 500;
color:       var(--color-text-secondary);
margin-top:  var(--space-1);
```

Active label: `color: var(--color-primary); font-weight: 600`

---

## 12. Coverage Indicators

Used in Plan Detail and Plan Comparison.

**Included (✓):**
```css
color:       var(--color-success);
font-size:   16px;
font-weight: 700;
```

**Excluded (✗):**
```css
color:       var(--color-error);
font-size:   16px;
font-weight: 700;
```

---

## 13. Compare Bar

Sticky bar at the bottom of Plan List when 2+ plans are selected.

```css
position:    fixed;
bottom:      0;
left:        0;
right:       0;
z-index:     200;
background:  var(--color-primary-light);
border-top:  1px solid var(--color-border);
padding:     var(--space-4) var(--space-5);
display:     flex;
align-items: center;
justify-content: space-between;
```

Left: `"X planos selecionados"` in `--color-primary`, font-weight 600.
Right: Primary button `"Comparar agora ›"`.

---

## 14. Screen-Specific Layouts

---

### Splash Screen

Full-height centered layout. Page background `--color-primary` (solid blue).

- Logo icon: white rounded square, 80×80px, letter "S" in `--color-primary`, font-weight 800, font-size 36px
- Wordmark: "Simplifica" in white, 28px, font-weight 700
- Tagline: "Seu plano de saúde ideal" in white at 80% opacity, 16px
- Separator: 1px horizontal line, white at 20% opacity, width 120px, margin 24px auto
- CTA button: white background, `--color-primary` text, border-radius `--radius-pill`, padding 14px 40px, font-size 16px, font-weight 700
- Secondary link: "Já tenho conta" in white at 80% opacity, underline, font-size 14px, below CTA with 16px gap

---

### Login Screen

Split layout, full viewport height.

**Left panel — 42% width:**
```css
background: var(--color-primary);
display:    flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding:    var(--space-8);
```

Content: logo icon (same as Splash) + wordmark + tagline + a mocked plan preview card (white background, 80% opacity, shows placeholder lines to suggest app content).

**Right panel — 58% width:**
```css
background: var(--color-bg-surface);
display:    flex;
align-items: center;
justify-content: center;
padding:    var(--space-7);
```

Inner card:
```css
width:         100%;
max-width:     440px;
background:    var(--color-bg-surface);
border:        1px solid var(--color-border);
border-radius: var(--radius-lg);
padding:       var(--space-7) var(--space-6);
box-shadow:    var(--shadow-card);
```

Tab switcher ("Entrar" / "Cadastrar"):
```css
display:       flex;
background:    var(--color-bg-page);
border-radius: var(--radius-md);
padding:       4px;
margin-bottom: var(--space-5);
```

Active tab:
```css
background:    #FFFFFF;
border-radius: var(--radius-sm);
box-shadow:    var(--shadow-card);
color:         var(--color-text-primary);
font-weight:   600;
```

Inactive tab: `color: --color-text-secondary`, no background.

Social buttons ("Google", "Apple"): ghost style, side by side, gap `--space-2`.

Divider between password and social buttons: `"ou continue com"` in `--color-text-secondary`, 13px, with horizontal lines either side.

**Mobile:** stack panels vertically. Left panel collapses to a compact header bar showing only brand pill. Right panel takes full height.

---

### Register Screen

Same right-panel card layout as Login (no split — just the centered card on `--color-bg-page`). Fields stacked vertically with `--space-3` gap. LGPD checkbox at the bottom before the CTA.

---

### Onboarding Screen

```
Max-width: 640px, centered on --color-bg-page.
Top: StepIndicator (4 steps)
Below: question card (default card style)
```

Question card padding: `--space-7` top/bottom, `--space-6` left/right.

Option cards: two-column grid with `--space-3` gap. Full-width on mobile.

Number stepper (for "lives" question):
```css
display:       flex;
align-items:   center;
gap:           var(--space-3);
```

`-` and `+` buttons: ghost style, 40×40px square, font-size 20px.
Count display: 40px wide, text-align center, font-size 18px, font-weight 600.

Navigation (Back / Next) row at the bottom of the card:
```css
display:         flex;
justify-content: space-between;
margin-top:      var(--space-6);
```

Back: ghost button. Next/finish: primary button.

---

### Plan List Screen

**Layout (desktop):**
```
┌─────────────────────────────────────────────────────┐
│ Navbar                                              │
├──────────────┬──────────────────────────────────────┤
│              │  Sort bar                            │
│  Filter      ├──────────────────────────────────────┤
│  Sidebar     │  Plan cards grid (3 columns)         │
│  280px       │                                      │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
│ Compare Bar (sticky, appears when ≥2 selected)      │
└─────────────────────────────────────────────────────┘
```

**Filter sidebar:**
```css
width:           280px;
flex-shrink:     0;
background:      var(--color-bg-sidebar);
border-right:    1px solid var(--color-border);
padding:         var(--space-5);
height:          calc(100vh - 64px);
position:        sticky;
top:             64px;
overflow-y:      auto;
```

Filter section label: 13px, font-weight 600, `--color-text-secondary`, uppercase, letter-spacing 0.5px.

Checkboxes: use `accent-color: var(--color-primary)`, label 14px `--color-text-primary`.

"Limpar filtros" button: ghost style, full-width, margin-top `--space-5`.

**Sort bar:**
```css
display:      flex;
gap:          var(--space-2);
margin-bottom: var(--space-4);
```

Sort pill (inactive):
```css
border:        1px solid var(--color-border);
border-radius: var(--radius-pill);
padding:       6px 16px;
font-size:     14px;
color:         var(--color-text-secondary);
background:    var(--color-bg-surface);
cursor:        pointer;
```

Sort pill (active):
```css
background: var(--color-primary);
color:      #FFFFFF;
border-color: var(--color-primary);
```

**Plan card grid:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4)` — 2 columns on tablet, 1 on mobile.

**Plan card anatomy:**
```
┌─────────────────────────────────┐
│ [Logo]  Plan Name      R$ 389   │
│         Operator • Cat    /mês  │
│         [Badge: Ambulatorial]   │
│                                 │
│ 42 hospitais • Nacional         │
│                                 │
│ [Ver detalhes]  [+ Comparar]    │
└─────────────────────────────────┘
```

- Logo placeholder: 48×48px, `--color-primary-light` background, `--radius-sm`, letter initial in `--color-primary`
- Plan name: 16px, font-weight 600, `--color-text-primary`
- Operator • Category: 13px, `--color-text-secondary`
- Price: 22px, font-weight 700, `--color-text-price`; `/mês` 13px `--color-text-secondary` next to it
- Network info: 13px, `--color-text-secondary`
- Buttons row: `--space-2` gap, "Ver detalhes" is secondary, "+ Comparar" is ghost (becomes "✓ Adicionado" in `--color-primary` when selected)

---

### Plan Detail Screen

Single column, max-width 800px, centered.

**Header block** (inside a card):
```
[Logo 64px]  Plan Name (h1)      R$ 389/mês
             Operator • Category  [Badge]
             ANS: 123456
```

**Coverage table:**

```css
width:           100%;
border-collapse: collapse;
margin-top:      var(--space-5);
```

Row:
```css
border-bottom: 1px solid var(--color-border);
padding:       var(--space-3) var(--space-4);
```

Label column: 60% width, 14px, `--color-text-primary`.
Value column: 40% width, text-align center. Use ✓ or ✗ per Section 12.

Section header row ("Cobertura", "Valores"):
```css
background:  var(--color-bg-page);
font-size:   13px;
font-weight: 600;
color:       var(--color-text-secondary);
```

**Sticky footer:**
```css
position:      sticky;
bottom:        0;
background:    var(--color-bg-surface);
border-top:    1px solid var(--color-border);
padding:       var(--space-4) var(--space-5);
display:       flex;
gap:           var(--space-3);
justify-content: flex-end;
```

Buttons: secondary "Adicionar à comparação" + primary "Quero contratar".

---

### Plan Comparison Screen

Full-width table. No max-width constraint.

**Column structure:**
```
┌──────────────┬───────────────┬───────────────┬───────────────┬───────┐
│ (empty)      │  Plan 1 ★     │  Plan 2       │  Plan 3       │  + Add│
│              │  [featured]   │               │               │       │
├──────────────┼───────────────┼───────────────┼───────────────┼───────┤
│ Cobertura    (section header row, full-width, grey background)       │
├──────────────┼───────────────┼───────────────┼───────────────┼───────┤
│ Prevenção    │      ✓        │      ✓        │      ✓        │       │
│ Restauração  │      ✓        │      ✓        │      ✗        │       │
│ ...          │               │               │               │       │
├──────────────┼───────────────┼───────────────┼───────────────┼───────┤
│              │ [Contratar]   │ [Contratar]   │ [Contratar]   │       │
└──────────────┴───────────────┴───────────────┴───────────────┴───────┘
```

Label column: 180px, `--color-text-secondary`, 14px.

Plan column header:
```css
padding:    var(--space-4);
text-align: center;
```

Featured plan column header background: `var(--color-primary-light)`.
A thin 3px bar at the top of the featured column in `--color-primary`.

"Remover" link: 12px, `--color-text-secondary`, underline, cursor pointer. Appears below price in column header.

Section header rows:
```css
background:  var(--color-bg-page);
font-size:   13px;
font-weight: 600;
color:       var(--color-text-secondary);
padding:     var(--space-2) var(--space-4);
text-transform: uppercase;
letter-spacing: 0.4px;
```

Alternating data rows: even rows `--color-bg-surface`, odd rows `--color-bg-page`.

CTA row at bottom:
- Featured plan: primary button "Contratar [Plan Name]"
- Other plans: secondary (outline) button

"+ Adicionar" column (rightmost, if fewer than 4 plans): ghost style, dashed border, centered `+` icon + "Adicionar" label.

---

### Accredited Network Screen

Two-column layout on desktop:

```
┌──────────────────────┬───────────────────────────────┐
│  Provider list       │  (list continues or           │
│  480px               │   placeholder for map area)   │
└──────────────────────┴───────────────────────────────┘
```

Search bar full-width above both columns:
```css
border:        1.5px solid var(--color-border);
border-radius: var(--radius-md);
padding:       10px 14px 10px 40px;  /* 40px left for search icon */
font-size:     14px;
```

Type filter tabs ("Hospitais", "Clínicas", "Laboratórios", "Farmácias"):
```css
display:       flex;
gap:           var(--space-2);
margin:        var(--space-4) 0;
```

Active tab: `background: var(--color-primary); color: #fff; border-radius: var(--radius-pill); padding: 6px 16px`
Inactive tab: ghost pill style.

**Provider card:**
```
[Icon 40px]  Hospital Albert Einstein          ★ 4.8
  H+         Morumbi, SP
             Seg-Dom • 24h • 3,2 km
             [Badge: Alta complexidade]
```

Icon: 40×40px rounded square. Hospital = `--color-primary` bg, white letter. Clinic = teal-ish (`#00796B`) bg. Lab = amber bg.

Pagination row below list: `← Anterior  1  2  3  Próximo →`, 14px, `--color-text-secondary`, active page in `--color-primary`.

Right side: show a mocked map placeholder (a `--color-primary-light` rectangle with a subtle grid and colored circle markers matching the wireframe). Map is not functional — it is a static visual.

---

### Contract Start Screen

Max-width 600px, centered.

Summary card (default card style):
```
[Logo 48px]  Plan Name — Operator         R$ 389/mês
             Individual • Proposta #2025  Vencimento dia 10
             [Badge: Em análise]
```

"O que acontece a seguir" section (below card):
Numbered steps in a vertical list:
```css
display:        flex;
flex-direction: column;
gap:            var(--space-4);
margin:         var(--space-5) 0;
```

Each step row:
- Number circle: 28px, `--color-primary` bg, white text, font-weight 700, border-radius 50%
- Label: 14px, `--color-text-primary`, font-weight 500
- Description: 13px, `--color-text-secondary`

Button row (bottom): "Escolher outro plano" (ghost, left) + "Continuar" (primary, right).

---

### Document Upload Screen

Max-width 900px, centered. Three-column layout on desktop: "Documentos necessários" (left) | "Envio" (center) | "Resumo & LGPD" (right).

**Left column — document checklist:**
Required items in `--color-text-primary`, optional items in `--color-text-secondary` with italic.
Checkmark appears next to each uploaded document.

**Center column — upload zones:**
Three document slot cards (dashed card style from Section 8).

Each slot:
- Large `+` icon (32px, `--color-text-secondary`) when empty
- Slot label: 14px, font-weight 500
- After upload: show filename + file size + green checkmark

Caption below slots: `"Arrastar ou clicar para enviar • PDF, JPG ou PNG • máx. 5MB"`, 12px, `--color-text-secondary`.

**Right column — summary & LGPD:**
Read-only summary of selected plan. Below it, LGPD consent checkbox and CTA button.

StepIndicator at top: 4 steps (Cotação ✓ | Plano ✓ | Documentos ← active | Contrato).

---

### LGPD Consent Screen

Max-width 560px, centered card.

StepIndicator: step 2 of 3 (Documents | LGPD ← active | Signature).

Scrollable text block:
```css
max-height:    240px;
overflow-y:    auto;
border:        1px solid var(--color-border);
border-radius: var(--radius-md);
padding:       var(--space-4);
font-size:     14px;
color:         var(--color-text-secondary);
line-height:   1.6;
background:    var(--color-bg-page);
```

Checkbox row below text block: `--space-3` gap between checkbox and label. Label 14px `--color-text-primary`.

"Autorizar e assinar" button: primary, full-width, disabled until checkbox is checked.

"Não autorizo" link: centered below button, 14px, `--color-text-secondary`, underline.

**Rejection modal:**
```css
position:      fixed;
inset:         0;
background:    rgba(0,0,0,0.45);
display:       flex;
align-items:   center;
justify-content: center;
z-index:       300;
```

Inner panel: default card, max-width 400px. Title 18px font-weight 600. Two buttons: "Cancelar contratação" (ghost) + "Voltar" (primary).

---

### Signature Screen

Max-width 560px, centered card.

StepIndicator: step 3 of 3.

Canvas signature pad:
```css
width:         100%;
height:        200px;
border:        1.5px solid var(--color-border);
border-radius: var(--radius-md);
background:    var(--color-bg-page);
cursor:        crosshair;
touch-action:  none;
```

Below canvas: "Limpar" ghost button (left) + "Usar nome completo" ghost button (right).

After drawing begins, show a subtle instruction "Assine dentro do campo acima" disappear.

"Assinar e enviar proposta" button: primary, full-width, margin-top `--space-5`.

Loading state (2s after tap): replace button text with a spinner + "Enviando proposta…", disable button.

---

### Proposal Status Screen

Two-column layout on desktop (60% / 40%), single column on mobile.

**Left column — progress timeline:**

Timeline container:
```css
display:       flex;
flex-direction: column;
gap:           0;
```

Each step row:
```
[Circle]─┐
          │ connector line (32px height)
[Circle]─┘
```

Step circle: 40px diameter.
- Completed: `--color-primary` background, white `✓`
- Active: white background, `--color-primary` 2px border, `--color-primary` step number + pulsing ring animation:

```css
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(47, 94, 168, 0.3); }
  70%  { box-shadow: 0 0 0 10px rgba(47, 94, 168, 0); }
  100% { box-shadow: 0 0 0 0 rgba(47, 94, 168, 0); }
}
animation: pulse-ring 2s ease-out infinite;
```

- Pending: white background, `--color-border` 1.5px border, `--color-text-secondary` number.

Step label: 15px, font-weight 600, `--color-text-primary` (completed/active) or `--color-text-secondary` (pending).
Sub-label: 13px, `--color-text-secondary` (e.g. "Aguardando aprovação").
Date/deadline chip: `--badge-blue-bg` / `--badge-blue-text` badge when present.

Connector line between circles:
```css
width:      2px;
flex:       1;
min-height: 32px;
background: var(--color-border);
margin:     0 auto; /* centered under circle */
```

Completed connector: `background: var(--color-primary)`.

**Right column — documents & info:**

Document list card (default card style). Each document row:
```
[PDF icon]  filename.pdf              ✓
            128 KB • Aprovado
```

PDF icon: 36×36px, `--badge-red-bg` background, "PDF" label in `--badge-red-text`, 10px font-weight 700, border-radius `--radius-sm`.

Approved checkmark: `--color-success`, font-size 18px.

"+ Adicionar documento" link button: secondary outline, full-width, margin-top `--space-3`.

**Alert info box:**
```css
background:   var(--badge-amber-bg);
border-left:  4px solid var(--badge-amber-text);
border-radius: var(--radius-md);
padding:      var(--space-4);
margin-top:   var(--space-4);
font-size:    14px;
color:        var(--badge-amber-text);
```

**Contact row** (bottom of right column):
"WhatsApp" button (green: `#25D366` background, white text) + "Ligar agora" ghost button, side by side.

**"Voltar ao início"** link: centered below both columns, 14px, `--color-text-link`.

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | < 640px | Single column everywhere, no sidebar, full-width cards |
| Tablet | 640px–1024px | Plan list 2 columns, sidebar hidden (filter behind button) |
| Desktop | > 1024px | All layouts as specified above |

---

## Do Not

- Do not use any color that is not in Section 2's token list
- Do not use any font other than Inter
- Do not hardcode pixel values for margin/padding outside the spacing scale
- Do not add gradients, shadows beyond the defined set, or blur effects
- Do not create new component variants not listed here
- Do not change any routing or data logic — this document covers visual style only