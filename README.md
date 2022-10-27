<p align="center">
  <h3 align="center">To You</h3> <!-- EDIT -->
  <p align="center">
    Another to-do app for you, where completing tasks lead to great rewards.
  </p>
  <!-- EDIT: Head over to https://shields.io/ to generate some beautiful shields! -->
  <p align="center">
  <a href="https://kit.svelte.dev/">
      <img src="https://img.shields.io/badge/Frontend-SvelteKit-%23FF3E00?style=for-the-badge&logo=svelte" alt="Frontend SvelteKit">
    </a>
    <a href="https://appwrite.io/">
      <img src="https://img.shields.io/badge/Backend-Appwrite-%23F02E65?style=for-the-badge&logo=appwrite" alt="Backend Appwrite">
    </a>
  </p>
</p>

<!-- EDIT: TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [1. Clone the repo](#1-clone-the-repo)
    - [2. Install front-end dependencies](#2-install-front-end-dependencies)
    - [3. Setup appwrite instance](#3-setup-appwrite-instance)
    - [4. Setup environment variables](#4-setup-environment-variables)
    - [5. Setup appwrite database & collections](#5-setup-appwrite-database--collections)
- [Usage](#usage)
  - [Run App](#run-app)
  - [Preview](#preview)
- [To-do](#to-do)

## About The Project

This is a to-do app where you can add simple tasks, that are associated with points, and rewards, that are unlocked with the points you earn.

### Built With

<!-- EDIT -->
- Frontend
  - [Svelte Kit](https://kit.svelte.dev/) 
- Backend
  - [Appwrite](https://appwrite.io/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

`yarn` and `docker` installed on your local machine.

### Installation

#### 1. Clone the repo

```sh
git clone https://github.com/tglide/to-you
cd to-you
```

#### 2. Install front-end dependencies

```sh
yarn
```

#### 3. Setup appwrite instance

Head over to https://appwrite.io/docs/installation and follow the instructions to setup appwrite on your local machine.
You'll also need to install the Appwrite CLI.

After that, create a new project, and create an API key.

#### 4. Setup environment variables

You'll need to setup the following environment variables in a `.env` file in the root directory.

```sh
APPWRITE_ENDPOINT
APPWRITE_PROJECT_ID
APPWRITE_API_KEY
```

#### 5. Setup appwrite database & collections

Run the `aw:local` script to setup the appwrite CLI, then run `appwrite deploy collection --all` to deploy the collections and database.
Setup the rest of the environment variables in the `.env` file:

```sh
TODO_COLLECTION_ID
DATABASE_ID
```

## Usage

### Run App

```sh
yarn dev
```

### Preview

You can check out a live preview at: https://to-you-peach.vercel.app/

## To-do
A to-do app repo wouldn't be complete without it's own to-do list!

- [X] Browser session
- [X] Addition progressive enhancement
- [X] Deletion progressive enhancement
- [X] Update progressive enhancement
- [ ] Rewards system
- [ ] Keyboard controls
- [ ] Dark mode
