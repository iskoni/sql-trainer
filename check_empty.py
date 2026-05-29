import sqlite3
import json
import re

# 1. Extract seed SQL
with open('js/database.js', 'r', encoding='utf-8') as f:
    db_js = f.read()
    seed_sql = re.search(r'this\.db\.run\(`(.*?)`\);', db_js, re.DOTALL).group(1)

# 2. Load exercises
with open('exercises.json', 'r', encoding='utf-8') as f:
    exercises = json.load(f)

# 3. Setup SQLite and check for empty results
empty_results = []
errors = []

for ex in exercises:
    # Use a fresh connection for each to ensure independent state (or rollback)
    conn = sqlite3.connect(':memory:')
    conn.executescript(seed_sql)
    
    query = ex.get('expectedQuery')
    setup = ex.get('setupSQL')
    note = ex.get('note')
    
    # skip conceptual exercises
    if note and 'AS concept' in query:
        continue
        
    # We only care about SELECT queries that return rows
    is_select = query.strip().upper().startswith('SELECT') or query.strip().upper().startswith('WITH')
    if ex.get('validationType') in ['dml', 'ddl', 'multi']:
        continue # skip DML/DDL tests for this specific check, although we could check verificationQuery
        
    if not is_select:
        continue

    try:
        if setup:
            conn.executescript(setup)
            
        cursor = conn.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        
        if len(rows) == 0:
            empty_results.append((ex['id'], ex['title'], query, ex.get('difficulty')))
            
    except Exception as e:
        errors.append((ex['id'], str(e)))

print(f"Total SELECT exercises checked: {len(exercises)}")
print("-" * 40)
if empty_results:
    print(f"Found {len(empty_results)} exercises returning EMPTY sets:\n")
    for r in empty_results:
        print(f"ID: {r[0]} | Difficulty: {r[3]} | Title: {r[1]}")
        print(f"Query: {r[2]}\n")
else:
    print("✅ No empty results found!")

if errors:
    print("-" * 40)
    print(f"Errors (might be SQLite version differences): {len(errors)}")
    for err in errors[:5]:
        print(f"ID {err[0]}: {err[1]}")
