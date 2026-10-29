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
- The 0.780-inch heat-exchanger dimension is explicitly labeled as the specified probe-head fit.
- SHM high-temperature operation remains specified as up to 300 °C in this source.

Deploy only as a Vercel preview from the existing review branch. This update does not authorize a production release, a merge to `main`, or a domain change.

## Requested branding and comment cleanup

All served page headers now use the original homepage orange pulse waveform, “Guided NDE LLC” wordmark, and “SINCE 2008” line. The shared `public/gnde-brand.css` controls the same desktop and mobile logo dimensions across pages. Brown editorial review comments and draft/publication badges were removed at the owner's request. Technical specifications, source/manufacturer credits, interpretation limits, and the original photographs are retained. Historical source snapshots above remain unchanged.

## Case Study buttons and editorial labels

At the owner's request, small configuration/probe/figure numbers and Chapter labels have been removed from application galleries. The selected cards now use one singular “Case Study” button style, placed below their captions or descriptive text. Existing matching anchor-rod and buried-monopole studies are linked directly. Other selected buttons open a clearly marked content-pending dialog until their case studies are developed next. No inspection results were invented.

Requested placements include the axial/circumferential pipeline card; all three tank configurations; both split-ring anchor photographs, the adjustable buried-pole bracelet, and the fourth flat-anchor card; both tubing figures; steel rope/cable; the rigid permanent SHM sensor; and both high-temperature SHM photographs. The Pressure Vessels button is intentionally deferred until that section is completed.

Pending case topics: `pipeline-axial-circumferential`, `tank-wall-array`, `tank-bottom-array`, `tank-wall-mst360`, `flat-anchor-array`, `heat-exchanger-symmetric-probes`, `heat-exchanger-four-segment-tfm`, `steel-cable-rope`, `shm-permanent-sensor`, and `shm-elevated-temperature`.
