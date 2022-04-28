const express = require("express")
const app = express()
const port = 3000
const { Ipware } = require("@fullerstack/nax-ipware")
if (process.env.NODE_ENV == "production") {
  app.enable("trust proxy")
}

app.get("/my-ip", (req, res) => {
  const expressIp = req.ip
  const parseIp = (req) =>
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress
  const ips = req.ips.map((ip) => `<li>${ip}</li>`)
  const ipWare = new Ipware().getClientIP(req)

  const template = `
    <div>
      <h1>I'm tracking you breh</h1>
      <div>Express built in req.ip API: ${expressIp}</div><br/>
      <div>Parsed x-forward-for header: ${parseIp(req)}</div><br/>
      <div>Express built in req.ips API: ${
        ips.length > 0 ? ips : "No Items"
      }</div></br>
      <div>
        <span>Ipware Data:</span>
        <li>ip key: ${ipWare.ip}</li>
        <li>isPublic key: ${ipWare.isPublic}</li>
        <li>isRouteTrusted key: ${ipWare.isRouteTrusted}</li>
      </div>
    </div>
  `
  return res.send(template)
  res.send("Express built in req.ip:")
  res.send(req.ip)
  res.send("Parse x-forwarded-for header")
  res.send(parseIp(req))
  res.send("3rd party ipWare lib")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
