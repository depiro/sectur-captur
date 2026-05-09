#!/bin/bash
# Setup inicial — Captur Frontend
# Ejecutar desde la carpeta donde querés crear el proyecto

set -e

echo "→ Creando proyecto Next.js..."
npx create-next-app@latest captur-frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-git

cd captur-frontend

echo "→ Instalando dependencias del stack..."
npm install \
  react-hook-form \
  zod \
  @hookform/resolvers \
  @tanstack/react-query \
  lucide-react \
  date-fns

echo "→ Inicializando shadcn/ui..."
npx shadcn@latest init --defaults

echo "→ Agregando componentes shadcn..."
npx shadcn@latest add \
  alert-dialog \
  button \
  calendar \
  checkbox \
  dialog \
  dropdown-menu \
  form \
  input \
  label \
  popover \
  select \
  sheet \
  skeleton \
  table \
  textarea \
  toast \
  toaster \
  tooltip \
  --overwrite

echo "→ Creando estructura de carpetas..."
mkdir -p \
  components/shared \
  components/trainings \
  components/enrollments \
  components/certificates \
  components/users \
  components/trainers \
  components/surveys \
  components/layout \
  hooks \
  types \
  lib

# Rutas App Router
mkdir -p \
  "app/(public)/capacitaciones/[id]" \
  "app/(public)/capacitaciones-externas" \
  "app/(public)/preguntas-frecuentes" \
  "app/(auth)/login" \
  "app/(auth)/registro" \
  "app/(auth)/recuperar-password" \
  "app/(beneficiario)/mis-inscripciones" \
  "app/(beneficiario)/mis-certificados" \
  "app/(beneficiario)/mi-perfil" \
  "app/backoffice/capacitaciones/nueva" \
  "app/backoffice/capacitaciones/[id]/editar" \
  "app/backoffice/capacitaciones/[id]/inscripciones" \
  "app/backoffice/capacitaciones-externas/[id]" \
  "app/backoffice/beneficiarios/[id]" \
  "app/backoffice/capacitadores/[id]" \
  "app/backoffice/administradores" \
  "app/backoffice/certificados" \
  "app/backoffice/encuestas/[id]" \
  "app/backoffice/slideshow" \
  "app/backoffice/preguntas-frecuentes" \
  "app/backoffice/configuracion/modalidades" \
  "app/backoffice/configuracion/organizadores" \
  "app/backoffice/configuracion/tipos-destinatario" \
  "app/backoffice/configuracion/ambitos"

echo "→ Copiando CLAUDE.md al proyecto..."
cp ../CLAUDE.md ./CLAUDE.md

echo ""
echo "✅ Setup completo. Próximos pasos:"
echo "   1. cd captur-frontend"
echo "   2. Reemplazar app/globals.css con los tokens del design system"
echo "   3. Reemplazar tailwind.config.ts con la escala tipográfica"
echo "   4. Actualizar app/layout.tsx (Inter font + Toaster + QueryClientProvider)"
echo "   5. npm run dev para verificar"
