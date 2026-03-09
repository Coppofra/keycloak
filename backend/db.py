import os
import time
from typing import Dict, List, Optional

import pymysql
from pymysql.cursors import DictCursor


class Database:
    """Semplice wrapper per PyMySQL che espone metodi per gestire i voti."""

    def __init__(self):
        self.host = os.getenv("DB_HOST", "localhost")
        self.port = int(os.getenv("DB_PORT", "3306"))
        self.user = os.getenv("DB_USER", "registro")
        self.password = os.getenv("DB_PASSWORD", "registro")
        self.database = os.getenv("DB_NAME", "registro")
        self._conn: Optional[pymysql.connections.Connection] = None
        self._connect()
        self._ensure_tables()

    def _connect(self):
        """Connect to the DB, retrying while the container is starting."""
        max_attempts = 10
        delay = 1
        for attempt in range(1, max_attempts + 1):
            try:
                self._conn = pymysql.connect(
                    host=self.host,
                    port=self.port,
                    user=self.user,
                    password=self.password,
                    database=self.database,
                    cursorclass=DictCursor,
                    autocommit=True,
                )
                return
            except Exception as e:
                if attempt == max_attempts:
                    raise
                time.sleep(delay)
                delay = min(delay * 2, 5)

    def _ensure_tables(self):
        sql = """
        CREATE TABLE IF NOT EXISTS voti (
            id INT AUTO_INCREMENT PRIMARY KEY,
            studente VARCHAR(255) NOT NULL,
            materia VARCHAR(255) NOT NULL,
            voto INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        with self._conn.cursor() as cur:
            cur.execute(sql)

    def add_grade(self, studente: str, materia: str, voto: int) -> int:
        """Inserisce un voto e restituisce l'id."""
        sql = "INSERT INTO voti (studente, materia, voto) VALUES (%s, %s, %s)"
        with self._conn.cursor() as cur:
            cur.execute(sql, (studente, materia, voto))
            return cur.lastrowid

    def get_all_grades(self) -> List[Dict]:
        sql = "SELECT id, studente, materia, voto, created_at FROM voti ORDER BY created_at DESC"
        with self._conn.cursor() as cur:
            cur.execute(sql)
            return cur.fetchall()

    def get_grades_for_student(self, studente: str) -> List[Dict]:
        sql = "SELECT id, studente, materia, voto, created_at FROM voti WHERE studente = %s ORDER BY created_at DESC"
        with self._conn.cursor() as cur:
            cur.execute(sql, (studente,))
            return cur.fetchall()
