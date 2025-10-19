#!/bin/bash

# MARITING - Script para subir cambios a GitHub como versión principal
# Este script hace commit y push a la rama main

echo "🚀 MARITING - Subiendo a GitHub"
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: No estás en el directorio del proyecto${NC}"
    echo "Por favor ejecuta este script desde: /Users/victorjrp92/Desktop/Mariting Beta 3/"
    exit 1
fi

echo -e "${BLUE}📋 Estado actual del repositorio:${NC}"
git status --short
echo ""

echo -e "${YELLOW}📝 ¿En qué rama estás?${NC}"
CURRENT_BRANCH=$(git branch --show-current)
echo -e "Rama actual: ${GREEN}${CURRENT_BRANCH}${NC}"
echo ""

# Si no estamos en main, preguntar si cambiar
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  No estás en la rama 'main'${NC}"
    echo ""
    read -p "¿Quieres cambiar a la rama 'main'? (s/n): " SWITCH_TO_MAIN
    
    if [ "$SWITCH_TO_MAIN" = "s" ] || [ "$SWITCH_TO_MAIN" = "S" ]; then
        echo -e "${BLUE}🔄 Cambiando a rama main...${NC}"
        git checkout main
        if [ $? -ne 0 ]; then
            echo -e "${RED}❌ Error al cambiar a main${NC}"
            exit 1
        fi
        echo -e "${GREEN}✅ Cambiado a main${NC}"
        echo ""
    else
        echo -e "${YELLOW}⚠️  Continuando en rama '${CURRENT_BRANCH}'${NC}"
        echo ""
    fi
fi

# Agregar todos los archivos modificados
echo -e "${BLUE}📦 Agregando archivos al staging...${NC}"
git add .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al agregar archivos${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Archivos agregados${NC}"
echo ""

# Mostrar qué archivos se van a commitear
echo -e "${BLUE}📝 Archivos que se van a subir:${NC}"
git diff --cached --name-status
echo ""

# Crear mensaje de commit descriptivo
COMMIT_MSG="✅ v2.3.1 - App 100% funcional sin restricciones

CAMBIOS PRINCIPALES:
- ✅ Restaurado app.js desde backup funcional
- ✅ Eliminadas TODAS las restricciones de AI Analysis
- ✅ Simplificado botón AI Analysis (sin animaciones)
- ✅ Sistema de auth implementado pero DESACTIVADO
- ✅ App completamente gratuita y sin límites

FUNCIONALIDAD:
- ✅ Upload archivos CSV/XLSX
- ✅ Generación de gráficos de competencia
- ✅ AI Strategic Analysis (ILIMITADO, sin registro)
- ✅ Export gráficos PNG
- ✅ Multi-idioma (EN/ES/DE)

ARCHIVOS NUEVOS:
- 📖 LEEME_PRIMERO.md
- 📖 README_FIXED.md
- 📖 SIN_RESTRICCIONES.md
- 📖 QUICK_START.md
- 📖 RESUMEN_COMPLETO.md
- 🔧 verify.sh

ESTADO: Producción - Listo para usar
VERSIÓN: v2.3.1
FECHA: $(date '+%d %b %Y')"

echo -e "${BLUE}💬 Mensaje del commit:${NC}"
echo "---"
echo "$COMMIT_MSG"
echo "---"
echo ""

read -p "¿Continuar con el commit? (s/n): " CONTINUE_COMMIT

if [ "$CONTINUE_COMMIT" != "s" ] && [ "$CONTINUE_COMMIT" != "S" ]; then
    echo -e "${YELLOW}⚠️  Commit cancelado${NC}"
    exit 0
fi

# Hacer commit
echo -e "${BLUE}💾 Haciendo commit...${NC}"
git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al hacer commit${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Commit realizado${NC}"
echo ""

# Preguntar antes de hacer push
echo -e "${YELLOW}🌐 ¿Subir cambios a GitHub?${NC}"
read -p "Esto subirá los cambios a la rama '$(git branch --show-current)' en GitHub (s/n): " DO_PUSH

if [ "$DO_PUSH" != "s" ] && [ "$DO_PUSH" != "S" ]; then
    echo -e "${YELLOW}⚠️  Push cancelado${NC}"
    echo ""
    echo "Cambios guardados localmente. Para subirlos más tarde ejecuta:"
    echo -e "  ${BLUE}git push origin $(git branch --show-current)${NC}"
    exit 0
fi

# Hacer push
echo -e "${BLUE}⬆️  Subiendo a GitHub...${NC}"
git push origin $(git branch --show-current)

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al hacer push${NC}"
    echo ""
    echo "Si el error es por 'rejected', intenta:"
    echo -e "  ${BLUE}git pull origin $(git branch --show-current) --rebase${NC}"
    echo -e "  ${BLUE}git push origin $(git branch --show-current)${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅✅✅ ¡ÉXITO! ✅✅✅${NC}"
echo ""
echo "📦 Cambios subidos a GitHub"
echo "🌐 Repositorio: https://github.com/victorjrp92/Mating-hotel-12-10-2025"
echo "🌿 Rama: $(git branch --show-current)"
echo ""
echo -e "${BLUE}📊 Ver en GitHub:${NC}"
echo "  https://github.com/victorjrp92/Mating-hotel-12-10-2025/tree/$(git branch --show-current)"
echo ""
