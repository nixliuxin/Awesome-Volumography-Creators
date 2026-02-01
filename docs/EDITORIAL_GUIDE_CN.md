# 编辑规范

本文档定义了添加或编辑创作者条目的标准和流程。

---

## 0. 编辑理念

> **编辑的本质是「翻译 + 策展」，不是复制粘贴。**

### 最重要的原则

**在推送发布之前，以观众的身份完整浏览一遍自己的成果。**

问自己：
- 信息都对吗？
- 信息的层级对吗？（名字、职位、位置、标签的优先级）
- 第一眼看到的图片能不能传达这个创作者的独特性？
- 这个图片好不好看？会不会引起我的兴趣点进去？
- 如果我是第一次访问这个网站的用户，这些信息清晰吗？
- 有没有明显的错误或不一致？

如果你能诚实地做到这一点，下面的具体规范其实不那么重要——相信自己的判断。

---

### 其他原则

1. **语境化描述**
   - 不要照抄 LinkedIn 简介
   - 在 Volumography/3D扫描的语境下描述创作者
   - 例如："IT Services and IT Consulting" → "Creative Photogrammetry Studio"

2. **先调研**
   - 查看官网确认首选英文名
   - Google 搜索位置、背景信息
   - 大多数信息 5 分钟内可查到

3. **编辑判断**
   - 根据实际工作内容解读自述头衔
   - 使用网站的分类体系，而非创作者的个人 branding
   - 例如："Curator"（运营 IG 账号）→ "Designer, Developer"

4. **质量优先**
   - 宁可信息不完整，也不要信息错误
   - 宁可图片少而精，也不要多而差

---

## 1. 编辑流程

### 添加新创作者

1. **准备素材**
   - 创建文件夹：`website/assets/creators/{creator-id}/`
   - 将图片添加到 `gallery/` 子文件夹
   - 添加 `profile.jpg`（可选，如有头像）
   - 添加 `cover.jpg`（可选，用于封面图）

2. **更新数据**
   - 在 `website/data/creators.json` 中添加条目
   - 运行构建以重新生成 `assets-manifest.json`

3. **更新 README**
   - 将创作者添加到 `README.md` 的相应字母分组中

4. **检查并推送**
   - 在本地验证图片加载正常
   - 推送到 `main` 和 `release` 分支

---

## 2. 命名规范

### 名字层级

**主名字（`name`）必须使用拉丁字母（英文/拼音）。**

| 情况 | `name` | `name_origin` |
|------|--------|---------------|
| 有官方英文名 | 官方英文名 | 中文名（如有） |
| 中国人，无英文名 | 真名拼音 | 中文真名 |
| 使用网名/昵称 | 真名（如能查到） | 真名 / 网名 |
| 找不到真名 | 官方网名 | 网名 |

**示例：**

| 情况 | `name` | `name_origin` |
|------|--------|---------------|
| 官网有英文名 | `E.Mirascend` | （留空） |
| 中国人，真名已知 | `Yan Xiangning` | `严湘宁 / 海风质检员` |
| 中国摄影师 | `Chen Momo` | `陈墨墨` |
| 双人组合 | `FrānkǎnLīsà` | `Zhang Haotian + Li Tianying` |

**禁止：**
- ❌ 官网有英文名时使用拼音
- ❌ 能查到真名时使用网名作为主名
- ❌ 把英文名放在 `name_origin` 里

### 创作者 ID（文件夹 & JSON）

| 规则 | 示例 |
|------|------|
| 仅使用小写 | `nix-liu-xin` ✓，`Nix-Liu-Xin` ✗ |
| 使用连字符分隔 | `edmund-fraser` ✓，`edmund_fraser` ✗ |
| 基于主名字 `name` | E.Mirascend → `e-mirascend` |
| 特殊字符简化 | FrānkǎnLīsà → `frankanlisa` |
| 工作室/品牌保持简洁 | `oldmediaart`，`mediastorm` |

### 文件名

| 规则 | 示例 |
|------|------|
| 使用小写 | `profile.jpg` ✓，`Profile.JPG` ✗ |
| 避免空格 | `cover-image.jpg` ✓，`cover image.jpg` ✗ |
| 使用连字符或下划线 | `screenshot_001.png` ✓ |
| 接受的格式 | `.jpg`，`.jpeg`，`.png`，`.webp` |

---

## 3. 字段规范

### 必填字段

```json
{
  "id": "creator-id",           // 必须与文件夹名匹配
  "name": "显示名称",            // 保留原始大小写
  "name_origin": "",            // 原语言名字（中文等）或留空
  "title": "职位, 职位",         // 逗号分隔的角色
  "subtitle": "",               // 次要信息（可选）
  "location": "",               // 见下方位置格式
  "tags": [],                   // 见下方标签指南
  "addedDate": "2026-01-01",    // ISO 日期格式
  "links": {}                   // 见下方链接
}
```

