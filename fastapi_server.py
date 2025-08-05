#pip install fastapi uvicorn
#uvicorn fastapi_server:app --reload --port 8080 <-- 소스 수정 후 저장시 바로 반영되는 명령어
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
app = FastAPI()

global notes
global idCounter
notes = []
idCounter = 1

class MyRequest(BaseModel):
    content: str

@app.post("/notes")
def receipt(data: MyRequest):
    global idCounter
    notes.append({"id":idCounter,"content":data.content})
    idCounter += 1
    print(notes)
    return JSONResponse(
        content = {"message":"접수가 완료되었습니다."},
        status_code=status.HTTP_200_OK
    )

@app.get("/")
def hello():
    print(notes)
    return JSONResponse(
        content={"message":"안녕하세요 o o 동사무소입니다."},
        status_code=status.HTTP_200_OK
    )

@app.delete("/notes")
def receipt_remove():
    if len(notes)==0:
        print(notes)
        return JSONResponse(
            content={"message":"처리할 민원이 없습니다."},
            status_code=status.HTTP_200_OK
        )
    else:
        notes.pop(0) # 첫번째 요소 제거
        print(notes)
        return JSONResponse(
            content={"message":"민원이 처리되었습니다."},
            status_code=status.HTTP_200_OK
        )
@app.patch("/notes/{id}/{content}")
def receipt_update(id:int,content:str):
    print(notes)
    if len(notes)==0:
        return JSONResponse(
            content={"message":"데이터를 찾을 수 없습니다."},
            status_code=status.HTTP_200_OK
        )
    else: 
        for i,value in enumerate(notes):
            print(i, value)
            if id == value["id"]:
                notes[i]['content'] = content
                print(notes)
                return JSONResponse(
                    content={"message":"정보변경이 완료되었습니다."},
                    status_code=status.HTTP_200_OK
                )   
            else:
                return JSONResponse(
                    content={"message":"매칭된 접수번호가 없습니다."},
                    status_code=status.HTTP_200_OK
                )
         
    # data = [i for i in notes if i["id"]==id]
    # print(data)
    # if len(data)==0:
    #     return JSONResponse(
    #         content={"message":"데이터를 찾을 수 없습니다."},
    #         status_code=status.HTTP_200_OK
    #     )
    # else:
    #     is_id = [i["id"]==id for i in notes]
    #     print(is_id)
    #     # pip install numpy==1.26.3
    #     import numpy as np
    #     is_id_num = np.where(is_id)[0][0]
    #     print(is_id_num)
    #     print(notes[is_id_num])
    #     notes[is_id_num]["content"] = content
    #     print(notes)
    #     return JSONResponse(
    #         content={"message":"정보변경이 완료되었습니다."},
    #         status_code=status.HTTP_200_OK
    #     )

if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=8080)