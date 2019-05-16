from pathlib import Path
import os

from flask import Flask, send_file, send_from_directory
from flask_cors import CORS


root_path = Path(os.path.abspath(__file__)).parent
app = Flask(__name__, static_folder='E:\\2019_HEDIS_SPECS\\MeasureViewer\\build')
CORS(app)

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and Path(app.static_folder, path).exists():
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/<filename>', methods=['GET'])
def send_pdf(filename):
    fpath = Path(root_path, 'pdfs', filename + '.pdf')

    if not fpath.is_file():
        return 'No such file', 404

    response = send_file(
        str(fpath),
        mimetype='application/pdf',
        as_attachment=False)

    return response, 200

if __name__ == '__main__':
    app.run(threaded=True)


