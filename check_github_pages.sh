#!/bin/bash

# Script para verificar configuración de GitHub Pages

echo "🔍 VERIFICANDO GITHUB PAGES"
echo "============================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📊 Verificando ramas locales:${NC}"
git branch -a
echo ""

echo -e "${BLUE}🌐 URL del repositorio remoto:${NC}"
git remote -v
echo ""

echo -e "${BLUE}📍 Rama actual:${NC}"
CURRENT_BRANCH=$(git branch --show-current)
echo -e "Estás en: ${GREEN}${CURRENT_BRANCH}${NC}"
echo ""

echo -e "${BLUE}📝 Último commit en esta rama:${NC}"
git log -1 --oneline
echo ""

echo "============================="
echo -e "${YELLOW}⚠️  ACCIONES RECOMENDADAS:${NC}"
echo ""
echo "1. Verifica qué rama usa GitHub Pages:"
echo "   👉 https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages"
echo ""
echo "2. Si GitHub Pages usa 'gh-pages' y tú hiciste push a 'main':"
echo "   Necesitas hacer push también a 'gh-pages'"
echo ""
echo "3. Si GitHub Pages usa 'main':"
echo "   Espera 1-2 minutos para que se actualice"
echo "   O fuerza una actualización haciendo un commit vacío"
echo ""
echo "============================="
echo ""
echo -e "${BLUE}🔧 ¿Qué quieres hacer?${NC}"
echo ""
echo "a) Ver configuración de GitHub Pages en el navegador"
echo "b) Hacer push a rama gh-pages (si existe)"
echo "c) Crear rama gh-pages desde main y hacer push"
echo "d) Forzar actualización en main (commit vacío)"
echo "e) Salir"
echo ""
read -p "Elige una opción (a/b/c/d/e): " OPTION

case $OPTION in
    a)
        echo ""
        echo -e "${GREEN}Abriendo configuración de GitHub Pages...${NC}"
        open "https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages"
        ;;
    b)
        echo ""
        echo -e "${BLUE}Haciendo push a gh-pages...${NC}"
        git checkout gh-pages
        if [ $? -eq 0 ]; then
            git merge main
            git push origin gh-pages
            echo -e "${GREEN}✅ Push a gh-pages completado${NC}"
            git checkout main
        else
            echo -e "${RED}❌ La rama gh-pages no existe${NC}"
            echo "Usa la opción 'c' para crearla"
        fi
        ;;
    c)
        echo ""
        echo -e "${BLUE}Creando rama gh-pages desde main...${NC}"
        git checkout -b gh-pages
        git push origin gh-pages
        echo -e "${GREEN}✅ Rama gh-pages creada y subida${NC}"
        git checkout main
        echo ""
        echo "Ahora configura GitHub Pages para usar la rama gh-pages:"
        echo "👉 https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages"
        ;;
    d)
        echo ""
        echo -e "${BLUE}Forzando actualización en main...${NC}"
        git commit --allow-empty -m "🔄 Force GitHub Pages rebuild"
        git push origin main
        echo -e "${GREEN}✅ Actualización forzada${NC}"
        echo ""
        echo "Espera 1-2 minutos y recarga tu GitHub Pages"
        ;;
    e)
        echo ""
        echo "👋 Saliendo..."
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Opción no válida${NC}"
        ;;
esac

echo ""
echo "============================="
echo ""
echo -e "${BLUE}📚 Información útil:${NC}"
echo ""
echo "Tu GitHub Pages debería estar en:"
echo "https://victorjrp92.github.io/Mating-hotel-12-10-2025/"
echo ""
echo "Configuración de GitHub Pages:"
echo "https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages"
echo ""
