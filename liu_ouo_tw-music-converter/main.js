const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow(){
    const win = new BrowserWindow({
        width: 500,
        height: 650,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.setMenuBarVisibility(false);
    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("select-dirs", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });
    return result.filePaths[0];
});

ipcMain.on("start-convert", (event, { inputPath, outputPath, tps}) => {
    try {
        const output = [];
        const files = fs.readdirSync(inputPath).filter(f => f.endsWith(".mcfunction"));

        const speed_ratio = 20 / parseFloat(tps);
        files.forEach(file => {
            const rawTick = parseInt(file.replace(".mcfunction", ""));
            const tick = Math.round(rawTick * speed_ratio);
            const content = fs.readFileSync(path.join(inputPath, file), "utf-8");
            const lines = content.split(/\r?\n/);

            lines.forEach(line => {
                const match = line.match(/playsound\s+[\w:.]+\.([\w.-]+)\s+[\w@.]+\s+[\w@.]+\s+[\^\d.~-]+\s+[\^\d.~-]+\s+[\^\d.~-]+\s+[\d.]+\s+([\d.]+)/);
                if (match){
                    let instrument = match[1];
                    let pitch = parseFloat(match[2]);

                    if (instrument.includes("_-1")){
                        pitch = pitch / 4;
                        instrument = instrument.replace("_-1", "");
                    } else if (instrument.includes("_1")){
                        pitch = pitch * 4;
                        instrument = instrument.replace("_1", "");
                    } else if (instrument.includes("_-2")){
                        pitch = pitch / 16;
                        instrument = instrument.replace("_-2", "");
                    } else if (instrument.includes("_2")){
                        pitch = pitch * 16;
                        instrument = instrument.replace("_2", "");
                    }

                    output.push({
                        t: tick,
                        i: "note." + instrument,
                        p: parseFloat(pitch.toFixed(6))
                    });
                }
            });
        });
        output.sort((a, b) => a.t - b.t);

        const folderName = path.basename(inputPath);
        const finalFileName = `${folderName}_convered.json`
        const savePath = path.join(outputPath, finalFileName);
        fs.writeFileSync(savePath, JSON.stringify(output, null, 2));
        event.reply("convert-done", `轉換成功！\n存檔位置：${savePath}`);
    } catch (err){
        event.reply("convert-done", `轉換失敗：${err.message}`)
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});