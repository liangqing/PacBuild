function checkAdblockRule(rule, url, host) {
  var keyword = rule.keyword
    , urls = rule.url
    , domain = rule.domain
    , regex = rule.regex
    , i, re
  if(keyword) {
    for(i=keyword.length; i--;) {
      re = new RegExp(('*'+keyword[i]+'*').replace(/\.|\-/g, '\\$&').replace(/\*/g, '.*'), 'i') 
      if(re.test(url))
        return true
    }
  }
  if(urls) {
    for(i=urls.length; i--;) {
      re = new RegExp('^'+urls[i]+'.*')
      if(re.test(url))
        return true
    }
  }
  if(domain) {
    for(i=domain.length; i--;) {
      if(dnsDomainIs(host, domain[i]))
        return true
    }
  }
  if(regex) {
    for(i=regex.length; i--;) {
      if(new RegExp(regex[i]).test(url))
        return true
    }
  }
  return false
}
function check(rule, url, host) {
  var hosts = rule.hosts
    , nets = rule.nets
    , proxy = rule.proxy
    , ipv6 = rule.ipv6
    , adblockrules = rule._adblockrules
    , i, ip
  if(hosts) {
    for(i=hosts.length; i--;) {
      if(dnsDomainIs(host, hosts[i]))
        return proxy
    }
  }
  if(nets) {
    for(i=nets.length; i--;) {
      if(dnsDomainIs(host, nets[i].host, nets[i].mask))
        return proxy
    }
  }
  if(ipv6) {
    ip = dnsResolve(host)
    if(ip && ip.indexOf(':') >= 0)
      return proxy
  }
  if(adblockrules) {
    if(checkAdblockRule(adblockrules.exception, url, host))
      return undefined
    if(checkAdblockRule(adblockrules.match, url, host))
      return proxy
  }
  return undefined
}
function FindProxyForURL(url, host) {
  var rules=config.rules
    , len=rules.length, proxy, i
  for(i=0; i<len; i++) {
    proxy = check(rules[i], url, host)
    if(proxy)
      return proxy
  }
  return config.defaultProxy || "DIRECT"
}
