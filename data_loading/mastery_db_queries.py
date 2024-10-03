import sqlite3

def updateMastery(masteryToUpdate):
    """
    Updates the mastery data in the SQLite database.

    Args:
        masteryToUpdate (dict): A dictionary containing the mastery data to update. 
            The dictionary should have the following keys:
                - hiragana_id (int): The ID of the hiragana.
                - correct (int): The number of correct answers.
                - incorrect (int): The number of incorrect answers.
                - occurrences (int): The number of occurrences.

    Returns:
        bool: True if the update was successful, False otherwise.
    """
    try:
        conn = sqlite3.connect('database/db.db')
        cursor = conn.cursor()

        # Here, all hiraganas should be already initialized in the database. So we just need to update it right away.
        update_query = '''
            UPDATE MasteryData
            SET correct = ?,
                incorrect = ?,
                occurrences = ?,
            WHERE hiragana_id = ?;
        '''

        hiragana_id = masteryToUpdate.get('hiragana_id')
        correct = masteryToUpdate.get('correct')
        incorrect = masteryToUpdate.get('incorrect')
        occurrences = masteryToUpdate.get('occurrences')

        cursor.execute(update_query, (correct, incorrect, occurrences, hiragana_id))

        conn.commit()
        conn.close()

        return True
    except Exception as e:
        print(f'Error occurred when updating mastery data: {e}')
        return False