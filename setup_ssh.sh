#!/bin/bash

# Script para configurar SSH para GitHub
# Esto te permite hacer push sin introducir credenciales cada vez

echo "🔐 CONFIGURAR SSH PARA GITHUB"
echo "=============================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Verificar si ya existe una clave SSH
if [ -f ~/.ssh/id_ed25519.pub ]; then
    echo -e "${GREEN}✅ Ya tienes una clave SSH${NC}"
    echo ""
    echo "Tu clave pública es:"
    cat ~/.ssh/id_ed25519.pub
    echo ""
    echo -e "${YELLOW}📋 Copia la clave de arriba${NC}"
else
    echo -e "${BLUE}🔑 Generando nueva clave SSH...${NC}"
    echo ""
    read -p "Introduce tu email de GitHub: " EMAIL
    
    ssh-keygen -t ed25519 -C "$EMAIL" -f ~/.ssh/id_ed25519 -N ""
    
    echo ""
    echo -e "${GREEN}✅ Clave SSH creada${NC}"
    echo ""
    echo "Tu clave pública es:"
    cat ~/.ssh/id_ed25519.pub
    echo ""
fi

# Agregar clave al ssh-agent
echo -e "${BLUE}🔧 Agregando clave al ssh-agent...${NC}"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

echo ""
echo -e "${GREEN}✅ Clave agregada al ssh-agent${NC}"
echo ""
echo "=============================="
echo -e "${YELLOW}📝 PRÓXIMOS PASOS:${NC}"
echo ""
echo "1. Copia la clave pública mostrada arriba"
echo ""
echo "2. Ve a GitHub:"
echo "   https://github.com/settings/ssh/new"
echo ""
echo "3. Pega la clave y guarda"
echo ""
echo "4. Cambia la URL del repositorio a SSH:"
echo "   cd \"/Users/victorjrp92/Desktop/Mariting Beta 3\""
echo "   git remote set-url origin git@github.com:victorjrp92/Mating-hotel-12-10-2025.git"
echo ""
echo "5. Ahora puedes hacer push sin contraseña:"
echo "   git push origin main"
echo ""
