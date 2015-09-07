# 保庇 Green Card Project
「根據民間傳說，玉皇大帝麾下有一名神祇*顧臨卡*專司移民與綠卡業務...」
本次 Silicon Valley Taiwan Hackathon 工程師們受到天啟 透過*擲筊 API*可保佑<sup>1</sup>綠卡及各項移民業務申辦<sup>2</sup>

<sup>1</sup> 保佑僅有 placebo effect (安慰劑效果)

<sup>2</sup> 移民與綠卡申請有風險，政府規費有去無回，申請流程請洽USCIS, DOL, 與律師事務所。

# 技術細節
保庇 Green Card 截至目前為止都是以前端 angler js 技術，html 與 css 開發而成，並沒有後端科技。

# 在 local 端執行
要在 local 端執行保庇 Green Card，不能只是在自己瀏覽器端開啟保庇 Green Card 的 html 檔案。

保庇 Green Card 雖然都是以前端 js 技術進行開發，要在 local 端成功執行，必須使用 http server 送 html 檔案才行，如果你的 local 有安裝 python ，可以嘗試以下步驟：

1. cd <保庇 Green Card 檔案夾>
2. python -m SimpleHTTPServer 8080 # 用 python SimpleHTTPServer 來 serve 保庇 Green Card 檔案
3. 用瀏覽器開 0.0.0.0:8080 即可

# License
MIT License.