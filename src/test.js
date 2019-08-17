// js爬虫相关

const request = require('superagent');
// require('superagent-proxy')(request);

const cheerio = require('cheerio');

const userAgents = [
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
  'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
];



function doRequest(urlPro, callback, state, resolve) {
  let url = ""
  // console.log(url.title)
  if (typeof urlPro === 'object') {
    url = urlPro.url
  } else {
    url = urlPro
  }
  let user_agent = userAgents[parseInt((Math.random() * userAgents.length))]
  let headers = {
    'User-Agent': user_agent
  }

  let opts = {
    url,
    headers
  }

  request(opts, (err, res, body) => {
    if (err) console.error(err)
    console.log(res.text)
    if (callback) {
      callback(res, state, resolve, url)
    }


  })


  // request
  //   .get(href)
  //   .set(header)
  //   .timeout({
  //     response: 5000,
  //     deadline: 60000
  //   })
  //   // .proxy("http://127.0.0.1:1080")
  //   .end((err, res) => {
  //     if (err) console.error(err)

  //     callback(res, state, resolve, url)

  //   })

}

function getPictureUrl(res) {
  let hreflist = []
  const $ = cheerio.load(res.text)
  $('th.new span a').each(function (i, e) {
    title = $(this).text()
    href = 'http://sexinsex.net/bbs/' + $(this).attr('href')
    hreflist.push(href)
    // doRequest(href, getImgSrc)

    console.log(title, href)
  })
}

function getImgSrc(res, state, resolve, url) {
  if (res.text) {
    let srclist = []
    const $ = cheerio.load(res.text)
    let title = $("#subject_tpc").text()
    $('.t_msgfont img').each(function (i, e) {
      srclist[i] = $(this).attr('src')
    })

    state.allHrefs.unshift({
      type: url.title,
      href: href,
      title: title,
      src: srclist,
      star: 0,
      collect: false,
      delete: false,
      download: false
    })

    console.log(title)

    setTimeout(() => {
      resolve()
    }, 30000)


  }

}
