from flask import Flask, request, jsonify, g
from flask_cors import CORS

from auth import require_auth, require_role, get_roles
from db import Database

app = Flask(__name__)
CORS(app)

db = Database()

# GET /voti
# - docente: tutti i voti
# - studente: solo i propri voti
@app.route("/voti", methods=["GET"])
@require_auth
def get_voti():
    username = g.user.get("preferred_username")
    roles = get_roles(g.user)

    if "docente" in roles:
        voti = db.get_all_grades()
    elif "studente" in roles:
        voti = db.get_grades_for_student(username)
    else:
        return jsonify({"error": "Permesso negato"}), 403

    return jsonify({"voti": voti})

# POST /voti (solo docente)
@app.route("/voti", methods=["POST"])
@require_auth
@require_role("docente")
def add_voto():
    data = request.get_json() or {}
    studente = (data.get("studente") or "").strip()
    materia = (data.get("materia") or "").strip()

    try:
        voto = int(data.get("voto", ""))
    except (TypeError, ValueError):
        voto = None

    if not studente or not materia or voto is None:
        return jsonify({"error": "studente, materia e voto sono obbligatori"}), 400

    nuovo_id = db.add_grade(studente, materia, voto)
    return jsonify({"message": "Voto inserito", "id": nuovo_id}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
