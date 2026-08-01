---
title: SeenFetch
year: 2025
order: 1
published: true
type: 毕业设计 / 全栈开发
tagline: 让网页数据采集从“写规则”变成“看得见的操作”。
summary: 一个面向非技术用户的可视化网页数据采集工具。通过实时浏览器画面、交互式选取与大模型字段识别，把复杂配置压缩成直观流程。
tech: Playwright, CDP, LLM, Docker, Aliyun ECS
source: https://github.com/Loki-217/seen-scraper
demo:
metrics: 10–15::FPS::浏览器实时预览;;40::FIELDS::测试识别字段;;3::RULES::完成采集配置;;3.3×::FASTER::配置效率提升
---

## 实时预览链路

基于 Playwright + CDP Screencast 搭建浏览器实时预览，稳定维持 10–15 FPS。

## 可视化采集

设计两种交互采集模式，让非技术用户通过点选完成字段与规则配置。

## 智能字段识别

接入两类大模型服务，理解字段语义并对非结构化数据进行自动分类。

## 定时与部署

支持从每 15 分钟到每月的采集任务，并使用 Docker 部署至阿里云 ECS。
