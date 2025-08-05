#pip install fastapi uvicorn
#uvicorn fastapi_server:app --reload --port 8080 <-- 소스 수정 후 저장시 바로 반영되는 명령어
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
app = FastAPI()

class Item(BaseModel):
    name: str
    age : int

global idCounter
global result
global message
result = []
idCounter = 1


@app.post("/items")
def create_item(item: Item):
    global idCounter
    global message
    result.append({"id":idCounter,"name":item.name,"age":item.age})
    idCounter += 1
    print(result)
    message = "정상등록되었습니다."
    return JSONResponse({
        "message" : message},
        status_code=status.HTTP_200_OK
    )

@app.get("/items")
def get_items():
    message = "정상 조회되었습니다."
    if len(result)==0:
        return JSONResponse(
            content={"message":"데이터를 찾을 수 없습니다."},
            status_code=status.HTTP_200_OK
        )
    else: 
        print(result)
        return JSONResponse({
            "message" : message},
            status_code=status.HTTP_200_OK
        )

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if len(result)==0:
        message = "데이터를 찾을 수 없습니다."
        return JSONResponse(
            content={"message":message},
            status_code=status.HTTP_200_OK
        )
    else: 
        for i,value in enumerate(result):
            print(i,value)
            if item_id == value["id"]:
                print(item_id,result[item_id])
                message = "정상 조회되었습니다."
                break
            else:
                message = "id값이 존재하지 않습니다."
        return JSONResponse({
            "message" : message},
            status_code=status.HTTP_200_OK
        )
            
       

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    result[item_id] = item
    print(result)
    message = "정상 변경되었습니다."
    return JSONResponse({
        "message" : message},
        status_code=status.HTTP_200_OK
    )
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    item = result.pop(item_id)
    print(result)
    message = "정상 삭제되었습니다."
    return JSONResponse({
        "message" : message},
        status_code=status.HTTP_200_OK
    )

if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=8080)