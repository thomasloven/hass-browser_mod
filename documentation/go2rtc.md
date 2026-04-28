# go2rtc publishing

Browser Mod can publish the current Browser camera to [go2rtc](https://go2rtc.org/) using WHIP. This turns a registered Browser into a go2rtc stream that can be consumed by go2rtc WebUI, RTSP, WebRTC viewers, Frigate, or other software that can read from go2rtc.

Browser Mod publishes video only. Audio from the Browser microphone is not published.

## How it works

Browser Mod sends a WHIP request to the go2rtc HTTP API:

```text
<go2rtc base URL>/api/webrtc?dst=<BrowserID>
```

For example, if:

- Browser ID is `kitchen_tablet`
- go2rtc base URL is `https://go2rtc.example.local`

Browser Mod publishes to:

```text
https://go2rtc.example.local/api/webrtc?dst=kitchen_tablet
```

The `dst` value is always the current Browser ID. Use simple Browser IDs such as `kitchen_tablet`, `wall-panel`, or `hall_display` so the same value is easy to use as a go2rtc stream name.

## Browser Mod configuration

1. Open the Browser Mod panel in Home Assistant.
2. Register the Browser if it is not already registered.
3. Set a stable Browser ID. This Browser ID should match the go2rtc stream name.
4. Enable **go2rtc publishing** for that Browser.
5. In **Frontend Settings**, set **go2rtc base URL** to the go2rtc API origin or subpath.
6. Optionally set **Camera resolution** if you want Browser Mod to request a specific camera size.

The Browser Mod `camera` entity and go2rtc publishing are independent. You can enable either one, both, or neither.

## go2rtc configuration

Create an empty stream for every Browser ID you want Browser Mod to publish. go2rtc only accepts pushed media for an existing stream.

Minimal LAN example:

```yaml
api:
  listen: ":1984"
  origin: "*"

streams:
  kitchen_tablet:
  hallway_panel:

webrtc:
  listen: ":8555"
```

With the config above:

- set Browser ID `kitchen_tablet` on one Browser
- set Browser ID `hallway_panel` on another Browser
- set Browser Mod **go2rtc base URL** to `http://<go2rtc-host>:1984` or `https://<go2rtc-host>:<https-port>`

If you use a custom Browser ID with special characters, quote it in YAML:

```yaml
streams:
  "wall panel":
```

Simple IDs with letters, numbers, `_`, and `-` are recommended.

## HTTPS

Browsers restrict camera access to secure contexts. In practice:

- Home Assistant should be loaded over HTTPS, except for local development on `localhost`.
- If Home Assistant is loaded over HTTPS, the go2rtc base URL must also be HTTPS. A browser will usually block publishing from an HTTPS page to an HTTP go2rtc URL as mixed content.
- The go2rtc certificate must be trusted by the Browser, not only by the Home Assistant server.

You can enable HTTPS directly in go2rtc:

```yaml
api:
  listen: ":1984"
  tls_listen: ":1985"
  tls_cert: "/config/ssl/fullchain.pem"
  tls_key: "/config/ssl/privkey.pem"
  origin: "*"
```

Then set Browser Mod **go2rtc base URL** to:

```text
https://<go2rtc-host>:1985
```

You can also put go2rtc behind an HTTPS reverse proxy such as Caddy, Nginx, Traefik, or the Home Assistant add-on ingress/proxy stack. In that case set the Browser Mod base URL to the public HTTPS URL exposed by the proxy.

If go2rtc is served under a subpath, use that subpath as the base URL. Browser Mod appends `/api/webrtc` if the path does not already end with it:

```text
https://ha.example.local/go2rtc
```

publishes to:

```text
https://ha.example.local/go2rtc/api/webrtc?dst=<BrowserID>
```

## CORS

If the Home Assistant URL and go2rtc URL are different origins, the browser will enforce CORS. This includes differences in scheme, host, or port.

Example different origins:

```text
https://homeassistant.example.local
https://go2rtc.example.local
```

or:

```text
https://homeassistant.example.local
https://homeassistant.example.local:1985
```

Enable CORS in go2rtc:

```yaml
api:
  origin: "*"
```

go2rtc currently supports wildcard CORS for this setting. Browser Mod does not send authentication headers to go2rtc, so avoid putting the WHIP endpoint behind Basic auth unless your reverse proxy handles access in a way that still allows the browser request to reach `/api/webrtc`.

## WebRTC network access

WHIP uses the go2rtc HTTP API for signaling, but the video itself is WebRTC media. The Browser must be able to reach the WebRTC candidates that go2rtc advertises.

For LAN-only setups, the default `webrtc.listen: ":8555"` is often enough.

For access across VLANs, VPNs, or the internet, check go2rtc's WebRTC candidate configuration:

```yaml
webrtc:
  listen: ":8555"
  candidates:
    - go2rtc.example.local:8555
```

For dynamic public IP setups, go2rtc can use STUN candidate discovery:

```yaml
webrtc:
  listen: ":8555"
  candidates:
    - stun:8555
```

For difficult NAT environments, configure a TURN server in go2rtc. See the go2rtc WebRTC documentation for the full `ice_servers` configuration.

## Security notes

The go2rtc API can expose camera streams and administrative functionality. Do not expose an unauthenticated go2rtc API directly to the public internet.

Recommended patterns:

- Keep go2rtc on a trusted LAN or VPN.
- Use HTTPS with a trusted certificate.
- Use firewall or reverse proxy rules so only expected clients can reach go2rtc.
- If using go2rtc `allow_paths`, keep `/api/webrtc` available for Browser Mod publishing.
- Avoid reusing the same Browser ID on multiple active Browsers. They will publish to the same go2rtc stream name.

## Troubleshooting

### Browser Mod shows a go2rtc publishing error

Check the Browser console for `Browser Mod: go2rtc publish failed`. Common causes:

- go2rtc base URL is not reachable from the Browser.
- HTTPS page is trying to publish to an HTTP go2rtc URL.
- go2rtc certificate is not trusted by the Browser.
- CORS is not enabled on go2rtc.
- The go2rtc stream named by the Browser ID does not exist.
- Camera permission was denied.

### Browser asks for camera permission or interaction

The Browser must allow camera access. Some browsers also require page interaction before video capture works reliably. Browser Mod waits for the video interaction check before starting go2rtc publishing.

### Publishing works on desktop but not on wall tablets or mobile devices

Check:

- HTTPS and certificate trust on that device.
- Camera permission for the Home Assistant origin.
- Whether another app or Browser Mod camera entity is already using the camera.
- Whether the device can reach both the go2rtc HTTP API and the WebRTC media candidate address.

### Enabling both Browser Mod camera entity and go2rtc publishing fails

The two features request camera access independently. Some browsers and devices do not allow two simultaneous camera captures. If this happens, disable either the Browser Mod camera entity or go2rtc publishing for that Browser.

### CORS preflight fails

Set:

```yaml
api:
  origin: "*"
```

Then restart go2rtc and reload the Browser. If you are using a reverse proxy, make sure `OPTIONS` requests and the CORS response headers are not blocked by the proxy.

## References

- [go2rtc HTTP API documentation](https://go2rtc.org/internal/api/)
- [go2rtc WebRTC and WHIP documentation](https://go2rtc.org/internal/webrtc/)
- [go2rtc README](https://github.com/AlexxIT/go2rtc)
