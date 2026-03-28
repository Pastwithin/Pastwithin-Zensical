---
title: 在 WSL 下为 Digital IDE 配置 iverilog
tags:
  - WSL
  - Digital IDE
  - iverilog
  - VSCode
status: new
---

# 在 WSL 下为 Digital IDE 配置 iverilog

[Digital IDE](https://github.com/Digital-EDA/Digital-IDE) 是一款面向数字硬件设计的 VSCode 插件，支持 Verilog / SystemVerilog 的语法检查、仿真与综合等功能。在 WSL（Windows Subsystem for Linux）环境下使用时，需要将 iverilog 安装在 WSL 内部，并让插件正确找到它。

---

## 1. 在 WSL 中安装 iverilog

打开 WSL 终端，执行以下命令安装 iverilog：

```bash
sudo apt update
sudo apt install iverilog
```

安装完成后，验证安装是否成功：

```bash
iverilog -v
```

若输出版本号（如 `Icarus Verilog version 11.0 ...`），则说明安装成功。

---

## 2. 获取 iverilog 在 WSL 中的路径

Digital IDE 需要知道 iverilog 可执行文件的完整路径，执行以下命令获取：

```bash
which iverilog
```

通常输出为 `/usr/bin/iverilog`，记录此路径备用。

---

## 3. 在 VSCode 中配置 Digital IDE

### 3.1 确认 VSCode 远程连接到 WSL

建议通过 VSCode 的 **Remote - WSL** 扩展在 WSL 环境中打开项目，这样 Digital IDE 插件会直接在 WSL 内运行，能够正常访问 WSL 文件系统中的工具链。

1. 安装 [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) 扩展（若尚未安装）。
2. 在 VSCode 中按 `Ctrl+Shift+P`，搜索并执行 **WSL: Open Folder in WSL**，在 WSL 环境下打开工程目录。

### 3.2 配置 Digital IDE 的 iverilog 路径

在 VSCode 中按 `Ctrl+Shift+P`，搜索 **Preferences: Open Settings (JSON)**，打开 `settings.json`，添加以下配置：

```json
{
    "digital-ide.iverilog.install.path": "/usr/bin/iverilog"
}
```

> **说明：** 将 `/usr/bin/iverilog` 替换为第 2 步中 `which iverilog` 实际输出的路径。

若需要同时配置 `vvp`（iverilog 的仿真执行器），也一并添加：

```json
{
    "digital-ide.iverilog.install.path": "/usr/bin/iverilog",
    "digital-ide.vvp.install.path": "/usr/bin/vvp"
}
```

---

## 4. 验证配置

在 VSCode 中打开一个 `.v` 或 `.sv` 文件，查看底部状态栏或「问题」面板，如果 Digital IDE 能正常对文件进行语法检查（报错或无报错但无"找不到工具"的提示），则说明配置成功。

也可以在 WSL 终端中直接运行 iverilog 对文件进行编译，确认工具链本身工作正常：

```bash
iverilog -o sim_out your_file.v && vvp sim_out
```

---

## 5. 常见问题

### 插件提示找不到 iverilog

- 确认 iverilog 已安装：`which iverilog` 有输出。
- 确认 VSCode 是通过 Remote - WSL 连接到 WSL 的，而不是直接在 Windows 中打开项目。
- 检查 `settings.json` 中路径与 `which iverilog` 输出一致。

### WSL 版本建议

推荐使用 **WSL 2**，性能更好且与 VSCode Remote 的兼容性更佳。可在 Windows PowerShell 中执行以下命令查看当前版本：

```powershell
wsl -l -v
```

若需升级到 WSL 2，请参考 [微软官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/install)。
