#!/bin/bash

# ============================================
# MARITING - BACKUP A GITHUB
# Ejecuta este script para hacer backup
# ============================================

echo "🚀 Iniciando backup a GitHub..."
echo ""

cd "/Users/victorjrp92/Desktop/Mariting Beta 3"

# 1. Verificar estado
echo "📋 Estado actual:"
git status
echo ""

# 2. Agregar todos los archivos
echo "➕ Agregando archivos..."
git add .
echo ""

# 3. Hacer commit
echo "💾 Creando commit..."
git commit -m "✅ Mariting v2.2.1 - Versión estable funcionando correctamente

- Templates CSV funcionales (EN, ES, DE)
- Demo chart con 4 posiciones animadas
- Menú reposicionado (derecha)
- Análisis AI completo
- Gráficos adaptativos
- Footer 2x3 layout
- Sin emojis en botones
- Código limpio y probado

Esta es la versión estable antes de los cambios de currency."
echo ""

# 4. Push a GitHub
echo "☁️ Subiendo a GitHub..."
git push -u origin main
echo ""

echo "✅ ¡Backup completado exitosamente!"
echo "🔗 Repositorio: https://github.com/victorjrp92/Mating-hotel-12-10-2025"
