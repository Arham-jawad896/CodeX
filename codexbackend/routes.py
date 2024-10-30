from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User, bcrypt
from flask_cors import CORS
import io
import contextlib
import traceback

auth = Blueprint('auth', __name__)
CORS(auth, resources={r"/login": {"origins": "http://localhost:3000"}})

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully!"}), 201

@auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"msg": "No input data provided"}), 400
        
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Bad username or password"}), 401
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"msg": "Internal server error"}), 500

def execute_python_code(code):
    stdout_buffer = io.StringIO()
    stderr_buffer = io.StringIO()
    
    with contextlib.redirect_stdout(stdout_buffer), contextlib.redirect_stderr(stderr_buffer):
        try:
            exec(code)
            output = stdout_buffer.getvalue()
            error = stderr_buffer.getvalue()
            return output, error
        except Exception as e:
            error = traceback.format_exc()
            return None, error

@auth.route('/execute', methods=['POST'])
def execute():
    try:
        code = request.json.get('code', '')
        output, error = execute_python_code(code)
        
        if error:
            return jsonify({'error': error}), 200
        return jsonify({'output': output}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
