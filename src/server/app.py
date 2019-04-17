from flask import Flask, render_template
from sassutils.wsgi import SassMiddleware
import json
import firebase_admin
from firebase_admin import credentials

with open("server_conf.json", mode="r") as f:
    CONFIG = json.load(f)

# Flask config
app = Flask(__name__)
app.wsgi_app = SassMiddleware(app.wsgi_app, {
    "app": ("static/scss", "static/css", "/static/css")
})

# Firebase config
cred = credentials.Certificate(CONFIG["firebase_service_key_path"])
firebase_admin.initialize_app(cred)

@app.route("/")
def index_route():
    return render_template("index.html")

@app.route("/oauth2signin")
def signin_route():
    pass

@app.route("/app")
def app_route():
    pass