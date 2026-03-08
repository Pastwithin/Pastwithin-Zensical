---
title: Markdown表格语法
date: 2026-01-19
tags:
  - Markdown
  - Mermaid
status: new
search:
    exclude: true
---

# Markdown表格语法(Mermaid)

## 通用说明

​	**什么是Mermaid？：**Mermaid是一个通过文本和代码来创建与修改图标的开源JavaScript库。而在Typora中，内置了Mermaid。

​	**Mermaid支持的图表类型如下：**

| 图表类型  |                  用途                  |
| :-------: | :------------------------------------: |
|  流程图   |             描绘流程、算法             |
|  序列图   |   展示系统内部随着时间顺序的相互作用   |
|  甘特图   |              用于项目管理              |
|   类图    |       程序设计中，表示类及其关系       |
|  状态图   | 描述一个东西在其生存周期内部的状态变化 |
|  扇形图   |         显示各部分占总体的比例         |
| Git提交图 |                   ？                   |
|    ……     |                   ……                   |

​	**在Typora中使用Mermaid：**需要将文本写在代码块中，并且标注语言为`Mermaid`,Typora会根据Mermaid语法进行图表的渲染。

​	**初始化配置：**可以在代码块开头使用init指令来设定图表的主题和流程图的布局，例如：

```
%%{init: {"theme":"default","flowchart":{"curve":"basis"}}}%%
graph LR	
  A --> B
```



``` mermaid
%%{init: {"theme":"default","flowchart": {"curve":"basis"}}}%%
graph LR
  A --> B
```

---

## 各类型图表格的简略说明

  > [!caution]
  >
  > 在暗色主题中，图表可能存在显示bug。

  > [!note]
  >
  > 这里只是简单的介绍，详细介绍可以查看[官方网站](https://mermaid.js.org/)或者是询问AI。

### 1.流程图

- **语法格式：**`graph <方向>	节点A-->节点B`
  
  - **方向设置：**`LR,TB,RL,BT`,
  
  - **节点设置**：
    - 节点ID**仅作为标识符存在**，真正显示的文本需要**放在节点形状中**：`A[真正显示的文本]`
    
  - **节点形状：**
    - 方框（矩形）： A[文本]
    - 圆角矩形（rounded）： A(文本)
    - 圆 / 椭圆： A((文本))
    - 判断 / 菱形（decision）： A{条件}
    - 圆角带边（stadium）： A([文本]) 
    - 子例程 / 连接： A[[子流程]]
    - 圆柱（数据库样式）： A[(数据库)]
    
  - **示例：**
  
    ```text
    graph LR
      S((开始)) --> R{是否继续?}
      R -->|是| P[执行操作]
      R -->|否| E((结束))
      P --> F[[子流程]]
      F --> DB[(数据库)]
    ```
  
    
    
    
    
    ```mermaid
    graph LR
      S((开始)) --> R{是否继续?}
      R -->|是| P[执行操作]
      R -->|否| E((结束))
      P --> F[[子流程]]
      F --> DB[(数据库)]
    ```
  


### 2.序列图

- **语法格式：**`sequenceDiagram 	participant 名称 as 别名	A->>B:消息`

- **示例：**

  ```text
  sequenceDiagram
    participant User as 用户
    participant API as 后端
    User->>API: 发送请求
    activate API
    API-->>User: 返回结果
    deactivate API
  ```

  
  
  
  
  ```mermaid
  sequenceDiagram
    participant User as 用户
    participant API as 后端
    User->>API: 发送请求
    activate API
    API-->>User: 返回结果
    deactivate API
  ```
  

### 3.甘特图

- **语法格式：**`gantt	title 标题 	dateFormat  YYYY-MM-DD	section 名称	任务:id,开始日期，持续时间`

- **示例：**

  ```text
  gantt
    title 假期计划
    dateFormat  YYYY-MM-DD 
    section 摸鱼
      丝之歌		:done, des1, 2026-01-01, 3d
      图灵完备	:active, des2, 2026-01-04, 5d
    section 开摆ing
    	睡觉		:done, after des2, 24h
  
  ```

  

  

  ```mermaid
  gantt
    title 假期计划
    dateFormat  YYYY-MM-DD
    section 摸鱼
      丝之歌		:done, des1, 2026-01-01, 3d
      图灵完备	:active, des2, 2026-01-04, 5d
    section 开摆ing
    	睡觉		:done, after des2, 48h
  
  
  ```

### 4.类图

- **语法格式：**`classDiagram	class 名称   {属性   方法}`

- **示例：**

  ```text
  classDiagram
    class 类名1 {
      属性1：XXX
      属性2：XXX
    }
    class 类名2 {
    	属性1：XXX
      属性2：XXX
    }
    属性1 <|-- 属性2
  ```

  

  ```mermaid
  classDiagram
    class 类名1 {
      属性1：XXX
      属性2：XXX
    }
    class 类名2 {
    	属性1：XXX
      属性2：XXX
    }
    类名1 -- 类名2
  ```

  

### 5.状态图

- **语法格式：**`stateDiagram	[*]-->stateA`

- **示例：**

  ```text
  stateDiagram
    [*] --> Idle
    Idle --> Processing : start
    Processing --> Done : finish
    Done --> [*]
    state Processing {
      innerIdle --> innerActive
    }
  ```

  

  

  ```mermaid
  stateDiagram
    [*] --> Idle
    Idle --> Processing : start
    Processing --> Done : finish
    Done --> [*]
    state Processing {
      innerIdle --> innerActive
    }
  ```

  

### 6.扇形图

- **语法格式：**`pie	title 标题	"标签"：数值`

- **示例：**

  ```text
  pie 
  title 销售占比
    "产品A" : 45
    "产品B" : 30
    "产品C" : 25
  ```

  

  

  ```mermaid
  pie 
  title 销售占比
    "产品A" : 45
    "产品B" : 30
    "产品C" : 25
  ```



### 7.Git提交图

- **语法格式：**`gitGraph	commit	branch	feature	commit	merge feature`

- **示例：**

  ```text
  gitGraph
    commit id: "Init"
    branch feature
    commit id: "feat1"
    checkout main
    commit id: "hotfix"
    merge feature
  ```

  

  

  ```mermaid
  gitGraph
    commit id: "Init"
    branch feature
    commit id: "feat1"
    checkout main
    commit id: "hotfix"
    merge feature
  ```

  

> [!note]
>
> 个人感觉这东西用处不大，其它的软件能够比这个好看很多的git提交图

> 除开以上提到的这些图表之外，mermaid还支持其它很多类型的图表。

