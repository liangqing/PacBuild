
功能
----
* 根据用户自定义的配置，自动生成PAC脚本
* 支持[Adblock Plus filter](http://adblockplus.org/en/filter-cheatsheet)，这个是著名的autoproxy项目使用的规则
* 支持IPv6匹配，即如果浏览的目标网站可以解析成IPv6地址，那么相应的规则将会匹配


安装与使用
----------
* 首先安装[node.js](http://nodejs.org/)
* 下载[PacBuild](https://github.com/liangqing/PacBuild/archive/master.zip)
* 复制config.sample.js到config.js
* 修改config.js相应设置
* 运行PacBuild.bat(windows下)，或者命令:

  ```node PacBuild.js```

* 程序会在当前目录生成autoproxy.pac(默认配置下)


配置
----
* config.sample.js中的配置项均有注释


