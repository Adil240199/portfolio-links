---
name: Focused Studio
description: A restrained visual direction for a varied collection of useful frontend projects.
colors:
  ink: "oklch(25% 0.028 240)"
  paper: "oklch(98% 0.008 90)"
  surface: "oklch(94% 0.01 240)"
  muted: "oklch(52% 0.018 240)"
  forest: "oklch(39% 0.055 155)"
  forest-on-dark: "oklch(78% 0.06 155)"
  wood: "oklch(38% 0.035 55)"
  rule: "oklch(83% 0.014 240)"
  dark-panel: "oklch(22% 0.025 240 / 0.9)"
typography:
  display:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 7vw, 5rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  circle: "50%"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.forest}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "44px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: Focused Studio

## 1. Overview

**Creative North Star: "The Focused Studio"**

The portfolio is a collection, not a single product shell. Each project keeps
its own character while sharing a quiet foundation: clear hierarchy, useful
controls, and a restrained palette. The CV uses a more editorial two-column
layout; the games keep attention on the puzzle; Momentum preserves its
photographic backdrop and puts the clock first.

Controls should feel tactile and confident without competing with the task.
Surfaces stay flat unless separation improves clarity. Clutter, excessive
gradients, bright accents, and distracting effects are explicitly rejected.

**Key Characteristics:**
- A muted navy, warm paper, neutral gray, dark green, and brown palette.
- System typography with clear scale and comfortable line spacing.
- Direct feedback, visible keyboard focus, and reduced-motion support.
- Layouts that adapt structurally instead of shrinking controls.

## 2. Colors

Tinted neutrals carry most surfaces. Green marks a meaningful action or correct
state; brown is reserved for an incorrect selection or warm detail.

### Primary
- **Deep ink:** The main text and primary action color on light project surfaces.
- **Forest:** A restrained action and success color on light surfaces.

### Secondary
- **Forest on dark:** A lighter green reserved for controls over Momentum's dark photo treatment.
- **Walnut:** An error state for incorrect puzzle selections, not a decorative accent.

### Neutral
- **Warm paper:** The primary light surface.
- **Cool surface:** A secondary background for page sections and puzzle work areas.
- **Muted text:** Supporting text and secondary labels.
- **Fine rule:** Subtle separators and unselected cell boundaries.
- **Night panel:** A readable dark panel over Momentum's background image.

**The Quiet Contrast Rule.** Keep accents purposeful. If removing a color does
not make a state harder to understand, do not use it.

## 3. Typography

**Display Font:** Segoe UI, system-ui, sans-serif  
**Body Font:** Segoe UI, system-ui, sans-serif  
**Label Font:** Segoe UI, system-ui, sans-serif

**Character:** Quiet, capable, and approachable. Strong scale and weight
contrast create hierarchy without adding a decorative font or external type
dependency.

### Hierarchy
- **Display** (650, responsive 2rem to 5rem, tight leading): Project titles and the CV name.
- **Headline** (600 to 650, 2rem to 3.5rem): Main headings in games and tools.
- **Title** (600, 1rem to 1.35rem): Section and panel headings.
- **Body** (400, 1rem, 1.55 line-height): Instructions, lists, and supporting content.
- **Label** (700, 0.75rem, tracked): Short section labels and compact status text.

**The One-Family Rule.** Use the system family throughout each project. Let
scale and weight, not extra font families, distinguish the work.

## 4. Elevation

Surfaces are flat by default. Tonal contrast and fine rules separate content;
shadows are not part of the standard component vocabulary. Momentum uses a
solid translucent night panel only where text must remain readable over
photography.

**The Flat-By-Default Rule.** Add a layer only when it clarifies a control or
keeps content legible.

## 5. Components

Controls are tactile and confident. Their shape stays simple, their labels stay
literal, and their focus state remains visible.

### Buttons
- **Shape:** Gently squared corners (4px).
- **Primary:** Deep ink surface, warm-paper text, and 8px by 16px padding.
- **Hover / Focus:** Green hover state; a visible 2px or 3px focus outline.
- **Quiet:** Transparent surface with ink text and the same shape as primary actions.

### Inputs / Fields
- **Style:** Tinted surface, fine neutral rule, and a 4px corner.
- **Focus:** Visible green outline with a small offset.
- **Disabled:** Reduced emphasis; never communicate disabled state through color alone.

### Game Cells
- **Shape:** Square, unrounded cells in a consistent grid.
- **States:** Ink fill for a correct selection, walnut fill for an incorrect selection, and a clear paper surface when unmarked.
- **Feedback:** State is also exposed through an accessible label and pressed state.

### Panels
- **Style:** Flat, readable surfaces with a fine border where they overlap content.
- **Behavior:** Expand inline; controls expose their open state to assistive technology.

## 6. Do's and Don'ts

### Do:
- **Do** use semantic HTML, keyboard-operable controls, and visible focus.
- **Do** keep game instructions and state feedback adjacent to the controls they describe.
- **Do** respect reduced-motion preferences and keep transitions between 150ms and 250ms.
- **Do** use project imagery where it carries meaning, especially the CV portrait and Momentum backgrounds.
- **Do** use the palette tokens as roles, not decoration.

### Don't:
- **Don't** add cluttered interfaces and unnecessary decoration.
- **Don't** add excessive gradients, bright accents, and distracting effects.
- **Don't** add overcomplicated architecture or interactions that obscure each project's purpose.
- **Don't** use pure black or pure white for large surfaces.
- **Don't** add decorative motion, nested cards, or colored side stripes.
