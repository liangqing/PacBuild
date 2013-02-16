var FS = require('fs')
  , ruleParsers = [
      {
        re: /^\[.+\]$/
      }
    , {
        name: 'domain'
      , re: /^\|\|(.+)\/?$/
      }
    , {
        name: 'url'
      , re: /^\|(.+)$/
      }
    , {
        name: 'regex'
      , re: /^(\/.+\/[igm]{0,3}?)$/
      }
    , {
        name: 'keyword'
      , re: /(.+)/
      }
    ]

build(require('./config').config)

function build(config) {
  var rules = config.rules
  if(!rules) return console.log("No rules config.")
  rules.forEach(function(rule) {
    var nets = rule.nets
      , path = rule.adblockrules
      , _nets
    if(nets) {
      _nets = []
      nets.forEach(function(net) {
        var p = net.split('/')
        _nets.push({
          host: p[0]
        , mask: p[1]
        })
      })
      rule.nets = _nets
    }
    if(path) {
      rule._adblockrules = parseAdblockRules((new Buffer(FS.readFileSync(path).toString(), 'base64')).toString())
    }
  })
  var js = "var config="+JSON.stringify(config)+"\n"+FS.readFileSync('template.pac').toString()
  FS.writeFileSync(config.path, js)
}

function parseAdblockRules(rules) {
  var lines = rules.split(/\s*(\r|\n|\r\n)\s*/)
    , result = {
        match: {}
      , exception: {}
      }
    , lineLength = lines.length
    , ruleLength = ruleParsers.length
    , i, j, line, exception, parser, match, name, ruleset
  for(i=0; i<lineLength; i++) {
    line = lines[i];
    if(!line || line.charAt(0) === '!') {
      continue
    }
    if(line.substring(0, 2) === '@@') {
      ruleset = result.exception
      line = line.substring(2)
    } else {
      ruleset = result.match
    }
    for(j=0; j < ruleLength; j++) {
      parser = ruleParsers[j]
      match = parser.re.exec(line)
      if(!match) continue
      name = parser.name
      if(!name) break
      if(!ruleset[name]) {
        ruleset[name] = []
      }
      ruleset[name].push(match[1])
      break
    }
  }
  return result
}

