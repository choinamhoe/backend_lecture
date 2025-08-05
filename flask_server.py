# pip install flask
from flask import Flask, request

app = Flask(__name__)

global notes
global idCounter
notes = dict()
idCounter = 1

@app.route("/")
def home():
    print(notes)
    return {"message":"안녕하세요.o o 동사무소입니다."}, 200

# @app.route("/notes",methods=["POST"])
# def receipt():
#     global idCounter
#     notes.update({idCounter:"민원"})
#     idCounter += 1
#     print(notes)
#     return {"message":"접수가 완료되었습니다."},200

@app.route("/notes",methods=["POST"])
def receipt():
    data = request.get_json()
    print(data)
    content = data["content"]
    global idCounter
    notes.update({idCounter:content})
    idCounter += 1
    print(notes)
    return {"message":"접수가 완료되었습니다."},200


@app.route("/notes/<id>",methods=["DELETE"])
def receipt_delete(id):
    id = int(id)
    if id in notes.keys():
        del notes[id]
        return {"message":"민원이 처리되었습니다."},200
    else:
        print(notes)
        return {"message":"처리할 민원 번호가 없습니다."}, 200

if __name__=="__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)