import pandas as pd
import sqlite3

# Lire le fichier CSV
csv_file = 'hiraganas.csv'
df = pd.read_csv(csv_file)

# Connexion à la base de données SQLite
conn = sqlite3.connect('database/db.db')
cursor = conn.cursor()

# Insérer les hiraganas dans la table Hiragana
for index, row in df.iterrows():
    cursor.execute("INSERT OR IGNORE INTO Hiragana (hiragana, transcription) VALUES (?, ?)", (row['Hiragana'], row['Transcription']))

# Commit les changements et fermer la connexion
conn.commit()
conn.close()

print("Données insérées avec succès depuis le fichier CSV.")
