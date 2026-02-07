---
title: VPN 和 Github Copilot
date: 2026-01-15
tags:
  - VPN
  - Github Copilot
---

# VPN 翻墙教程

我说翻墙其实是违法的(<br>但是其实很没办法的一件事情是，对于有的专业来说你其实免不了翻墙的操作，毕竟国内网络裸连 Github 的稳定性非常差，再有就是，像是 Z-lib 这样的资源站，往往也需要你科学上网才能够连得上上（但是还是要提醒，不要到外网上边碰一些不该碰的东西）。

---

## 相关概念

- VPN：

  	VPN 的原理是将你设备上的网络流量 **通过一个位于其他地区的中间服务器转发**，并会在传输过程中加密。因此在你使用了 VPN 之后，网络服务器识别你的 IP 地址时就会是你的 **中间服务器的 IP**，也因为这样，能够实现访问外网的效果。

- 订阅：

  	这其实就是前边说到的 **“中间服务器”**，打个比方说就是，你翻墙之后，还 **得有个人在墙对面接你**。一般的服务订阅都是需要付费的，当然你可以找到一些免费的订阅，但是 **我个人** 不是很推荐，因为这些免费的节点往往不是很稳定，并且这些节点可能带有恶意劫持。

- Clash:

  	这是一个代理客户端程序，主要是能够实现解析你的订阅配置，并且能够根据规则来决定什么时候应该走直连还是走代理（比方说国内的网站就走直连，国外的网站就走代理）。

---

## 具体操作

### 1.Clash 软件下载

	这里以我自己使用的软件（Clash Verge）为例：
	首先先在下边贴一下下载地址
	
	<a href="https://clash-verge.org/zh-CN" style="text-decoration:none; color:#0366d6;"> Clash Verge </a>

> 下载的时候浏览器可能会识别 Clash Verge 为有风险的文件，右键选择保留即可（无视风险继续安装）

	当你下载完成之后，打开 Clash Verge，点开侧边栏中的 `订阅`，这个时候里边还是空的，你还需要到其它地方获取一个可用的订阅。

### 2.获取订阅

	我自己使用的订阅是叫做 <a href="https://interface.pqjc.site/#/dashboard" style="text-decoration:none; color:#0366d6;"> 赔钱机场 </a>，节点不算特别快，但是日常使用算是比较够了。
	当然你也可以选择其它的订阅节点，但在购买订阅的时候一般不要买特别久，主要是怕跑路。
	在你购买订阅之后，订阅方会给你一个订阅链接，直接复制到 Clash Verge 订阅栏中的订阅文件链接处导入即可。

### 3.开启代理

	启用节点，并在 Clash Verge 中开启系统代理即可。

---

## 需要注意的点

- 有的时候学校可能会 **<font color ="red"> BAN </font>** 掉代理端口，比如去年考研的时候连在学校校网上，节点基本上都显示 <font color="red" > `Time out` </font>, 这种时候可以先考虑一下更换网络，也可以连在手机热点上试一下。
- **在关机之前记得关掉你的代理软件**，不关掉的话有的时候可能会有一些奇怪的问题。下面我给出一些我自己见到过的问题和当时的解决方案：
  - 有 `Wlan` 连接但是不能够上网：一般体现为浏览器界面提示 `“你的代理服务器可能有问题”`。
    - 解决方案：在你的代理软件里关掉代理后重试，如果仍然不行，可以再试一试在 Windows 的“**网络和 Internet 设置**“中的“**代理** ”中关闭 `使用代理服务器` 和 `使用代理脚本`。
  - 直接打不开浏览器    <span style="text-decoration:line-through;">(讲道理其实我也不清楚这是Edge的问题还是代理的问题)</span>
    - 解决方案：在任务管理器中关闭掉浏览器相关进程。

---

# Github Copilot 学生认证教程

GitHub Copilot 是一个由 GitHub 与大语言模型驱动的 **AI 编程助手**。

> 注意：Github Copilot 和微软 Windows 的 Colilot 不是一个东西

它主要是针对编程的一个 AI 助手，虽然你也可以采取一些其它方法来让它为你写论文之类的，但是在其它方面并没有那么好用，比如我现在在使用网页版时，上传文件总是会遇到卡顿的 BUG。

一般 Github Copilot 是搭配着 IDE 使用的，支持 Github Copilot 的 IDE 有：

<div class="tag-cloud" aria-label="支持的 IDE">
  <a class="tagcloud-item" target="_blank" rel="noopener"> <font color ="3399FF"> Visual Studio Code </font> </a>
  <a class="tagcloud-item" target="_blank" rel="noopener"> <font color ="purple"> Visual Studio </font> </a>
  <a class="tagcloud-item" target="_blank" rel="noopener"> <font color ="3366FF"> Xcode </font> </a>
  <a class="tagcloud-item" target="_blank" rel="noopener"> <font color ="FF3366"> JetBrains </font> </a>
  <a class="tagcloud-item" target="_blank" rel="noopener"> <font color ="993399"> Eclipseide </font> </a>
  <a class="tagcloud-item" target="_blank" rel="noopener"> <font color ="66FF99"> Neovim </font> </a>
</div>

你应该可以在这些 IDE 的插件中找到 Github Copilot。

对于学生，Github Copilot 提供了一年的免费使用。这个学生认证貌似是 AI 认证的，我在这里只是介绍我当时认证通过的方法，如果有人认证的时候遇到了始终无法通过的情况的话，可以再参考网上其它的一些方法。

---

## 提前准备

- 首先你需要有自己的一个 Github 账号。

- 除此之外还需要用到学校的邮箱、以及一份能够证明你在学校就读的东西（我自己用的是学生证）。

- 建议在在校期间进行认证。

---

## 具体操作

### 补充个人信息

- 登录你的 Github

- 点击你的头像后，点击 `settings`, 在 `Acess` 栏目下找到 `Biling and licening` 中的 **Payment information**, 补充相关信息：

  - 将名字如实填写，地址填写为学校的名字，城市填写为学校所在的城市，国家填写为中国

- 点击 `Email`, **添加绑定你学校的邮箱**

- > 在其它的一些教程中会要求你完善你的 `Pubilc Profile`，不过我自己是当时觉得麻烦，没有做这一步，最后也通过了

- 点击 `Password and authentication` 完成 2FA 认证：

  - 点开之后是一个二维码，使用 2FA 身份验证器（可以使用微信小程序中的 `腾讯身份验证器`）扫码，绑定之后会出现一个六位的数字密码，填写即可。然后一定是要记住下载之后的恢复密钥。

    > 2FA 身份验证开启之后，登录 Github 时，在输入账号密码之后，还会要求你再输入一个 2FA 验证码，这个密钥在前边使用的 2FA 身份验证器中能够查看。如果遇到找不到这个密钥的情况，就需要用到恢复密钥了

- 点开 <a href="https://github.com/education" style="text-decoration:none; color:#0366d6;"> Github Education </a>，在首页处点击 `Join Github Education` 开始认证, 这个步骤是不建议打开 VPN 的，过程中需要使用摄像头上传一份证明文件。

  > 就像前文中说的，在使用 VPN 之后，Github 识别到的 IP 地址将会是你的中间服务器的 IP 地址，于是它会要求你解释你为什么不在学校，可能会影响到最后的成功率。（所以前边也建议最好是在学校期间进行认证）
  
- 在上传之后不久就可以查看结果，如果审核不通过可以多尝试几次。在通过之后你的 Github Copilot 将会在三天之后可用，注意，这并不是自动启用的，而是需要你自己在 Github 上边进行确认的。

- 在确认之后你就可以在 <a href="https://github.com/copilot" style="text-decoration:none; color:#0366d6;"> Github Copilot </a> 和你的 IDE 中使用 Github Copilot 了。

  > 对于在 IDE 中的配置，在 IDE 中下载 Github Copilot，然后登录你的 Github 账号即可

---
## 补充

- 假如在不使用 VPN 的情况下无法连接到 Github 导致最后一步无法完成，可以尝试使用 <a href="https://www.dogfight360.com/blog/18627/" style="text-decoration:none; color:#0366d6;"> UsbEAm Hosts Editor </a> 修改 Github 的 host 配置。