from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    message = "Hello, World"
    return render_template('index.html', message=message)

@app.route("/buscar.html",methods=["GET","POST"])
def buscar():
    return render_template('buscar.html')

@app.route("/borrar.html",methods=["GET", "DELETE"])
def borrar():
    return render_template('borrar.html')

@app.route("/editar.html",methods=["GET", "PUT"])
def editar():
    return render_template('editar.html')

@app.route("/insertar.html",methods=["GET", "POST"])
def insertar():
    return render_template('insertar.html')

@app.route("/ver.html", methods=["GET"])
def ver():
    return render_template('ver.html')

if __name__ == '__main__':
    app.run(debug=True)