from flask import Flask
from flask_cors import CORS

from api import user, login
from api.user import db


def create_api():
    app_flask = Flask(__name__, instance_relative_config=True)
    app_flask.config.from_mapping(
        SECRET_KEY='dev',
    )
    app_flask.secret_key = 'dev'
    app_flask.config['JSON_SORT_KEYS'] = False
    CORS(app_flask)
    app_flask.register_blueprint(user.bp)
    app_flask.register_blueprint(login.bp)
    db.init_app(app_flask)

    return app_flask


app = create_api()