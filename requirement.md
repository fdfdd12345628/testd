# 功能與互傳

## 功能
- 走路
- 跑步
    - 記步
    - 配速
- 仰臥起坐
    - 偵測是否標準
- 深蹲
    - 同上
- 偵測跌倒

## 互傳
###走路

收到  
```
1
```

###跑步

傳 開始跑步
```
'start_running'
```

收到 記步
```
'r'
```

傳 結束跑步
```
'stop_running'
```

###仰臥起坐

傳 開始仰臥起坐
```
'start_situp'
```

收到 標準
```
'ok_situp'
```

收到 不標準
```
'bad_situp'
```

傳 結束仰臥起坐
```
'stop_situp'
```
###深蹲
 
傳 開始深蹲
```
'start_squat'
```

收到 標準
```
'ok_squat'
```

收到 不標準
```
'bad_squat'
```

傳 結束深蹲
```
'stop_squat'
```