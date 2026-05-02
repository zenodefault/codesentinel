import json
import os
import sys
import zipfile
from datetime import datetime
from xml.sax.saxutils import escape


def paragraph(text, style=None):
    style_xml = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ""
    return f"<w:p>{style_xml}<w:r><w:t xml:space=\"preserve\">{escape(text)}</w:t></w:r></w:p>"


def table(rows):
    row_xml = []
    for index, row in enumerate(rows):
        cells = []
        shade = "F2E7D5" if index % 2 else "FFF9F1"
        for value in row:
            cells.append(
                "<w:tc>"
                "<w:tcPr><w:shd w:fill=\"%s\"/></w:tcPr>"
                "<w:p><w:r><w:t xml:space=\"preserve\">%s</w:t></w:r></w:p>"
                "</w:tc>" % (shade, escape(str(value)))
            )
        row_xml.append("<w:tr>%s</w:tr>" % "".join(cells))
    return "<w:tbl>%s</w:tbl>" % "".join(row_xml)


def build_document(report):
    deps = report.get("topDependencies", [])
    overdue = report.get("overdueDeferrals", [])
    wins = report.get("weeklyWins", [])
    blasts = report.get("blastRadiusLeaders", [])

    body = [
        paragraph("Weekly CodeSentinel Digest", "Title"),
        paragraph(f"Generated: {report.get('generatedAt')}"),
        paragraph(f"Repos scanned: {report.get('repoCount', 0)}"),
        paragraph(f"Overall health score: {report.get('overallHealthScore', 0)}"),
        paragraph("Dependency Risk Table", "Heading1"),
        table(
            [["Dependency", "Repo", "CVE IDs", "ActualRisk", "Recommended action"]]
            + [
                [
                    dep.get("name", ""),
                    dep.get("repo", ""),
                    ", ".join([item.get("cveId") or item.get("id", "") for item in dep.get("advisories", [])]) or "none",
                    dep.get("actualRisk", 0),
                    "Patch immediately" if dep.get("riskLevel") == "CRITICAL" else "Review upgrade path",
                ]
                for dep in deps
            ]
        ),
        paragraph("Overdue Deferrals", "Heading1"),
        table(
            [["Dependency", "Repo", "Reason", "Current risk"]]
            + [
                [
                    item.get("dependency", ""),
                    item.get("repo", ""),
                    item.get("reason", ""),
                    item.get("currentRiskLevel") or "unknown",
                ]
                for item in overdue
            ]
        ),
        paragraph("Ghost Author Risk Summary", "Heading1"),
        paragraph(f"Ghost author entries tracked: {report.get('ghostAuthorCount', 0)}"),
        paragraph("Highest Blast Radius Modules", "Heading2"),
        table(
            [["Module", "Repo", "Blast radius", "Summary"]]
            + [
                [
                    item.get("module", ""),
                    item.get("repo", ""),
                    item.get("blastRadiusScore", 0),
                    item.get("riskSummary", ""),
                ]
                for item in blasts
            ]
        ),
        paragraph("This Week's Wins", "Heading1"),
    ]

    if wins:
      body.extend([paragraph(f"- {item.get('repo')}: {item.get('summary')}") for item in wins])
    else:
      body.append(paragraph("No completed dependency fixes recorded this week."))

    body.append("<w:sectPr><w:pgSz w:w=\"12240\" w:h=\"15840\"/><w:pgMar w:top=\"1440\" w:right=\"1440\" w:bottom=\"1440\" w:left=\"1440\"/></w:sectPr>")

    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
 xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
 xmlns:v="urn:schemas-microsoft-com:vml"
 xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
 xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
 xmlns:w10="urn:schemas-microsoft-com:office:word"
 xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
 xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
 xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
 xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
 xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
 xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
 mc:Ignorable="w14 wp14"><w:body>%s</w:body></w:document>""" % "".join(body)


def main():
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    with open(input_path, "r", encoding="utf-8") as handle:
        report = json.load(handle)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    document_xml = build_document(report)
    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style>
</w:styles>"""
    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>"""
    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>"""
    document_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>"""
    now = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    core = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcmitype="http://purl.org/dc/dcmitype/"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Weekly CodeSentinel Digest</dc:title>
  <dc:creator>CodeSentinel</dc:creator>
  <cp:lastModifiedBy>CodeSentinel</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified>
</cp:coreProperties>"""
    app = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
 xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>CodeSentinel</Application>
</Properties>"""

    with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("[Content_Types].xml", content_types)
        archive.writestr("_rels/.rels", rels)
        archive.writestr("word/document.xml", document_xml)
        archive.writestr("word/_rels/document.xml.rels", document_rels)
        archive.writestr("word/styles.xml", styles_xml)
        archive.writestr("docProps/core.xml", core)
        archive.writestr("docProps/app.xml", app)


if __name__ == "__main__":
    main()
