# a3-gestao-software-rio-bonito

Projeto da A3 de Gestão e Qualidade de Software. Sistema de Cadastro de Voluntários para a reconstrução de Rio Bonito do Iguaçu. Foco em Git, testes unitários/integração **(>80%)** e consumo de API (ViaCEP).

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express, Jest, Supertest, Axios
* **Frontend:** React (com Vite)
* **Gestão de Ambiente:** Git/GitHub, NVM (Node Version Manager)

---

## 🚀 Como Rodar o Projeto

Este projeto é um "monorepo" simples. O backend e o frontend estão no mesmo repositório, mas são executados separadamente.

### 1. Pré-requisitos

* **Git:** Você precisa ter o [Git](https://git-scm.com/downloads) instalado.
* **NVM (Node Version Manager):** É **fortemente recomendado** usar o NVM para gerenciar sua versão do Node.js e evitar conflitos.
    * **Windows:** [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) (baixe o `nvm-setup.zip`)
    * **Linux/macOS:** [nvm](https://github.com/nvm-sh/nvm) (siga as instruções de instalação)

> **⚠️ AVISO IMPORTANTE:** Se você já instalou o Node.js manualmente (usando o instalador `.msi` do site), o NVM **não vai funcionar**. Você **DEVE** desinstalar esse Node.js manual antes de instalar e usar o NVM.

### 2. Instalação e Configuração

#### 1. Clonar o Repositório
```sh
git clone https://github.com/PedroSerafini/a3-gestao-software-rio-bonito.git
cd a3-gestao-software-rio-bonito
```

### 3. Instalar a Versão Correta do Node.js

Este projeto foi construído e testado com a versão LTS (Long Term Support) v24.11.0.

```sh
# Instala a versão exata do Node.js
nvm install 24.11.0

# "Ativa" essa versão para o seu terminal
nvm use 24.11.0

# Verifique se funcionou (deve mostrar "v24.11.0")
node -v
```

### 4. Configurar o Backend

```sh
# 1. Navegue até a pasta do backend
cd backend

# 2. Instale as dependências
npm install
```

### 5. Configurar o Frontend

```sh
# 1. Volte para a raiz e vá para o frontend
cd ../frontend

# 2. Instale as dependências
npm install
```

### 6. Executando a Aplicação (Dois Terminais)

Você precisará de dois terminais abertos simultaneamente.

Terminal 1: Rodar o Backend
```sh
# 1. Vá para a pasta do backend
cd backend

# 2. Rode o servidor em modo de desenvolvimento
npm run dev
```

O terminal deve mostrar: [BACKEND] Servidor rodando na porta 3000

Terminal 2: Rodar o Frontend
```sh
# 1. Vá para a pasta do frontend
cd frontend

# 2. Rode o servidor de desenvolvimento do React (Vite)
npm run dev
```

O terminal deve mostrar: Local: http://localhost:5173/

### 7. Acessando a Aplicação
Com os dois terminais rodando:

Backend (API): http://localhost:3000

Frontend (Site): http://localhost:5173

Abra http://localhost:5173 no seu navegador para usar o sistema.

## 🧪 Como Rodar os Testes
Para verificar a funcionalidade do backend e gerar o relatório de cobertura de testes:

```sh
# 1. Navegue até a pasta do backend
cd backend

# 2. (Opcional) Rodar os testes uma vez
npm run test

# 3. (MUITO IMPORTANTE) Gerar o relatório de cobertura
npm run test:coverage
```

Isso executará todos os testes unitários e de integração, mostrando a tabela de cobertura no final (Ex: All files | 96.72 | 100 | ...).
