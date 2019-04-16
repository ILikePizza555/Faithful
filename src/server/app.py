from flask import Flask, render_template
from sassutils.wsgi import SassMiddleware
import json

with open("server_conf.json", mode="r") as f:
    CONFIG = json.load(f)

def template_context_from_config(config=CONFIG):
    return {
        "google_clid": CONFIG["google"]["client_id"]
    }

app = Flask(__name__)

app.wsgi_app = SassMiddleware(app.wsgi_app, {
    "app": ("static/scss", "static/css", "/static/css")
})

@app.route("/")
def index_route():
    return render_template("index.html", **template_context_from_config())

@app.route("/tokensignin")
def signin_route():
    pass

@app.route("/app")
def app_route():
    pass