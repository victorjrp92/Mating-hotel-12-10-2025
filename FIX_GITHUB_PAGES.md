# 🌐 ARREGLAR GITHUB PAGES - Versión Diferente

## ❓ EL PROBLEMA

GitHub Pages muestra una versión antigua/diferente de tu app.

**Causa probable:**
- ✅ GitHub Pages está sirviendo desde otra rama (ej: `gh-pages`)
- ✅ O necesita tiempo para actualizar después del push
- ✅ O está configurado para leer desde una carpeta específica

---

## 🔍 PASO 1: VERIFICAR CONFIGURACIÓN

### Método Rápido (Script):
```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"
chmod +x check_github_pages.sh
./check_github_pages.sh
```

### Método Manual:

1. **Ve a la configuración de GitHub Pages:**
   ```
   https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages
   ```

2. **Busca la sección "Build and deployment"**

3. **Verifica:**
   - **Source**: ¿Qué dice? (Deploy from a branch / GitHub Actions)
   - **Branch**: ¿Qué rama? (main / gh-pages)
   - **Folder**: ¿Qué carpeta? (/ (root) / /docs)

---

## ✅ SOLUCIONES SEGÚN CONFIGURACIÓN

### CASO 1: GitHub Pages usa rama `gh-pages`

**Si hiciste push a `main` pero GitHub Pages lee `gh-pages`:**

```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"

# Opción A: Cambiar a gh-pages y actualizar
git checkout gh-pages
git merge main
git push origin gh-pages
git checkout main
```

**O crear gh-pages si no existe:**
```bash
git checkout -b gh-pages
git push origin gh-pages
git checkout main
```

**Luego espera 1-2 minutos y recarga tu sitio.**

---

### CASO 2: GitHub Pages usa rama `main`

**Si GitHub Pages ya está en `main` pero no se actualiza:**

#### Opción A: Esperar
- GitHub Pages tarda **1-2 minutos** en actualizarse
- Recarga con Cmd+Shift+R (fuerza recarga sin caché)

#### Opción B: Forzar Actualización
```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"

# Hacer commit vacío para forzar rebuild
git commit --allow-empty -m "🔄 Force GitHub Pages rebuild"
git push origin main
```

Espera 1-2 minutos y recarga.

---

### CASO 3: Cambiar Configuración

**Si quieres que GitHub Pages use `main` en vez de `gh-pages`:**

1. Ve a: https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages
2. En "Branch": Selecciona `main`
3. En "Folder": Selecciona `/ (root)`
4. Click "Save"
5. Espera 1-2 minutos

---

## 🧹 LIMPIAR CACHÉ DEL NAVEGADOR

A veces el problema es el caché de tu navegador:

### Chrome/Edge:
```
Cmd + Shift + R  (Mac)
Ctrl + Shift + R (Windows)
```

### Safari:
```
Cmd + Option + E  (limpiar caché)
Cmd + R           (recargar)
```

### O en modo incógnito:
```
Cmd + Shift + N  (Chrome)
Cmd + Shift + P  (Safari)
```

---

## 📊 VERIFICAR QUÉ VERSIÓN ESTÁ EN CADA RAMA

```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"

# Ver último commit en main
git log main -1 --oneline

# Ver último commit en gh-pages (si existe)
git log gh-pages -1 --oneline 2>/dev/null || echo "gh-pages no existe"

# Ver todas las ramas
git branch -a
```

---

## 🎯 SOLUCIÓN RECOMENDADA (PASO A PASO)

### 1. Verificar configuración:
```bash
# Abre configuración
open "https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages"
```

### 2. Si usa `gh-pages`, actualízala:
```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"
git checkout gh-pages || git checkout -b gh-pages
git merge main
git push origin gh-pages
git checkout main
```

### 3. Si usa `main`, fuerza rebuild:
```bash
git commit --allow-empty -m "🔄 Rebuild GitHub Pages"
git push origin main
```

### 4. Espera 2 minutos y recarga:
```
Tu sitio: https://victorjrp92.github.io/Mating-hotel-12-10-2025/
```

Recarga con **Cmd+Shift+R** para limpiar caché.

---

## 🔍 VERIFICAR RESULTADO

### Tu sitio debería estar en:
```
https://victorjrp92.github.io/Mating-hotel-12-10-2025/
```

### Para verificar el deployment:
```
https://github.com/victorjrp92/Mating-hotel-12-10-2025/actions
```

Aquí verás si GitHub Pages está procesando tu actualización.

---

## 🆘 SI AÚN NO FUNCIONA

### 1. Verifica que el push fue exitoso:
```bash
git log origin/main -1 --oneline
```

### 2. Compara con tu versión local:
```bash
git log -1 --oneline
```

Deberían ser iguales.

### 3. Verifica el workflow de GitHub Pages:
```
https://github.com/victorjrp92/Mating-hotel-12-10-2025/actions
```

Busca errores en rojo.

### 4. Revisa que index.html esté en la raíz:
```bash
ls -la index.html
```

Debe existir en la raíz del repositorio.

---

## 📋 CHECKLIST

- [ ] Verificar qué rama usa GitHub Pages (Settings → Pages)
- [ ] Hacer push a la rama correcta (main o gh-pages)
- [ ] Esperar 1-2 minutos
- [ ] Limpiar caché del navegador (Cmd+Shift+R)
- [ ] Verificar en modo incógnito
- [ ] Revisar GitHub Actions para errores

---

## ⚡ TL;DR

```bash
# Ejecuta el script diagnóstico
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"
chmod +x check_github_pages.sh
./check_github_pages.sh
```

O manualmente:

```bash
# Si GitHub Pages usa main:
git commit --allow-empty -m "🔄 Rebuild"
git push origin main

# Si usa gh-pages:
git checkout gh-pages
git merge main
git push origin gh-pages
git checkout main
```

Espera 2 minutos y recarga con **Cmd+Shift+R**.

---

**Tu sitio**: https://victorjrp92.github.io/Mating-hotel-12-10-2025/  
**Configuración**: https://github.com/victorjrp92/Mating-hotel-12-10-2025/settings/pages  
**Actions**: https://github.com/victorjrp92/Mating-hotel-12-10-2025/actions
