# backend/config.py
import os

class Config:
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(os.path.dirname(__file__), "codex.db")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GROQ_API_KEY = "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"

