#!/usr/bin/env python3
"""
Script para integrar el formulario web en el index.html de Mariting
"""

import re

# Leer el archivo index.html actual
with open('/Users/victorjrp92/Desktop/Mariting Beta 3/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Leer el formulario HTML del archivo index_FORM_WORKING.html
with open('/Users/victorjrp92/Desktop/Mariting Beta 3/index_FORM_WORKING.html', 'r', encoding='utf-8') as f:
    form_content = f.read()

# Extraer solo la sección del formulario (entre <div class="form-section"> y su cierre)
form_match = re.search(r'(<div class="form-section".*?</div>\s*</div>\s*</form>\s*</div>)', form_content, re.DOTALL)

if not form_match:
    print("❌ No se pudo extraer el formulario del archivo FORM_WORKING")
    exit(1)

form_html = form_match.group(1)

print("✅ Formulario extraído correctamente")
print(f"   Tamaño: {len(form_html)} caracteres")

# Buscar donde insertar el formulario (después del <div class="container">)
container_pattern = r'(<div class="container">)'
match = re.search(container_pattern, content)

if not match:
    print("❌ No se encontró <div class='container'> en el index.html")
    exit(1)

# Insertar el formulario después del contenedor
insertion_point = match.end()
new_content = (
    content[:insertion_point] +
    '\n\n        <!-- WEB FORM SECTION -->\n' +
    '        ' + form_html + '\n\n' +
    content[insertion_point:]
)

# Crear backup
backup_path = '/Users/victorjrp92/Desktop/Mariting Beta 3/index_BACKUP_BEFORE_FORM_INTEGRATION.html'
with open(backup_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Backup creado: {backup_path}")

# Guardar el nuevo archivo
with open('/Users/victorjrp92/Desktop/Mariting Beta 3/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Formulario integrado exitosamente en index.html")
print("")
print("📝 Siguiente paso:")
print("   1. Abre el navegador y recarga con Cmd+Shift+R")
print("   2. El formulario debe aparecer después del header")
print("")
print("⚠️  Si algo sale mal, restaura con:")
print("   cp index_BACKUP_BEFORE_FORM_INTEGRATION.html index.html")