### 位置格式

统一使用 `城市, 国家` 格式：

| ✓ 正确 | ✗ 错误 |
|--------|--------|
| `Los Angeles, USA` | `Los Angeles, CA` |
| `Tokyo, Japan` | `Tokyo` |
| `London, UK` | `London` |
| `Shanghai, China` | `Shanghai` |
| `Hong Kong` | （城市国家，无需加国家） |
| `Singapore` | （城市国家，无需加国家） |
| `France` | （不知道城市时可只写国家） |

多个地点：`Los Angeles, USA / Shanghai, China`

### 职位规范

**职位应反映实际工作，而非自我包装。**

1. **解读，而非复制**
   - 这个人在 Volumography 领域实际做什么？
   - LinkedIn 头衔可能与本集合无关

2. **使用网站的分类体系**
   
   | 类别 | 职位 |
   |------|------|
   | 视觉 | `Artist`，`Photographer`，`Filmmaker`，`Director` |
   | 技术 | `Developer`，`Engineer`，`Software Engineer` |
   | 创意技术 | `Designer`，`Creative Technologist` |
   | 研究 | `Researcher`，`XR Researcher` |
   | 组织 | `Studio`，`Collective`，`Content Creators` |

3. **解读示例**
   
   | 自述 | 实际工作 | 使用 |
   |------|---------|------|
   | "Curator" | 运营 IG 收藏账号 | `Designer, Developer` |
   | "IT Services" | 制作摄影测量艺术 | `Creative Photogrammetry Studio` |
   | "Digital Creator" | 制作 3DGS 影片 | `Filmmaker, Artist` |
   | "Independent Developer" | 开发 3DGS 工具 | `Developer` |

4. **格式**
   - 使用首字母大写：`Photographer, Artist`
   - 保留缩写：`VFX Artist`，`3D Artist`，`XR Researcher`
   - 多个角色用逗号分隔：`Designer, Engineer`

### 标签规范

**标签必须具体且可区分。**

#### 为什么废弃 "Reality Capture"

| 问题 | 解决方案 |
|------|----------|
| 歧义：软件名还是方法？ | 使用具体的方法名 |
| 太宽泛：涵盖一切 | 使用 `Photogrammetry`，`3D Scan`，`LiDAR` |
| 无筛选价值 | 具体标签帮助用户找到想要的 |

#### 批准的标签（严格按以下格式使用）

| 类别 | 标签 | 说明 |
|------|------|------|
| 采集方法 | `Photogrammetry`，`3D Scan`，`LiDAR`，`Point Cloud` | 如何采集的？ |
| 渲染技术 | `3DGS`，`4DGS`，`NeRF` | 如何渲染的？ |
| 输出格式 | `Volumetric Video`，`360 Video` | 最终形式是什么？ |
| 应用 | `VFX`，`Cinematic`，`Game`，`Digital Archive` | 用于什么？ |
| 工具 | `Unity`，`Unreal`，`TouchDesigner`，`Real-time` | 使用什么工具？ |
| 其他 | `AI`，`XR`，`Bullet Time` | 特殊技术 |

#### 标签选择标准

1. **基于实际作品，而非潜力**
   - 只标记他们确实做过的
   - 不要根据可能会的工具来标记

2. **具体优于笼统**
   - `Photogrammetry` > "3D scanning"（更具体）
   - `3DGS` > "neural rendering"（行业术语）

3. **与集合相关**
   - 标签应帮助用户有意义地筛选
   - 不要标记边缘技能

#### 已废弃的标签（禁止使用）

| 已废弃 | 改用 |
|--------|------|
| `Reality Capture` | `Photogrammetry` 或 `3D Scan` |
| `Game Art` | `Game` |
| `3D Scanning` | `3D Scan` 或 `Photogrammetry` |

### 链接

```json
"links": {
  "ct": "",                    // Creative.Tech 主页（如有）
  "website": "https://...",    // 官方网站
  "instagram": "https://...",
  "twitter": "https://...",    // 使用 x.com 网址
  "linkedin": "https://...",
  "youtube": "https://...",
  "bilibili": "https://...",
  "xhs": "https://..."         // 小红书
}
```

- 始终使用带 `https://` 的完整 URL
- 如无则留空字符串 `""`（不要省略字段）

---

## 4. 图片规范

> **宁缺毋滥。**

### 选择标准（必须全部满足）

| 标准 | 要求 |
|------|------|
| **质量** | 高分辨率，不模糊、不像素化 |
| **相关性** | 必须展示 Volumetric/3D 扫描作品 |
| **美观度** | 视觉吸引力，构图良好 |

**禁止包含：**
- ❌ 低分辨率截图
- ❌ 无关作品（即使很厉害）
- ❌ 没有最终成品的幕后图
- ❌ 太多相似图片（选最好的 3-5 张）

