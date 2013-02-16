exports.config = {

  //if match no rules, then return the default proxy
  defaultProxy: "DIRECT"

  //target path, the program will ouput PAC to it
, path: 'autoproxy.pac'

  // define the rules how PAC file return proxy
, rules: [

    // first rule, high priority
    {
      //you can set to "DIRECT" or "PROXY host:port" or "SOCKS host:port" and so on
      //for more information please visit http://en.wikipedia.org/wiki/Proxy_auto-config
      proxy: "DIRECT"

      //the destination host match the network
    , nets: [
        '192.168.0.0/255.255.0.0'
      , '172.16.0.0/255.240.0.0'
      , '10.0.0.0/255.0.0.0'
      , '127.0.0.0/255.0.0.0'
      ]

      //the destination host match the domain
    , hosts: [
        '.weather.com.cn'
      , '.qq.com'
      , '.sina.com.cn'
      , '.sinaimg.cn'
      , '.sinajs.cn'
      , '.youku.com'
      , '.ykimg.com'
      , '.baidu.com'
      , '.sohu.com'
      , '.taobao.com'
      , '.taobaocdn.com'
      , '.renren.com'
      , '.xnimg.cn'
      , '.xiaonei.com'
      , '.images-amazon.com'
      , '.360buy.com'
      , '.360buyimg.com'
      , '.dangdang.com'
      , '.ddimg.cn'
      , '.cisco.com'
      , '.douban.com'
      ]
    }

    //second rule, low priority
  , {
      proxy: "SOCKS 127.0.0.1:8888"

    , hosts: [
        ".google.com"
      , ".twitter.com"
      ]

      //file path of the Adblock Rules file, the file content is encoded by base64
      //suport Adblock Plus Rules, more information please visit http://adblockplus.org/en/filter-cheatsheet
    , adblockrules: "gfwlist.txt"

      //if set ipv6 to true, and if the target host is ipv6 resolvable, the rule is match the target
    //, ipv6: true

    }

  ]
}
