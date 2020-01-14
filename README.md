Chỉ cần gọi và sử dụng component. 
nếu login error sẽ không trả về callback mà tự show dialog thông báo rồi

```
 return <DialogLogin callbackLoginSuccess={(user: User) => {
       CommonUtils.openScreen("HomeScreen", {type: "reset", isNeedUpdateDataFireBase: true})
 }}/>
```
