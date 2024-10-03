import sqlite3

def loadMastery():
    """
    Loads all Mastery from the SQLite database.

    This function connects to the SQLite database 'db.db', retrieves all records from the 'MasteryData' table,
    and returns them as a list of tuples.

    Returns:
        list of tuple: A list where each tuple contains the data of a MasteryData record from the database.
    """
    # Connect to your SQLite database
    conn = sqlite3.connect('database/db.db')
    cursor = conn.cursor()

    # Query to select all Mastery
    cursor.execute('SELECT * FROM MasteryData')

    # Fetch all results
    masteries = cursor.fetchall()

    # Close the connection
    conn.close()

    # Return the list of Mastery
    return masteries