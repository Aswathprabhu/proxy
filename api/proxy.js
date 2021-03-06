const fetch = require('node-fetch');

const proxy = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  try {
    let { body: options, query: { url } = {} } = req;
    if (options && options.body) {
      options.body = JSON.stringify(options.body);
    }
    let response = await fetch(url, options);
    let json = await response.json();
    res.json(json);
  } catch (err) {
    res.json(err)
  }
}

module.exports = proxy
