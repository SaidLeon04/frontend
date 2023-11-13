from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/index", methods=["GET"])
def index():
    message = "Hello, World"
    return render_template('index.html', message=message)

@app.route("/buscar",methods=["GET","POST"])
def buscar():
    return render_template('buscar.html')

if __name__ == '__main__':
    app.run(debug=True)