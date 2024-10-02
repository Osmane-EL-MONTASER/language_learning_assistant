import sqlite3

def load_hiraganas():
    """
    Loads all Hiraganas from the SQLite database.

    This function connects to the SQLite database 'db.db', retrieves all records from the 'Hiragana' table,
    and returns them as a list of tuples.

    Returns:
        list of tuple: A list where each tuple contains the data of a Hiragana record from the database.
    """
    # Connect to your SQLite database
    conn = sqlite3.connect('database/db.db')
    cursor = conn.cursor()

    # Query to select all Hiraganas
    cursor.execute('SELECT * FROM Hiragana')

    # Fetch all results
    hiraganas = cursor.fetchall()

    # Close the connection
    conn.close()

    # Return the list of Hiraganas
    return hiraganas