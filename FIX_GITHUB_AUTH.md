# 🔐 SOLUCIÓN: Error 403 GitHub Authentication

## ⚡ SOLUCIÓN RÁPIDA (5 minutos)

### 1. Crear Personal Access Token

1. **Abrir**: https://github.com/settings/tokens
2. **Click**: "Generate new token" → "Generate new token (classic)"
3. **Configurar**:
   - Name: `Mariting App`
   - Expiration: `No expiration`
   - Scopes: ✅ `repo` (marcar todo)
4. **Click**: "Generate token"
5. **COPIAR EL TOKEN** (se ve una sola vez!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 2. Hacer Push con Token

```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"
git push origin main
```

**Cuando te pida credenciales:**
- Username: `victorjrp92`
- Password: **PEGA TU TOKEN** (no tu contraseña GitHub)

✅ ¡Listo!

---

## 💾 GUARDAR TOKEN (Para no ingresarlo cada vez)

```bash
# Configurar macOS Keychain
git config --global credential.helper osxkeychain

# Hacer push (te pedirá credenciales UNA vez)
git push origin main
```

Ingresa:
- Username: `victorjrp92`  
- Password: `ghp_tu_token_aqui`

macOS guardará el token y no lo pedirá más.

---

## 🔒 OPCIÓN SSH (Más Seguro)

### Configuración Rápida:

```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"
chmod +x setup_ssh.sh
./setup_ssh.sh
```

Sigue las instrucciones del script.

### Manual:

#### 1. Generar Clave SSH:
```bash
ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"
```
Presiona Enter en todo (sin contraseña).

#### 2. Ver tu Clave Pública:
```bash
cat ~/.ssh/id_ed25519.pub
```

#### 3. Copiar y Agregar en GitHub:
- Ve a: https://github.com/settings/ssh/new
- Title: `Mac - Mariting`
- Key: Pega la clave que copiaste
- Click "Add SSH key"

#### 4. Cambiar Remote a SSH:
```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"
git remote set-url origin git@github.com:victorjrp92/Mating-hotel-12-10-2025.git
```

#### 5. Push sin Contraseña:
```bash
git push origin main
```

---

## 🆘 SI AÚN TIENES PROBLEMAS

### Verificar Remote Actual:
```bash
git remote -v
```

Deberías ver:
```
origin  https://github.com/victorjrp92/Mating-hotel-12-10-2025.git (fetch)
origin  https://github.com/victorjrp92/Mating-hotel-12-10-2025.git (push)
```

O con SSH:
```
origin  git@github.com:victorjrp92/Mating-hotel-12-10-2025.git (fetch)
origin  git@github.com:victorjrp92/Mating-hotel-12-10-2025.git (push)
```

### Cambiar Remote a HTTPS (si está en SSH y falla):
```bash
git remote set-url origin https://github.com/victorjrp92/Mating-hotel-12-10-2025.git
```

### Cambiar Remote a SSH (si está en HTTPS y quieres SSH):
```bash
git remote set-url origin git@github.com:victorjrp92/Mating-hotel-12-10-2025.git
```

---

## 📋 RESUMEN

**MÉTODO MÁS FÁCIL:**
1. Crear token en: https://github.com/settings/tokens
2. Copiar token
3. `git push origin main`
4. Username: `victorjrp92`
5. Password: `tu_token_aqui`
6. Para guardar: `git config --global credential.helper osxkeychain`

**MÉTODO MÁS SEGURO:**
1. `./setup_ssh.sh`
2. Seguir instrucciones
3. `git push origin main`

---

## ✅ DESPUÉS DE CONFIGURAR

```bash
cd "/Users/victorjrp92/Desktop/Mariting Beta 3"
git push origin main
```

Debería funcionar sin pedir credenciales (si usaste SSH o guardaste en keychain).

---

**Links Útiles:**
- Crear Token: https://github.com/settings/tokens
- Agregar SSH Key: https://github.com/settings/ssh/new
- Tu Repo: https://github.com/victorjrp92/Mating-hotel-12-10-2025

---

**Última actualización**: 19 Oct 2025
