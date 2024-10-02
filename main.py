from flask import Flask, render_template
from data_loading.hiragana_loader import load_hiraganas
from data_loading.mastery_loader import load_mastery
app = Flask(__name__)

@app.route('/')
def index():
    hiraganas = load_hiraganas()
    masteries = load_mastery()
    return render_template('index.html', hiraganas=hiraganas, masteries=masteries)

if __name__ == '__main__':
    app.run(debug=True)