# Check&Stock

## 📋 Description

**Check&Stock** est une application mobile professionnelle de gestion de stocks développée avec React Native et Expo. L'application permet aux gérants d'entreprise de gérer leur inventaire de manière numérique et portable, évitant ainsi la gestion manuelle sur papier.

## 🎯 Concept et Problématique

### Problématique Initiale
- **Gestion manuelle** : Les gérants devaient réécrire leur inventaire sur papier à chaque fois
- **Manque de portabilité** : Difficulté à transporter et consulter les inventaires
- **Risque d'erreurs** : Saisie manuelle sujette aux erreurs de comptage

### Solution Apportée
- **Application mobile** : Interface intuitive et portable
- **Gestion numérique** : Stockage sécurisé et synchronisé
- **Interface adaptée** : Design actuellement conçu pour le métier de boulanger

## 🚀 Fonctionnalités Principales

### 📁 Gestion des Catégories
- **Création** de catégories pour organiser les produits
- **Modification** des noms et images de catégories
- **Suppression** de catégories avec gestion des dépendances
- **Navigation hiérarchique** entre les catégories

### 📦 Gestion des Produits
- **Ajout** de produits avec nom, stock initial et unité de mesure
- **Modification** des informations produit (nom, stock, unité, image)
- **Suppression** de produits
- **Gestion des images** pour chaque produit

### 🗄️ Gestion des Stocks
- **Ajout de stock** : Incrémentation du stock existant
- **Retrait de stock** : Décrémentation du stock existant
- **Suivi en temps réel** des quantités
- **Historique** des modifications

### 🎨 Interface Utilisateur
- **Design adaptatif** : Thème sombre optimisé pour les environnements professionnels
- **Navigation intuitive** : Interface tactile et responsive
- **Images personnalisées** : Support des images pour catégories et produits
- **Orientation portrait** : Optimisé pour l'utilisation en entreprise

## 🛠️ Architecture Technique

### 📱 Technologies Utilisées

#### Framework Principal
- **React Native** (v0.79.4) : Framework de développement mobile cross-platform
- **Expo** (v53.0.12) : Plateforme de développement et déploiement
- **TypeScript** (v5.8.3) : Typage statique pour la robustesse du code

#### Navigation et Routing
- **Expo Router** (v5.1.0) : Système de navigation basé sur les fichiers
- **React Navigation** (v7.1.6) : Bibliothèque de navigation native

#### Base de Données
- **Expo SQLite** (v15.2.12) : Base de données locale embarquée
- **SQLite** : Moteur de base de données relationnelle


## 🚀 Installation et Configuration

### Installation

1. **Cloner le repository**
   ```bash
   git clone [URL_DU_REPO]
   cd check_stock
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuration de la base de données**
   - La base de données SQLite est automatiquement initialisée
   - Le fichier `appBase.db` est inclus dans les assets

4. **Lancer l'application**
   ```bash
   # Développement
   expo start
   
   # Android
   expo run:android
   
   # iOS
   expo run:ios
   
   # Web
   expo run:web
   ```

## 📱 Déploiement

### Configuration EAS Build

Le projet utilise **EAS Build** pour la compilation et le déploiement :

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Build et Déploiement

1. **Configuration EAS**
   ```bash
   eas build:configure
   ```

2. **Build de développement**
   ```bash
   eas build --profile development --platform android
   ```

3. **Build de production**
   ```bash
   eas build --profile production --platform all
   ```

4. **Soumission aux stores**
   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

## 📊 Métriques et Performance

### Optimisations
- **Lazy loading** des images
- **Memoization** des composants React
- **Gestion optimisée** de la base de données
- **Responsive design** pour différentes tailles d'écran

### Compatibilité
- **Android** : API 21+ (Android 5.0+)
- **iOS** : iOS 13+
- **Tablettes** : Support complet<br><br>

# 📈 Roadmap

### Version Actuelle (1.2.0)
- ✅ Gestion complète des catégories et produits
- ✅ Interface utilisateur optimisée
- ✅ Base de données locale
- ✅ Gestion des images

### Versions Futures
- 🔄 **Synchronisation cloud** : Sauvegarde en ligne
- 🔄 **Export/Import** : Fonctionnalités d'échange de données
- 🔄 **Multi-utilisateurs** : Gestion des droits d'accès

### 🔑 Licence

Ce projet est sous licence [TYPE_DE_LICENCE]. Voir le fichier `LICENSE` pour plus de détails.