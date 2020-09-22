# 🩺📊 Stethoscope Embed

[![Stethoscope](https://stethoscope.js.org/branding/badge-small.svg)](https://stethoscope.js.org)
[![Node CI](https://github.com/stethoscope-js/embed/workflows/Node%20CI/badge.svg)](https://github.com/stethoscope-js/action/actions?query=workflow%3A%22Node+CI%22)

This repository contains the web app for embeddable charts of your health and life data using Stethoscope. It's written in React and TypeScript and published at https://stethoscope.js.org/embed/.

[**To get started, visit stethoscope-js/stethoscope →**](https://github.com/stethoscope-js/stethoscope)

## 🎁 Contributing

This repository is for Stethoscope's GitHub Actions package. We love contributions, so please read our [Contributing Guidelines](https://github.com/stethoscope-js/.github/blob/master/CONTRIBUTING.md) and [Code of Conduct](https://github.com/stethoscope-js/.github/blob/master/CODE_OF_CONDUCT.md) and open an issue or make a pull request!

### Issues

We use the [stethoscope-js/stethoscope](https://github.com/stethoscope-js/stethoscope) repository for issues for all projects, including this one. If you found a bug or have a feature request, [open an issue](https://github.com/stethoscope-js/stethoscope/issues) in the Stethoscope repository and add the label "action".

## 💻 Usage

To use the web app, you have to visit a URL like the following:

https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=rescuetime-time-tracking&latest=top-overview.weeks

You can simple embed this using an HTML `<iframe>` element:

```html
<iframe title="RescueTime data" src="https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=rescuetime-time-tracking&latest=top-overview.weeks"></iframe>
```

In the above example, the query parameters are the following, URL encoded:

- `repo`: Your repository on GitHub, e.g., `AnandChowdhary/life`
- `api`: The data you want to visualize, e.g., `rescuetime-time-tracking`, which corresponds to the directory in [`./data`](./data)
- `latest`: The visualization to display, based on the specific `api.json` keys, e.g., `top-overview.days`

Here are some more visualization of real-time data from my life:

- Sleep tracking: [this week](https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=oura-sleep&latest=total.weeks) · [this month](https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=oura-sleep&latest=total.days) · [this year](https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=oura-sleep&latest=total.months)
- Programming time: [this week](https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=wakatime-time-tracking&latest=weeks) · [this month](https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=wakatime-time-tracking&latest=days) · [this year](https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=wakatime-time-tracking&latest=months)

This is a real-time screenshot of the above RescueTime weekly overview URL:

[![Screenshot of visualization](https://api.microlink.io/?url=https%3A%2F%2Fanandchowdhary.github.io%2Flife%2F%3Frepo%3DAnandChowdhary%252Flife%26api%3Drescuetime-time-tracking%26latest%3Dtop-overview.weeks&waitFor=5000&waitUntil=networkidle2&screenshot=true&meta=false&embed=screenshot.url&device=ipadlandscape)](https://stethoscope.js.org/embed/?repo=AnandChowdhary%2Flife&api=rescuetime-time-tracking&latest=top-overview.weeks)

## 📄 License

Code: [MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
