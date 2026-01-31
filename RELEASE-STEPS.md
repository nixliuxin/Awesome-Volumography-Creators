# 更新 main + 网站发布 操作清单

## 当前状态（已确认）
- **origin/release** 最新提交：`a86af98` — "add new creators" ✅
- **origin/main** 最新提交：`43ca2f2` — "merge new content with origin"（较旧）

---

## 第一步：让 main 和 GitHub 文件夹更新（合并 PR）

1. 在浏览器打开 PR 页面（见下方链接）。
2. 确认是 **base: main** ← **compare: release**（把 release 合进 main）。
3. 往下滚动，点击绿色按钮 **Merge pull request**。
4. 再点击 **Confirm merge**。
5. 合并完成后，到仓库 **Code** 页，分支选 **main**，刷新页面，应能看到最新 commit "add new creators" 和更新后的文件夹。

**PR 链接（若已存在）：**  
https://github.com/nixliuxin/Awesome-Volumography-Creators/compare/main...release  

若还没有 PR，点上面链接会进入 "Comparing changes"，再点 **Create pull request**，填写标题（如 "Merge release into main"）后创建，然后按上面步骤 3–5 合并。

---

## 第二步：确认网站（volumography.com）已更新

- **release** 上已有 "add new creators" (a86af98)，推送到 release 时会触发 Deploy。
- 检查部署是否成功：
  1. 打开：https://github.com/nixliuxin/Awesome-Volumography-Creators/actions  
  2. 左侧选 **Deploy**，看最近一次运行是否在 push release 之后且为绿色 ✅。
- 若部署成功但网页仍像没更新：浏览器 **Ctrl+F5** 强刷，或开无痕窗口访问 https://volumography.com 。

---

## 总结
| 目标           | 操作 |
|----------------|------|
| main / 文件夹更新 | 在 GitHub 合并 PR：release → main |
| 网站更新         | release 已含新提交；确认 Actions → Deploy 成功，必要时清缓存 |
