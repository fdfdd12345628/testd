#include<SoftwareSerial.h>

SoftwareSerial BT(10, 11); // 接收腳, 傳送腳
char val;  // 儲存接收資料的變數

void setup() {
  Serial.begin(9600);   // 與電腦序列埠連線
  Serial.println("BT is ready!");

  // 設定藍牙模組的連線速率
  // 如果是HC-05，請改成38400
  BT.begin(9600);
}

void loop() {
    delay(12000);
    BT.println("falling");
    while(BT.available()){
      Serial.write(BT.read());
    }
    
    Serial.println("");
}

// {"step":1}

// {"":}
