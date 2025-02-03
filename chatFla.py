from flask import Flask, request, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)

# Initialize chatbot
chatbot = ChatBot('SimpleBot')
trainer = ChatterBotCorpusTrainer(chatbot)

# Train chatbot on English corpus
trainer.train('chatterbot.corpus.english')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    response = chatbot.get_response(user_input)
    return jsonify({"response": str(response)})

if __name__ == '__main__':
    app.run(debug=True)
