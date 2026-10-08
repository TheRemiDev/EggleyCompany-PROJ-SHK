# Charte de marque — Eggley Company v3.0

> Dernière mise à jour : 8 octobre 2026
> Statut : Validée pour le site v2

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #214285 |
| Secondary Color | #79C481 |
| Primary Font | Fraunces (titres) / Inter (texte) |
| Voice | Expert, fiable, sobre, chaleureux |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Eggley Blue | #214285 | rgb(33,66,133) | Bleu du logo : liens, boutons, titres d'accent |
| Eggley Navy | #0E1F45 | rgb(14,31,69) | Fonds sombres, en-têtes de section, pied de page |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Eggley Green | #79C481 | rgb(121,196,129) | Vert du logo : filets, pictos sur fond sombre, Bioperfect |
| Leaf Green | #2F7A3B | rgb(47,122,59) | Vert lisible sur fond clair (texte, badges) |
| Accent Gold (cacao) | #A16207 | rgb(161,98,7) | Accent rare : numéros de chapitre, détails éditoriaux |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Paper | #FBFAF7 | rgb(251,250,247) | Fond de page |
| Ivory | #F3EFE7 | rgb(243,239,231) | Sections alternées, cartes |
| Sand | #E4DDCF | rgb(228,221,207) | Bordures, séparateurs |
| Ink | #10172A | rgb(16,23,42) | Titres |
| Text | #394055 | rgb(57,64,85) | Texte courant |
| Muted | #5E6579 | rgb(94,101,121) | Légendes, texte secondaire |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| Success | #2F7A3B | Confirmation d'envoi |
| Error | #B42318 | Erreurs de formulaire |
| Info | #214285 | Messages d'information |

### Accessibility

- Ink sur Paper : 16:1 (AAA)
- Text sur Paper : 10:1 (AAA)
- Muted sur Paper et Ivory : > 5,2:1 (AA)
- Eggley Blue sur Paper : 9:1 (AAA)
- Leaf Green sur Paper : 5,3:1 (AA)
- Accent Gold : #895306 pour le texte (5,6:1 sur Paper), #A16207 réservé aux grands chiffres décoratifs
- Bordure des champs : #8C8473 (3,7:1, contraste non textuel AA)
- Eggley Green uniquement sur fond Navy (6,9:1) ou en décor

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Fraunces', Georgia, 'Times New Roman', serif;
--font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
```

Polices auto-hébergées (woff2 variables) : aucune requête vers Google.

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| Display (hero) | 112px | 44px | 350 | 0.98 |
| H1 | 80px | 40px | 350 | 1.02 |
| H2 | 56px | 32px | 380 | 1.06 |
| H3 | 22px | 20px | 600 (Inter) | 1.3 |
| Overline | 12px | 12px | 600 (Inter, capitales, +0.16em) | 1.4 |
| Body | 17px | 16px | 400 | 1.65 |
| Body Large | 20px | 18px | 400 | 1.6 |
| Small | 14px | 14px | 400 | 1.5 |

Les titres en Fraunces (taille optique automatique, axe opsz 9–144) utilisent l'italique pour mettre un mot en valeur (« *avec exigence* »), jamais le gras.

---

## 3. Logo Usage

### Variants

| Variant | File | Use Case |
|---------|------|----------|
| Monogramme couronne + EC | eggley-mark.png | En-tête, favicon, pied de page |
| Monogramme Bioperfect | bioperfect-mark.png | Pages et blocs Bioperfect |

### Clear Space

Espace minimal autour du monogramme = la moitié de sa hauteur. Sur fond sombre, le monogramme est posé sur une pastille blanche.

### Don'ts

- Ne pas recolorer ni déformer le monogramme
- Ne pas le poser directement sur une photo
- Ne pas utiliser le logo Bioperfect pour Eggley Company et inversement

---

## 4. Voice & Tone

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Expert** | Maîtrise du négoce, de la douane et de la sécurité alimentaire |
| **Fiable** | Partenaires de longue date, transactions transparentes |
| **Sobre** | Des faits, pas de superlatifs |
| **Chaleureux** | Entreprise familiale, engagée pour l'Afrique de l'Ouest |

### Voice Chart

| Trait | We Are | We Are Not |
|-------|--------|------------|
| Expert | Précis, concret | Jargonneux |
| Fiable | Factuel, transparent | Prometteur à l'excès |
| Sobre | Clair, direct | Froid, administratif |
| Chaleureux | Humain, engagé | Familier |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Marketing | Assuré, factuel | « Des matières premières sourcées avec exigence. » |
| Formulaire | Calme, guidant | « Précisez si possible les quantités souhaitées. » |
| Erreur | Calme, solution | « Ce champ est obligatoire. » |
| Succès | Bref, chaleureux | « Merci, votre message a bien été envoyé. » |

### Prohibited Terms

| Avoid | Reason |
|-------|--------|
| Leader, n°1 | Non vérifiable |
| Révolutionnaire | Hors ton |
| Chiffres inventés | Ne publier que des faits fournis par le client |

---

## 5. Imagery Guidelines

### Photography Style

- **Sujets :** matières premières en gros plan (café, cacao, cajou), fruits tropicaux, logistique maritime
- **Source :** photographies sous licence Unsplash (usage commercial libre) ; crédits listés dans les mentions légales
- **Traitement :** couleurs naturelles chaudes ; sur fond sombre, voile Navy dégradé
- **Composition :** cadrages serrés, matière qui remplit l'image

### Icons

- Style : Lucide, contour 1.75px, grille 24px
- Couleur : Eggley Blue sur clair, Eggley Green sur sombre

---

## 6. Design Components

### Buttons

| Type | Background | Text | Border Radius |
|------|------------|------|---------------|
| Primary | #214285 | #FFFFFF | 999px |
| Secondary | Transparent | #10172A | 999px |
| On dark | #FBFAF7 | #0E1F45 | 999px |

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 999px |
| Cards | 6px |
| Images | 4px |
| Inputs | 6px |

Angles quasi droits : registre éditorial et institutionnel, plus sobre que la v1.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025 | Site v1 (Plus Jakarta Sans, bleu/vert) |
| 2.0 | 2026-10-08 | Registre éditorial : Playfair Display + Inter, neutres chauds, accent Cacao Gold |
| 3.0 | 2026-10-08 | Fraunces (taille optique), photographie plein cadre, carte des flux, en-tête sur image |
