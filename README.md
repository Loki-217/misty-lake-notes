# Misty Lake Notes 本地维护手册

这是 Jason 的个人网站。页面框架、搜索、项目切换、文章路由和 BGM 播放器已经写好；日常更新主要通过 `config`、`content` 和 `public` 三个目录完成，不需要改页面组件。

## 1. 第一次在本地打开

需要先安装 Node.js 22 或更高版本，以及 VS Code。

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。保存文件后网页会自动刷新。

如果当前开发服务器显示了不同端口，以终端提示为准。

## 2. 最常用的文件

| 想修改什么 | 打开哪里 |
|---|---|
| 姓名、邮箱、GitHub、简历 | `config/profile.ts` |
| 首页“此刻的我” | `config/status.ts` |
| BGM 曲目 | `config/media.ts` |
| 手记 | `content/notes/` |
| 放映室条目 | `content/screenings/` |
| 项目 | `content/projects/` |
| 文章与项目图片 | `public/images/` |
| 网站背景 | `public/backgrounds/` |
| BGM 音频 | `public/audio/` |
| 简历 PDF | `public/resume/` |

## 3. 新增一篇手记

1. 复制 `templates/note.md` 到 `content/notes/`。
2. 把文件改成英文短名，例如 `first-job-week.md`。
3. 修改标题、日期、分类、标签和摘要。
4. 正文写完后，把 `draft: true` 改成 `draft: false`。

文件名会成为网址：`first-job-week.md` 对应 `/notes/first-job-week`。

正文支持标题、列表、引用、粗体、行内代码、代码块和链接。

## 4. 新增项目 B

1. 复制 `templates/project.md` 到 `content/projects/`。
2. 修改项目内容，将 `order` 设为 `2`，把 `published` 改为 `true`。
3. 保存后，工作台上方会自动出现项目 B 按钮。
4. 点击按钮后，下方会替换为项目 B；独立网址是 `/workbench/文件名`。

指标格式：

```text
metrics: 数值::单位::说明;;数值::单位::说明
```

项目正文中每个 `##` 小标题会自动变成项目详情卡片。

## 5. 新增放映室条目

复制 `templates/screening.md` 到 `content/screenings/`，填写分类、卡片符号、短评和正文，再把 `published` 改为 `true`。分类按钮、卡片和详情页会自动生成。

## 6. 配置 BGM

1. 只使用你有权公开播放的音频。
2. 把文件放进 `public/audio/`。
3. 在 `config/media.ts` 的 `bgmTracks` 数组中加入：

```ts
{ title: "曲名", artist: "作者", src: "/audio/文件名.mp3" }
```

BGM 默认关闭。播放器支持播放、暂停、上/下一首和音量记忆。没有配置曲目时会显示“NO DISC INSERTED”，不会产生报错。

## 7. 更新简历

把 PDF 放进 `public/resume/`，然后在 `config/profile.ts` 填写：

```ts
resume: "/resume/Jason-Liu-Resume.pdf",
```

页脚会自动出现下载按钮。以后更新时可以直接替换同名 PDF。

## 8. 本地检查与发布

修改完成后运行：

```bash
npm run lint
npm test
```

确认没有报错后，把修改提交并推送到 GitHub。连接自动部署后，线上网站会随 GitHub 更新。

## 9. 哪些地方暂时不要动

除非要改网站功能或整体布局，否则不需要修改：

- `app/components/`
- `app/lib/`
- `app/globals.css`
- `.openai/`
- `scripts/`

视觉装修阶段会继续把背景、按钮装饰和角色素材独立出来，让替换素材尽量不碰这些框架文件。
