

# from flask import Flask, render_template, request, jsonify
# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch
# import PyPDF2

# # Load tokenizer and model
# tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
# model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# # Load PDF content
# def load_pdf_content(pdf_path):
#     text = ""
#     with open(pdf_path, "rb") as file:
#         reader = PyPDF2.PdfReader(file)
#         for page in reader.pages:
#             text += page.extract_text() + "\n"
#     return text.lower()

# pdf_content = load_pdf_content("gsmb.pdf")

# app = Flask(__name__)

# @app.route("/")
# def index():
#     return render_template('chat.html')

# @app.route("/get", methods=["GET", "POST"])
# def chat():
#     msg = request.form["msg"].lower()
#     return get_Chat_response(msg)

# def get_Chat_response(text):
#     if text in pdf_content:
#         return "Yes, I found relevant information in the document."
#     else:
#         return "I don't know. The answer might not be in the provided document."

# if __name__ == '__main__':
#     app.run()
from flask import Flask, render_template, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import PyPDF2

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# Load PDF content
def load_pdf_content(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text.lower()

pdf_content = load_pdf_content("gsmb.pdf")

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"].lower()
    return get_Chat_response(msg)

def get_Chat_response(text):
    if text in pdf_content:
        # Extract relevant answer from the PDF content
        lines = pdf_content.split("\n")
        for line in lines:
            if text in line:
                return line  # Return the relevant line from the PDF
        return "I found related information but couldn't extract a precise answer."
    else:
        return "I don't know. The answer might not be in the provided document."

if __name__ == '__main__':
    app.run()