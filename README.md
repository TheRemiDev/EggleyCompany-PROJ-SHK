# Eggley Company — site vitrine

Site statique (HTML/CSS/JS, sans dépendance ni étape de build) d'Eggley Company Import Export / Bioperfect.

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil |
| `apropos.html` | À propos — qui sommes-nous |
| `services.html` | Offres et services (gammes de produits) |
| `bioperfect.html` | Marque Bioperfect |
| `contact.html` | Formulaire et coordonnées |
| `merci.html` | Confirmation d'envoi du formulaire |
| `mentions-legales.html` | Mentions légales et conditions d'utilisation |
| `confidentialite.html` | Politique de confidentialité et cookies (RGPD) |
| `plan-du-site.html`, `404.html` | Plan du site, page d'erreur |

Les noms `index.html`, `apropos.html`, `services.html` et `bioperfect.html` reprennent ceux de l'ancien site pour conserver le référencement ; `.htaccess` redirige `contact.php` vers `contact.html`.

## Déploiement

Copier tout le contenu du dépôt (sauf `.claude/` et `README.md`) à la racine du domaine `eggleycompany.net`. Sur Apache, `.htaccess` gère HTTPS, la page 404, les redirections et le cache.

## Avant la mise en ligne

1. **Mentions légales** : compléter le capital social et les coordonnées de l'hébergeur (zones surlignées dans `mentions-legales.html`).
2. **Formulaire** : il passe par [FormSubmit](https://formsubmit.co) vers `sce.commercial@eggleycompany.net`. Au premier envoi, FormSubmit envoie un e-mail d'activation à cette adresse : cliquer sur le lien pour activer le formulaire.
3. Vérifier que les numéros de téléphone (repris du catalogue) et le bureau de Rennes sont toujours d'actualité.
