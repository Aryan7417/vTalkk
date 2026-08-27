---
name: VTalk
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e7bdb7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ad8883'
  outline-variant: '#5d3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#ff5545'
  on-primary-container: '#5c0002'
  inverse-primary: '#c0000a'
  secondary: '#c8c6c8'
  on-secondary: '#303032'
  secondary-container: '#474649'
  on-secondary-container: '#b6b4b7'
  tertiary: '#c8c6c8'
  on-tertiary: '#303032'
  tertiary-container: '#919092'
  on-tertiary-container: '#29292b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930005'
  secondary-fixed: '#e4e2e4'
  secondary-fixed-dim: '#c8c6c8'
  on-secondary-fixed: '#1b1b1d'
  on-secondary-fixed-variant: '#474649'
  tertiary-fixed: '#e4e2e4'
  tertiary-fixed-dim: '#c8c6c8'
  on-tertiary-fixed: '#1b1b1d'
  on-tertiary-fixed-variant: '#474649'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  margin-mobile: 16px
  margin-desktop: 24px
  gutter: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system for this premium video calling application is built on a foundation of **Minimalism** with a **Dark Mode** first philosophy. It prioritizes clarity and focus, ensuring the video feed and the user remain the primary elements of the interface. The brand personality is professional, precise, and sophisticated, avoiding unnecessary decorative elements in favor of functional elegance.

The aesthetic utilizes high-contrast accents against a deep, light-absorbing background to create a sense of cinematic depth. By stripping away traditional borders and gradients, the system achieves a "lightweight" feel that emphasizes speed and modern performance.

## Colors

The palette is rooted in a pure black (`#0A0A0A`) core to allow the hardware's OLED panels to blend seamlessly with the software. 

- **Primary:** A vivid, pure Red (`#FF3B30`) is used sparingly for critical actions, notifications, and active states. 
- **Surface Tiers:** Backgrounds transition from the absolute black of the base to `#121212` for primary containers and `#1C1C1E` for elevated cards.
- **Text:** High-contrast white is reserved for primary information, while light-gray is utilized for secondary metadata and inactive states to reduce visual noise.

## Typography

This design system uses **Inter** for its neutral, systematic character. The type scale is tight and functional. 

- **Weight Usage:** Bold weights (700) are reserved for primary headings. Medium weights (500/600) are used for interactive labels and buttons to ensure legibility against dark backgrounds.
- **Letter Spacing:** Headlines utilize slightly negative tracking for a more premium, compact feel. Labels use increased tracking for maximum clarity at small sizes.
- **Hierarchy:** Contrast is established through color (White vs. Light Gray) rather than excessive font size variations.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for handheld Android devices. It utilizes an 8px base grid system, but allows for 4px increments for tighter component internals.

- **Margins:** Standard mobile views use a 16px side margin. In video-call views, content should utilize "Safe Areas" to avoid overlap with camera cutouts and system bars.
- **Stacking:** Elements are grouped in logical "stacks" (8px for related items, 16px for distinct sections).
- **Video Grid:** In multi-person calls, use a dynamic masonry or equal-split layout with a minimum 4px gap between video feeds to maintain the "lightweight" aesthetic.

## Elevation & Depth

This design system eschews traditional heavy shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Depth through Luminance:** Elevated elements (like action sheets or cards) are identified by being slightly lighter than the background (`#1C1C1E` on top of `#0A0A0A`).
- **Glow Effects:** The only exception to the "no gradient/no shadow" rule is a subtle, high-diffusion red glow (10-15% opacity) used exclusively behind the primary logo or active "Live" indicators to create a "premium pulse" effect.
- **Borders:** Use 1px solid borders in `#2C2C2E` for card definitions where tonal separation is insufficient.

## Shapes

The shape language is consistently **Rounded**. The standard radius for cards and major containers is 16px (`rounded-lg`), providing a friendly, modern contrast to the sharp typography and dark colors.

- **Interactive Elements:** Buttons and input fields follow the `rounded-lg` (16px) or `rounded-xl` (24px) pattern.
- **Video Feeds:** Individual video thumbnails must have a minimum of 12px corner radius to maintain the soft-tech aesthetic.

## Components

### Buttons
- **Primary:** Solid Red (`#FF3B30`) with White text. High-visibility for "End Call" or "Join".
- **Secondary:** Surface Gray (`#1C1C1E`) with White text. Used for "Mute," "Flip Camera," or "Chat."
- **Ghost:** Transparent background with `#B0B0B0` icons for low-priority actions.

### Cards
Cards should have no background blur; they use solid `#121212` or `#1C1C1E`. Padding should be a consistent 16px. Use thin-line icons (1.5px stroke width) within cards for a sophisticated look.

### Input Fields
Inputs are dark-themed with a 1px border. The border remains `#2C2C2E` in resting state and turns `#FF3B30` only on focus. No drop shadows.

### Chips & Status
- **Active Call Status:** A small `#FF3B30` pill with a subtle 4px blur glow.
- **Participant Chips:** Semi-transparent black (`rgba(0,0,0,0.5)`) overlays on video feeds with 12px rounding.

### Iconography
Use thin-line, geometric icons. Avoid filled icons unless the state is "Active" (e.g., Microphone Muted). Icons should be 24px on a 48px touch target for Android compliance.