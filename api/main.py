import csv
import sqlite3
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's a fast-paced hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "quickstar.db"
CSV_FILE = "doststar_nationwide_dataset-TEST.csv"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Create table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS teachers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sdo TEXT,
            region TEXT,
            qualifications TEXT,
            years_of_experience INTEGER,
            subject_specialization TEXT,
            level_classification TEXT
        )
    ''')
    
    # Check if data exists
    cursor.execute('SELECT COUNT(*) FROM teachers')
    if cursor.fetchone()[0] == 0:
        with open(CSV_FILE, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            data_to_insert = []
            for row in reader:
                data_to_insert.append((
                    row['SDO'],
                    row['Region'],
                    row['Qualifications'],
                    int(row['Years of Experience']),
                    row['Subject Specialization'],
                    row['Level Classification']
                ))
            
            cursor.executemany('''
                INSERT INTO teachers (
                    sdo, region, qualifications, years_of_experience, subject_specialization, level_classification
                ) VALUES (?, ?, ?, ?, ?, ?)
            ''', data_to_insert)
            conn.commit()
    conn.close()

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/data")
def get_data():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM teachers')
    rows = cursor.fetchall()
    
    # Get column names
    column_names = [description[0] for description in cursor.description]
    
    result = []
    for row in rows:
        result.append(dict(zip(column_names, row)))
    
    conn.close()
    return result
