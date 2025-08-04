from flask import Flask, request, jsonify  

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/api/data')
def get_data():
    data = {"message": "Hello, Flask!", "status": "success"}
    return jsonify(data)

@app.route('/hello/<name>')
def hello(name):
    return f"Hello, {name}!"

@app.route('/api/post', methods=['POST'])
def handle_post():
    data = request.get_json()  # JSON 데이터 받기
    return jsonify({"received": data})


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)