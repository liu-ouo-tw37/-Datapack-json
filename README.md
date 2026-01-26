# 🛠️ Minecraft Datapack to JSON 音樂轉換工具

這是一個桌面應用程式，專門用於將 Minecraft 的紅石音樂（Datapack / .mcfunction）轉換為結構化的 JSON 檔案，方便後續在 WebSocket Server 或其他專案中使用

## 功能特色
* **免安裝設計**：提供 Portable 便攜版 `.exe`，下載即用。
* **自動換算 TPS**：支援自定義 TPS，自動計算正確的 Tick 時間軸。
* **音高解析**：自動處理 `playsound` 指令中的 Pitch（音高），並支援自定義的音域擴充（如 `_1`, `_-1` 等）。
* **批次處理**：選取整個資料夾即可自動轉換內部所有的 `.mcfunction` 檔案。

## 如何使用
1. **下載程式**：前往 [Releases](https://github.com/liu-ouo-tw37/-Datapack-json/releases/tag/v1.0.0) 下載最新的 `.exe` 檔案。
2. **準備資料**：確保你的 Datapack 檔案命名為數字（例如 `0.mcfunction`, `10.mcfunction`）。
3. **執行轉換**：
   * 將下載下來的音樂Datapack解壓縮
   * 開啟程式，選擇Datapack裡的 `data/(你的datapack名稱)/function/notes` 為**輸入資料夾**。
   * 選擇轉換後的 JSON 檔案 **輸出位置**。
   * 輸入你的歌曲 **TPS**，點擊轉換。
4. **完成**：轉換後的 JSON 檔案會以資料夾名稱命名，並保存在你指定的位置。

## 事先準備
* 你可以安裝[Note Block Studio](https://noteblock.studio/)，打看程式後將想要的音樂(midi檔之類的)，放入Note Block Studio，然後將其Export成Datapack。

  <img width="651" height="445" alt="image" src="https://github.com/user-attachments/assets/35e1522c-42e5-4c11-bd58-64594a0122a6" />

* 接著，輸入你的檔案名稱，**Minecraft version選擇1.21+**，並**打開Include out-of-range notes**選項，最後在按下Export並等待。

  <img width="441" height="348" alt="image" src="https://github.com/user-attachments/assets/5ae0b4bf-1254-47bc-b3b2-4f6c89813658" />

* 下載好Datapack後，解壓縮，就可以使用本程式啦
