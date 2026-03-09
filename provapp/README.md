# Registro Elettronico (Angular + Flask + Keycloak)

Questo progetto è un esempio di una **applicazione Registro Elettronico** con:

- **Frontend**: Angular (client standalone components)
- **Backend**: Flask + PyMySQL (MySQL) con una semplice classe wrapper
- **Autenticazione / Autorizzazione**: Keycloak con ruoli `docente` e `studente`

## ✅ Funzionalità principali

### Docente
- Inserisce un voto per uno studente (studente, materia, voto)
- Visualizza i voti di tutti gli studenti

### Studente
- Visualizza solo i propri voti

### Routing & Guard
- Un docente vede solo l'area `Docente`
- Uno studente vede solo l'area `Studente`
- Accesso negato -> redirect su `/accesso-negato`

## 🧱 Esecuzione (Docker)

Avvia i servizi con:

```bash
docker compose up --build
```

### Accessi Keycloak per test
- **Docente**: `docente1` / `docente123`
- **Studente**: `studente1` / `studente123`

### Frontend
- http://localhost:4200

### Backend API
- http://localhost:5000

### Keycloak
- http://localhost:8080
  - username: **admin**
  - password: **admin**

## 🗂️ Struttura

- `provapp/` → frontend Angular
- `backend/` → API Flask + database
- `docker-compose.yml` → avvia Keycloak, MySQL e backend
- `keycloak-realm.json` → realm import per Keycloak (ruoli, client, utenti)

## 🧩 Nota tecnica
Backend definisce le seguenti rotte:
- `GET /voti` - ritorna i voti, filtrando per ruolo (docente vs studente)
- `POST /voti` - inserisce un voto (solo docente)

La comunicazione tra frontend e backend avviene con un token JWT di Keycloak (Bearer header).

---

Se vuoi estendere il modello (es. aggiungere anagrafiche studenti, materie, classi), la classe `backend/db.py` è il punto di partenza.
