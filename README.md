# Sélection poste ENM

[![Building executables](https://github.com/TristanPouliquen/selection-poste-enm/actions/workflows/test_build.yml/badge.svg?branch=main)](https://github.com/TristanPouliquen/selection-poste-enm/actions/workflows/test_build.yml)

Ce projet propose un logiciel pour aider les auditeurs de justice de l'ENM dans le choix de leur premier poste.
Il a été créé en 2023.

Le programme vous a aidé ? Vous voulez nous remercier ?
Alors n'hésitez pas à nous sponsoriser :grinning:

## Sommaire

1. [Installation](#installation)
2. [Contribuer](#contribuer)
3. [Développement](#développement)
4. [Dépendances](#dépendances)

## Installation

Consulez la page de la dernière version: https://github.com/TristanPouliquen/selection-poste-enm/releases

Téléchargez le fichier correspondant à votre système d'opération. Le projet génère les fichiers pour Windows, MacOS et Linux.

Lancez l'exécutable pour installer le programme.

## Contribuer

### Amélioration du programme

Toutes les contributions sont les bienvenues !

#### Vous avez une idée pour améliorer le programme, le rendre plus fonctionnel ou plus lisible ?

- [Créez une issue](/issues) pour proposer votre nouvelle idée,
- si vous savez le faire, ou avez le temps de chercher comment, créez une nouvelle branche sur ce Github, proposez votre implémentation et [publiez vos changements](/pulls), cela ira plus vite !

#### Vous voulez découvrir le développement d'une app Tauri ? de Rust ? de NextJs ?

N'hésitez pas à consulter les [issues](/issues) ouvertes pour en sélectionner une qui vous paraît intéressante et commencez à coder !

Vous n'aurez alors plus qu'à publier vos changements et [demander une pull request](/pulls).

### Mise à jour des données

Ce programme a été écrit pour l'affectation en 2023, les données reflètent les postes présentés cette année là.

Si vous voulez mettre à jour les données des postes, vous pouvez:

- [ouvrir une issue](/issues) avec les données à corriger
- si vous connaissez SQL et le terminal, créer directement une nouvelle migration SQL avec les données voulues. Pour cela, suivez les étapes suivantes :
  1. Téléchargez le projet
  2. Ouvrez un terminal dans le dossier `src-tauri`
  3. Installez [Rust](https://tauri.app/fr/v1/guides/getting-started/prerequisites/) en suivant les démarches pour votre plateforme
  4. Installez [Diesel](https://diesel.rs/guides/getting-started)
  5. Lancez la commande `diesel migration generate <migration-name>` en renseignant un nom compréhensible pour votre migration
  6. Modifiez les fichiers `up.sql` et `down.sql` dans `src-tauri/migrations/<timestamp>-<migration-name>`
  7. Publiez vos changements sur une nouvelle branche de ce Github
  8. [Créez une nouvelle pull request](/pulls) vers la branche `main` pour soumettre vos modifications

## Développement

Ce projet utilise [Tauri](https://tauri.app/fr/) et [NextJS](https://nextjs.org/) pour créer un exécutable cross-platform.

Pour lancer le projet, une fois le projet cloné, exécutez la commande suivante depuis la racine du projet :

```bash
npm run tauri dev
# or
yarn tauri dev
# or
pnpm tauri dev
```

Le programme lancera une `WebView` en mode développement.

## Dépendances

Le projet utilise:

1. [TypeScript](https://www.typescriptlang.org/) comme surcouche Javascript,
2. [TailwindCSS](https://tailwindcss.com/) comme librairie de style,
3. [DaisyUI](https://daisyui.com/) comme librairie de composants,
4. [RadixUI Icons](https://icons.radix-ui.com/) comme librairie d'icônes,
5. [Rust](https://www.rust-lang.org/fr) comme langage de programmation backend,
6. [Diesel](https://diesel.rs/) comme ORM,
7. [SQlite](https://sqlite.org/index.html) comme SGBD.