### 头像图
- 文件名：`profile.jpg` 或 `profile.png`
- 建议：正方形比例，清晰的人脸/logo
- 如果没有好的头像，不要添加（系统会隐藏头像区域）
- ❌ 不要使用随意的照片或占位图

### 画廊图片
- 放在 `gallery/` 子文件夹
- **策展，不是倾倒**：3-7 张高质量图片好过 20 张平庸的
- 建议：16:9 或类似比例
- 最低分辨率：长边 1280px
- 构建时会自动压缩为 WebP

### 封面图
- 文件名：`cover.jpg` 或 `cover.png`
- 应该是最具代表性/最令人印象深刻的作品
- 如未提供，会随机使用画廊图片（所以确保所有画廊图片都值得做封面）

---

## 5. 调研要求

添加创作者前，核实以下信息：

### 最低调研要求（必须）

| 检查项 | 去哪里查 |
|--------|----------|
| 官方英文名 | 官网，关于页面 |
| 真名（如使用网名） | 官网，采访，LinkedIn |
| 位置 | 网站页脚，LinkedIn，采访 |
| 是否活跃于 Volumography？ | 近期 3DGS/摄影测量作品 |

### 信息来源（按可靠性排序）

1. **官方网站** - 最权威
2. **LinkedIn** - 职业信息（但要解读职位）
3. **Instagram/Twitter 简介** - 通常有位置
4. **采访/文章** - 背景信息
5. **Google** - 快速事实核查

### 禁止

- ❌ 因为"只是个小条目"就跳过调研
- ❌ 有官方英文名时使用拼音
- ❌ 能轻松 Google 到时留空位置
- ❌ 不加思考地照抄 LinkedIn 职位

---

## 6. 质量检查清单

提交前检查：

- [ ] 文件夹名与 JSON 中的 `id` 匹配（小写，连字符）
- [ ] 所有图片文件名为小写且无空格
- [ ] 位置遵循 `城市, 国家` 格式
- [ ] 标签使用批准的术语和正确的大小写
- [ ] 链接是带 `https://` 的完整 URL
- [ ] `addedDate` 设置为今天的日期
- [ ] README 已更新新条目
- [ ] 本地预览图片加载正常

---

## 7. 常见错误

### 命名错误

| 错误 | 正确 | 原因 |
|------|------|------|
| `"name": "Huidaoqijishan"` | `"name": "E.Mirascend"` | 使用官网的官方英文名 |
| `"name": "海风质检员"` | `"name": "Yan Xiangning"` | 主名必须是拉丁字母 |
| `"name_origin": ""`（已知时） | `"name_origin": "严湘宁 / 海风质检员"` | 包含真名和网名 |

### 职位错误

| 错误 | 正确 | 原因 |
|------|------|------|
| `"IT Services and IT Consulting"` | `"Creative Photogrammetry Studio"` | 在本集合语境下描述 |
| `"Curator"` | `"Designer, Developer"` | 基于实际工作，而非自我包装 |
| `"Independent developer"` | `"Developer"` | 简化，使用网站分类体系 |

### 标签错误

| 错误 | 正确 | 原因 |
|------|------|------|
| `"Reality Capture"` | `"Photogrammetry"` 或 `"3D Scan"` | 歧义术语 |
| `"Game Art"` | `"Game"` | 标准化术语 |
| `["3DGS", "4DGS", "AI", "VFX", ...]` | 选 3-4 个最相关的 | 标签太多 = 无筛选价值 |

### 位置错误

| 错误 | 正确 | 原因 |
|------|------|------|
| `"LA"` | `"Los Angeles, USA"` | 全称 + 国家 |
| `"Belgian"` | `"Belgium"` | 国家名，不是形容词 |
| `""`（可查到时） | Google 一下 | 5 秒钟的调研 |

### 图片错误

| 错误 | 正确 |
|------|------|
| 20 张相似截图 | 精选最好的 5 张 |
| 低分辨率缩略图 | 找高清原图 |
| 无关的作品集 | 只要 Volumetric 作品 |

---

## 8. 决策示例

### 案例：海风质检员

**已有信息：**
- 小红书昵称：海风质检员
- 找到真名：严湘宁（Yan Xiangning）

**正确条目：**
```json
{
  "id": "yan-xiangning",
  "name": "Yan Xiangning",
  "name_origin": "严湘宁 / 海风质检员"
}
```

### 案例：Overhead4D

**LinkedIn 写着：** "IT Services and IT Consulting"  
**官网显示：** 摄影测量工作室，3DGS 作品

**正确职位：** `"Creative Photogrammetry Studio"`  
**原因：** 描述他们在 Volumography 领域做什么，而非商业类别

---

*最后更新：2026-02-01*
