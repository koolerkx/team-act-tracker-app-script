# Team Act Tracker by App Script

<p align="center">
  <img width="502" alt="image" src="https://github.com/koolerkx/team-act-tracker-app-script/assets/20885563/ef4eddaa-91bb-47c0-b0c3-71d7a446cb20">
</p>

A app using google service aimed to help event to record point check in and check out action. In addition, calculate the point to do allow participant complete with others.

## Implemented Feature

- Check In by Google From
  - Automatic check out other them
  - Check the team status not blocking by admin
- Ranking Table
  - With team name, score, and captured point
- Team View
  - Each team have own view designed for mobile

## Initial Setup | 初次設定方法

1. Google Sheet  
   (Also can clone from _[Template](https://docs.google.com/spreadsheets/d/1RkHDLC84nLUvC2mYMz_IyFXDGGgMjCNDBeEgrtoQljc/edit?usp=sharing)_, 可跳過這步，記僅刪除表單回應工作表)
   1. 創建新的 Google Sheet
   2. 建立 App Script
   3. 設置以下「工作表」
      - Info Team
        - 設置隊伍名單
      - Info Point
        - 設置 Point
      - 每隊一個獨立的版面 (例：`Team XX`)
2. Google Form
   1. 每個佔領點建立一個 Google Form
   2. 每個 Google Form 連接到先前建立的 Google Sheet
      - `回覆Tab > 選擇回應目標位置 > 選取現有試算表`
   3. 把 Google Sheet 相應的工作表 改名 (例：`Form - A`)
   4. 設置 `檔案 > 設定 > 計算 > 重新計算 > 每分鐘和設定值變更時`
3. App Script
   1. 把這個 Project 的 Code 複製都 Google Sheet App Script 的裡面
   2. 設置觸發條件 `選取活動類型 > 提交表單時`
   3. 執行 `OnPointFormSubmit`

## 分享單一頁面予參加者

主要試算表：

1. 每隊有一個獨立的版面 (例：`Team XX`)，做好設計
2. 下方的工作表列 `複製到 > 新試算表`

單一頁面

1. 保留格式，刪除所有內容
2. 在　`A1` 輸入以下內容
   ```
   =IMPORTRANGE("https://docs.google.com/spreadsheets/d/<文件ID>/edit", "<工作表名稱>!A:E")
   ```
3. 把文件 ID 和工作表名稱、範圍變更為需要的值
4. 設置顏色等條件性格式
