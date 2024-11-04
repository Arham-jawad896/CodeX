from flask import Flask
from config import Config
from models import db, bcrypt
from routes import auth  # Importing the auth blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to a strong secret key
jwt = JWTManager(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(auth)  # Register the auth blueprint

if __name__ == '__main__':
    app.run(debug=True)
