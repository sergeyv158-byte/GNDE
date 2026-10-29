# GNDE integrated review — October 28, 2026

This review combines the existing website with the latest recovered application, instrument, structural-health-monitoring, and buried-monopole case-study pages. The source snapshots in this directory preserve the exact recovered versions. The website uses separate losslessly decoded image assets under `public/media/`.

## Entry points

- `/`: existing homepage, Technology, About, patents, product navigation, and case studies.
- `/products.html`: combined application/probe review.
- `/pipelines.html`: pipeline and pipe-support probes.
- `/storage-tanks.html`: tank-wall and tank-bottom probes.
- `/buried-monopoles-anchors.html`: six buried-asset probe configurations, including the 16-inch combined-aperture Probe 6.
- `/heat-exchangers.html`: tubing and four-segment pipe-ID probes.
- `/structural-health-monitoring.html`: permanent and elevated-temperature sensor configurations.
- `/instruments.html`: full MsSRv5 and MsSRv5M specifications and three equipment photographs.
- `/case-study-buried-monopoles.html`: the additional ECNDT 2026 study, with figure attribution and interpretation limits retained.

The three pre-existing case-study pages and legacy instrument URLs are also emitted by Vite.

## Preserved review qualifications

- The Pressure Vessels subsection remains heading-only because no completed content was supplied.
- The tank MsT 360 photograph retains its source technical-review note.
- The 0.780-inch heat-exchanger probe-head fit retains the source distinction from conventional 14-BWG nominal tube ID.
- SHM high-temperature operation remains specified as up to 300 °C in this source.

Deploy only as a Vercel preview from the existing review branch. This update does not authorize a production release, a merge to `main`, or a domain change.
