import csv
import sqlite3
import os
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

DB_FILE = "quickstar.db"
CSV_FILE = "doststar_nationwide_dataset-TEST.csv"


def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS teachers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sdo TEXT,
            region TEXT,
            qualifications TEXT,
            years_of_experience INTEGER,
            year_joined TEXT,
            subject_specialization TEXT,
            level_classification TEXT
        )
    ''')

    cursor.execute('SELECT COUNT(*) FROM teachers')
    count = cursor.fetchone()[0]

    if count == 0:
        print(f"[QuickSTAR] Ingesting CSV: {CSV_FILE}")
        with open(CSV_FILE, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            batch = []
            total = 0
            for row in reader:
                try:
                    yoe = int(row['Years of Experience'])
                except (ValueError, KeyError):
                    yoe = 0
                
                # Accurately extract all 7 columns
                batch.append((
                    row.get('SDO', ''),
                    row.get('Region', ''),
                    row.get('Qualifications', ''),
                    yoe,
                    row.get('Year Joined', ''),
                    row.get('Subject Specialization', ''),
                    row.get('Level Classification', '')
                ))
                
                # Insert in ultra-fast batches of 5000 to prevent looping lag
                if len(batch) >= 5000:
                    cursor.executemany('''
                        INSERT INTO teachers (sdo, region, qualifications, years_of_experience, year_joined, subject_specialization, level_classification)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    ''', batch)
                    conn.commit()
                    total += len(batch)
                    print(f"[QuickSTAR] Inserted {total} rows...")
                    batch = []

            # Flush the remaining items
            if batch:
                cursor.executemany('''
                    INSERT INTO teachers (sdo, region, qualifications, years_of_experience, year_joined, subject_specialization, level_classification)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', batch)
                conn.commit()
                total += len(batch)

        print(f"[QuickSTAR] Done! Total rows: {total}")
    else:
        print(f"[QuickSTAR] DB already has {count} rows, skipping CSV ingest.")

    conn.close()


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/api/data")
def get_data():
    """Return all teacher records as a JSON array."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Retrieve all properly structured data
    cursor.execute(
        'SELECT sdo, region, qualifications, years_of_experience, '
        'year_joined, subject_specialization, level_classification FROM teachers'
    )
    rows = cursor.fetchall()
    conn.close()
    
    # Bypass FastAPI's slow Pydantic serialization for 126k rows
    data = [dict(row) for row in rows]
    return Response(content=json.dumps(data), media_type="application/json")
