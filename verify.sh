#!/bin/bash

# MARITING - Script de Verificación
# Ejecutar: chmod +x verify.sh && ./verify.sh

echo "🔍 MARITING - Verificación del Sistema"
echo "========================================"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contador de checks
CHECKS_PASSED=0
TOTAL_CHECKS=0

# Función de check
check_file() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}❌${NC} $2"
        return 1
    fi
}

check_content() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $3"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}❌${NC} $3"
        return 1
    fi
}

echo "📁 Verificando Archivos Principales..."
echo "--------------------------------------"
check_file "index.html" "index.html existe"
check_file "app.js" "app.js existe"
check_file "auth.js" "auth.js existe"
check_file "modals.js" "modals.js existe"
check_file "ab-testing.js" "ab-testing.js existe"
check_file "supabase-config.js" "supabase-config.js existe"
check_file "animations.css" "animations.css existe"
echo ""

echo "🔧 Verificando Backups..."
echo "--------------------------------------"
check_file "app_broken.js" "app_broken.js (versión rota guardada)"
check_file "app_backup_v2.2.1.js" "Backup v2.2.1 existe"
echo ""

echo "📖 Verificando Documentación..."
echo "--------------------------------------"
check_file "LEEME_PRIMERO.md" "LEEME_PRIMERO.md"
check_file "README_FIXED.md" "README_FIXED.md"
check_file "ARREGLADO.md" "ARREGLADO.md"
check_file "ANTES_vs_DESPUES.md" "ANTES_vs_DESPUES.md"
check_file "DIAGNOSTIC_AND_FIX.md" "DIAGNOSTIC_AND_FIX.md"
echo ""

echo "⚙️ Verificando Configuración..."
echo "--------------------------------------"
check_content "supabase-config.js" "ENABLE_SUPABASE = false" "Supabase deshabilitado (correcto)"
check_content "app.js" "async function openAIAnalysis" "Función openAIAnalysis actualizada"
check_content "app.js" "generateCompetitiveThreats" "Función generateCompetitiveThreats existe"
check_content "app.js" "generateRevenueOpportunity" "Función generateRevenueOpportunity existe"
check_content "app.js" "displayAIAnalysis" "Función displayAIAnalysis existe"
echo ""

echo "📊 Verificando Assets..."
echo "--------------------------------------"
check_file "demo_barcelona_booking.xlsx" "Archivo demo existe"
check_file "template_en.csv" "Template EN existe"
check_file "template_es.csv" "Template ES existe"
check_file "template_de.csv" "Template DE existe"
echo ""

# Verificar tamaño de app.js
if [ -f "app.js" ]; then
    APP_SIZE=$(wc -c < "app.js")
    if [ $APP_SIZE -gt 60000 ]; then
        echo -e "${GREEN}✅${NC} app.js tiene tamaño correcto (${APP_SIZE} bytes)"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
    else
        echo -e "${RED}❌${NC} app.js parece incompleto (${APP_SIZE} bytes)"
    fi
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
fi
echo ""

# Resumen
echo "========================================"
echo -e "${BLUE}📊 RESUMEN${NC}"
echo "========================================"
echo ""
echo "Checks pasados: ${CHECKS_PASSED}/${TOTAL_CHECKS}"
echo ""

if [ $CHECKS_PASSED -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}✅ TODOS LOS CHECKS PASARON${NC}"
    echo ""
    echo "🎉 Tu aplicación está lista para usar!"
    echo ""
    echo "Para probar:"
    echo -e "  ${YELLOW}open index.html${NC}"
    echo ""
elif [ $CHECKS_PASSED -gt $((TOTAL_CHECKS * 80 / 100)) ]; then
    echo -e "${YELLOW}⚠️  LA MAYORÍA DE CHECKS PASARON${NC}"
    echo ""
    echo "La app debería funcionar, pero revisa los items marcados con ❌"
    echo ""
else
    echo -e "${RED}❌ FALTAN ARCHIVOS IMPORTANTES${NC}"
    echo ""
    echo "Por favor revisa que todos los archivos estén en el directorio"
    echo ""
fi

echo "========================================"
echo ""
echo "📚 Documentación:"
echo "  - LEEME_PRIMERO.md      (Resumen ejecutivo)"
echo "  - README_FIXED.md       (Guía completa)"
echo "  - ARREGLADO.md          (Resumen rápido)"
echo ""
echo "🚀 Para usar la app:"
echo -e "  ${YELLOW}open index.html${NC}"
echo ""
echo "⚙️  Para activar autenticación:"
echo "  Ver instrucciones en README_FIXED.md"
echo ""
