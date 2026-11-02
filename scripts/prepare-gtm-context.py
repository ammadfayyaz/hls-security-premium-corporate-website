"""Extend a real GTM export with the existing HLS conversion fields (merge import only)."""
import copy
import json
import sys
from pathlib import Path

source, target = map(Path, sys.argv[1:3])
data = json.loads(source.read_text())
version = data["containerVersion"]
tag = copy.deepcopy(next(t for t in version["tag"] if t["name"] == "HLS - GA4 Conversions"))
trigger = copy.deepcopy(next(t for t in version["trigger"] if t["name"] == "HLS - Conversion Events"))
variable = copy.deepcopy(next(v for v in version["variable"] if v["name"] == "DLV - HLS source"))
rows = next(p for p in tag["parameter"] if p["key"] == "eventSettingsTable")
row_template = copy.deepcopy(rows["list"][0])
fields = ["source", "product_name", "method", "form_name"]
rows["list"] = []
variables = []
for offset, field in enumerate(fields):
    row = copy.deepcopy(row_template)
    for param in row["map"]:
        if param["key"] == "parameter":
            param["value"] = field
        elif param["key"] == "parameterValue":
            param["value"] = "{{DLV - HLS " + field + "}}"
    rows["list"].append(row)
    item = copy.deepcopy(variable)
    item["name"] = "DLV - HLS " + field
    item["variableId"] = str(int(variable["variableId"]) + offset)
    item.pop("fingerprint", None)
    next(p for p in item["parameter"] if p["key"] == "name")["value"] = field
    variables.append(item)
tag.pop("fingerprint", None)
trigger.pop("fingerprint", None)
# Merge this small import into the existing workspace; do not replace the container.
version["tag"] = [tag]
version["trigger"] = [trigger]
version["variable"] = variables
version["builtInVariable"] = [v for v in version["builtInVariable"] if v["type"] == "EVENT"]
version.pop("gtagConfig", None)
version.pop("fingerprint", None)
version.pop("tagManagerUrl", None)
target.write_text(json.dumps(data, indent=2) + "\n")
print("Prepared additive import: 1 HLS conversion tag, 1 exact-event trigger, 4 data-layer variables; unrelated settings excluded.")
