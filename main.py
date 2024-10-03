from flask import Flask, render_template, request, jsonify
from data_loading.hiragana_loader import loadHiraganas
from data_loading.mastery_loader import loadMastery
from data_loading.mastery_db_queries import updateMastery

app = Flask(__name__)

@app.route('/')
def index():
    hiraganas = loadHiraganas()
    masteries = loadMastery()
    return render_template('index.html', hiraganas=hiraganas, masteries=masteries)

@app.route('/update_mastery', methods=['POST'])
def updateMastery():
    data = request.json
    masteryToUpdate = data.get('masteryToUpdate', [])

    isSaved = updateMastery(masteryToUpdate)

    if isSaved:
        return jsonify({'status': 'success', 'message': 'Mastery data saved successfully!'})
    else:
        return jsonify({'status': 'failed', 'message': 'Failed to update mastery data.'})

if __name__ == '__main__':
    app.run(debug=True)