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

Les URL sont propres (sans `.html`) : `/apropos`, `/services`, `/contact`… Le `.htaccess` sert le bon fichier, redirige en 301 les anciennes adresses (`/apropos.html`, `/contact.php`, `/index.html`…), force HTTPS et le domaine sans `www`.

## Déploiement sur Apache 2 (Debian / Ubuntu)

Aucun PHP n'est nécessaire : le formulaire passe par FormSubmit.

```bash
sudo apt update
sudo apt install -y apache2 rsync
sudo a2enmod rewrite headers expires deflate
sudo mkdir -p /var/www/eggleycompany.net

sudo tee /etc/apache2/sites-available/eggleycompany.net.conf > /dev/null <<'CONF'
<VirtualHost *:80>
    ServerName eggleycompany.net
    ServerAlias www.eggleycompany.net
    DocumentRoot /var/www/eggleycompany.net
    <Directory /var/www/eggleycompany.net>
        Options -Indexes +FollowSymLinks -MultiViews
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/eggleycompany_error.log
    CustomLog ${APACHE_LOG_DIR}/eggleycompany_access.log combined
</VirtualHost>
CONF

sudo a2ensite eggleycompany.net.conf
sudo a2dissite 000-default.conf
sudo apache2ctl configtest && sudo systemctl reload apache2

# HTTPS (les DNS doivent pointer vers le serveur)
sudo apt install -y certbot python3-certbot-apache
sudo certbot --apache -d eggleycompany.net -d www.eggleycompany.net --redirect

# Mise en ligne / mise à jour des fichiers
git clone -b claude/blissful-davinci-k26pwu https://github.com/theremidev/eggleycompany-proj-shk.git /tmp/eggley   # ou : git -C /tmp/eggley pull
sudo rsync -a --delete --exclude='.git' --exclude='.claude' --exclude='.gitignore' --exclude='README.md' /tmp/eggley/ /var/www/eggleycompany.net/
sudo chown -R www-data:www-data /var/www/eggleycompany.net
```

### Serveur de test (sans nom de domaine)

Pour tester sur le site par défaut d'Apache (`/var/www/html`, accès par IP en http), le bloc `<Directory /var/www/html>` du fichier `000-default.conf` doit contenir `AllowOverride All`, et le module `rewrite` doit être activé. Le passage forcé en HTTPS ne s'applique qu'au domaine `eggleycompany.net`.

## Avant la mise en ligne

1. **Mentions légales** : compléter le capital social et les coordonnées de l'hébergeur (zones surlignées dans `mentions-legales.html`).
2. **Formulaire** : il passe par [FormSubmit](https://formsubmit.co) vers `sce.commercial@eggleycompany.net`. Au premier envoi, FormSubmit envoie un e-mail d'activation à cette adresse : cliquer sur le lien pour activer le formulaire.
3. Vérifier que les numéros de téléphone (repris du catalogue) et le bureau de Rennes sont toujours d'actualité.
