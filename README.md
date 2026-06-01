# 🎭 QA Automation - Playwright con TypeScript

[![Playwright](https://img.shields.io/badge/Playwright-1.46-blue.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-4%20scenarios-green.svg)]()
[![Status](https://img.shields.io/badge/status-passing-brightgreen.svg)]()

## 📋 Descripción

Suite de pruebas automatizadas para la página demo [https://demo.testim.io/](https://demo.testim.io/), demostrando:

- ✅ Automatización E2E con Playwright
- ✅ Patrón Page Object Model
- ✅ Datos parametrizados (múltiples escenarios)
- ✅ Validaciones de errores (SSN inválido, teléfono inválido)
- ✅ Generación de reportes HTML

## 🚀 Escenarios cubiertos

| Escenario | Tipo | Estado |
|-----------|------|--------|
| Filtrar precio 1200 y reservar Madan | Exitoso | ✅ |
| Filtrar precio 1100 y reservar Shenji | Exitoso | ✅ |
| Seleccionar Tongli desde dropdown | Exitoso | ✅ |
| Validar error de teléfono inválido | Error | ✅ |

## 🔧 Instalación

```bash
# Clonar repositorio
git clone https://github.com/jeancarls-t/qa-automation-testim-playwright.git
cd qa-automation-testim-playwright

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install

🚀 Ejecutar pruebas
# Ejecutar todas las pruebas
npx playwright test

# Modo headed (ver navegador)
npx playwright test --headed

# Ver reporte HTML
npx playwright show-report

📊 Reporte de ejecución
Los reportes se generan en playwright-report/index.html
📁 Estructura del proyecto
├── tests/
│   ├── pages/           # Page Objects
│   ├── fixtures/        # Datos de prueba
│   └── specs/           # Casos de prueba
├── playwright.config.ts
├── package.json
└── tsconfig.json

👤 Autor
Jean Carlos Caro N.
QA Automation Engineer
GitHub

📄 Licencia
Proyecto de evaluación técnica - Uso académico.

---

## ✅ Comandos finales para subir

```bash
# 1. Crear .gitignore
echo "node_modules/" > .gitignore
echo "test-results/" >> .gitignore
echo "playwright-report/" >> .gitignore
echo "package-lock.json" >> .gitignore

# 2. Inicializar repositorio
git init

# 3. Agregar archivos
git add .

# 4. Commit inicial
git commit -m "feat: prueba técnica QA automation con Playwright y TypeScript

- 4 escenarios de prueba (3 exitosos, 1 error)
- Page Object Model
- Datos parametrizados
- Validaciones de SSN y teléfono"

# 5. Crear repositorio en GitHub (nombre recomendado)
gh repo create qa-automation-testim-playwright --public

# 6. Subir
git remote add origin https://github.com/jeancarls-t/qa-automation-testim-playwright.git
git branch -M main
git push -u origin main

