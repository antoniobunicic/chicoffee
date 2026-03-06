 i ko# CHI Coffee — Web Project

## Project Overview

Web stranica za **CHI Coffee**, specialty kafić u Zagrebu. React aplikacija.

## About CHI Coffee

**Lokacija:** Preradovićeva 34, Zagreb, Croatia

**Osnivači:** Zoja Begović i Josip Mijatović

**Koncept:** Specialty coffee bar u kombinaciji s NAR concept storeom — sestrinskim prostorom s keramikom, tekstilima i ručno izrađenim predmetima.

**Filozofija:** Fokus na specialty kavi koja se sourca, prži i priprema vlastitim rukama. Tjedna rotacija single-origin selekcija, filter preparacije i ceremonijalna matcha. "Sve što nudimo ono je što bismo i sami pili."

**Ponuda:**
- Specialty kava (single-origin, filter, espresso)
- Ceremonijalna matcha
- Prirodna vina (rotacijska selekcija)
- Prirodni sokovi i kombucha
- Peciva (focaccia, cimetni rolice, kolači)
- Planirani jednostavni brunch meni

**Prostor:** Prirodni materijali, mirne površine, pijesak-tonirana paleta boja, ručno izrađeni masivni drveni centralni stol, mekana koža. "Prostor s vlastitim mirom, karakterom i osjećajem trajnosti."

**Budući planovi:** Cupping sessioni, tastinzi, predavanja i community eventi.

## Design & Branding

**Primarna brend boja:** `#B25C29` (topla terra cotta/smeđe-narančasta)

**Estetika:** Moderna, organska, LA specialty coffee vibes — biljke, organski oblici, prirodni materijali, mirni i elegantan prostor.

**Layout:** Sadržaji idu od ruba do ruba ekrana (full-width), bez velikih margina sa strana.

## Tech Stack

- **Framework:** React
- **Kod:** Clean code, best practices frontend developmenta i Reacta

## File Structure

```
chicoffee/
├── CLAUDE.md
├── src/
│   ├── assets/
│   │   └── images/          ← sve slike idu ovdje (premješteno iz /images)
│   ├── components/
│   ├── sections/
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

**Napomena:** Slike iz `/images` folderu treba premjestiti u `src/assets/images/`.

## Images

Sve slike su u `images/` (za premještanje u `src/assets/images/`):

- `chi-coffee-x-nar-concept-store-3.jpg` — **Hero slika**
- `logo.svg` — Glavni logo (SVG, preferirati nad .png/.jpg verzijama)
- `logo-removed-bg.png` — Logo bez pozadine
- `logo.jpg` — Logo JPG
- `chi-coffee-x-nar-concept-store-cover.jpg`
- `chi-coffee-x-nar-concept-store-2.jpg`
- `chi-coffee-x-nar-concept-store-19.jpg`
- `chi-coffee-x-nar-concept-store-34.jpg`
- `chi-coffee-x-nar-concept-store-37.jpg`
- `Chi-X-Nar-1-1.jpg`
- `Chi-X-Nar-2.jpg.webp`
- `Chi-X-Nar-3-1.jpg`
- `CHI-coffee-shop-bar-zagreb-vogue-adria-7.jpg`
- `CHI-coffee-shop-bar-zagreb-vogue-adria-31.jpg`
- `CHI-coffee-shop-bar-zagreb-vogue-adria-38.jpg`
- `CHI-coffee-shop-bar-zagreb-vogue-adria-39.jpg`
- `CHI-coffee-shop-bar-zagreb-vogue-adria-51.jpg`
- `CHI-coffee-shop-bar-zagreb-vogue-adria-52.jpg`
- `CHI-coffee-shop-bar-zagreb-vogue-adria-56.jpg`

## Hero Section

- **Pozadinska slika:** `chi-coffee-x-nar-concept-store-3.jpg` (full-width, full-height)
- **Logo:** `logo.svg` centriran u sredini hero sekcije
- **Navigacija:** U gornjoj trećini, horizontalno centrirana (middle third), **nije sticky** — skroluje zajedno s hero sekcijom

## Navigation

Navigacijske opcije su smještene u gornjoj trećini ekrana, horizontalno centrirane, i **scrollaju zajedno s hero sekcijom** (nisu sticky/fixed).

## Content Sections (prijedlog)

1. **Hero** — full-screen, pozadinska slika, logo u sredini, nav u gornjoj trećini
2. **O nama** — filozofija, priča osnivača
3. **Kava & Ponuda** — specialty kava, matcha, vina, pastries
4. **Prostor** — galerija, opis ambijenta
5. **NAR Concept Store** — sestrinski prostor
6. **Posjeti nas** — lokacija (Preradovićeva 34), radno vrijeme, kontakt
