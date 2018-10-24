### 安装 IYSQL

IYSQL - Improve You SQL 

#### 安装

IYSQL依赖[Soar](https://github.com/XiaoMi/soar),在使用之前您需要安装[Soar](https://github.com/XiaoMi/soar)，IYSQL也支持美团出品的[SQLAdvisor](https://github.com/Meituan-Dianping/SQLAdvisor)。（这是一个可选的插件）


##### 第一步

安装soar

##### 配置环境变量

```bash
export soar=/root/soft/soar-master/soar #这个地址是soar的执行地址
export sqladvisor=/root/soft/SQLAdvisor-master/sqladvisor/sqladvisor #这个地址是sqladvisor的执行地址
```

##### 安装依赖

```bash
#Mac环境
brew install python3-pip python3

#Linux
yum install python3-pip python3

```

##### 执行初始化

```bash
./scripts/init.sh

```

##### 启动

```bash
./scripts/start.sh

```

打开[http://localhost:5000](http://localhost:5000)
