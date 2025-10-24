#!/bin/bash
# Script para integrar el formulario en index.html

echo "🔧 Integrando formulario en index.html..."

# Crear backup
cp "/Users/victorjrp92/Desktop/Mariting Beta 3/index.html" "/Users/victorjrp92/Desktop/Mariting Beta 3/index_BACKUP_BEFORE_FORM.html"

echo "✅ Backup creado: index_BACKUP_BEFORE_FORM.html"

# Copiar el archivo FORM_WORKING como el nuevo index
cp "/Users/victorjrp92/Desktop/Mariting Beta 3/index_FORM_WORKING.html" "/Users/victorjrp92/Desktop/Mariting Beta 3/index.html"

echo "✅ Formulario integrado exitosamente"
echo ""
echo "📝 Siguiente paso:"
echo "   Abre el navegador en: file:///Users/victorjrp92/Desktop/Mariting%20Beta%203/index.html"
echo ""
echo "⚠️  Si necesitas restaurar el archivo original:"
echo "   cp index_BACKUP_BEFORE_FORM.html index.html"
