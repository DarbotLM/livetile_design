#!/usr/bin/env python3
"""
Generate Adaptive Cards styled with Fluent 2 design tokens.

Reads design tokens from tokens/design-tokens.json and produces
Adaptive Card JSON (schema 1.5) that follows Fluent 2 conventions:
  - Segoe UI Variable typography
  - 4 px spacing scale
  - Subtle / strong surface hierarchy
  - Accent-color semantics (cyan, gold, green, violet, red)

Usage:
    python generate_adaptive_card.py                   # default KPI dashboard
    python generate_adaptive_card.py --template hero   # hero banner card
    python generate_adaptive_card.py -o card.json      # write to file
"""

from __future__ import annotations

import argparse
import json
import pathlib
import sys
from typing import Any

TOKENS_PATH = pathlib.Path(__file__).parent / "tokens" / "design-tokens.json"
SCHEMA = "http://adaptivecards.io/schemas/adaptive-card.json"
AC_VERSION = "1.5"


# ── Token helpers ────────────────────────────────────────────────────────────

def load_tokens(path: pathlib.Path = TOKENS_PATH) -> dict[str, Any]:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _color(tokens: dict, *keys: str) -> str:
    node = tokens["colors"]
    for k in keys:
        node = node[k]
    return node["value"]


def _font(tokens: dict, variant: str) -> str:
    return tokens["typography"]["fontFamily"][variant]


def _spacing(tokens: dict, key: str) -> str:
    return tokens["spacing"]["gap"][key]


# ── Fluent 2 style maps ─────────────────────────────────────────────────────

def fluent2_host_config(tokens: dict) -> dict[str, Any]:
    """Produce an Adaptive Card HostConfig aligned with Fluent 2."""
    return {
        "fontFamily": _font(tokens, "sans"),
        "containerStyles": {
            "default": {
                "backgroundColor": _color(tokens, "background", "app"),
                "foregroundColors": {
                    "default": {"default": _color(tokens, "text", "strong")},
                    "accent": {"default": _color(tokens, "accent", "cyan")},
                    "attention": {"default": _color(tokens, "accent", "red")},
                    "good": {"default": _color(tokens, "accent", "green")},
                    "warning": {"default": _color(tokens, "accent", "gold")},
                },
            },
            "emphasis": {
                "backgroundColor": _color(tokens, "surface", "1"),
                "foregroundColors": {
                    "default": {"default": _color(tokens, "text", "hi")},
                    "accent": {"default": _color(tokens, "accent", "cyan")},
                },
            },
        },
        "spacing": {
            "small": int(_spacing(tokens, "xs").replace("px", "")),
            "default": int(_spacing(tokens, "sm").replace("px", "")),
            "medium": int(_spacing(tokens, "md").replace("px", "")),
            "large": int(_spacing(tokens, "lg").replace("px", "")),
        },
    }


# ── Card element builders ───────────────────────────────────────────────────

def text_block(
    text: str,
    *,
    size: str = "Default",
    weight: str = "Default",
    color: str = "Default",
    wrap: bool = True,
    spacing: str = "None",
    is_subtle: bool = False,
) -> dict[str, Any]:
    block: dict[str, Any] = {
        "type": "TextBlock",
        "text": text,
        "size": size,
        "weight": weight,
        "wrap": wrap,
        "spacing": spacing,
    }
    if color != "Default":
        block["color"] = color
    if is_subtle:
        block["isSubtle"] = True
    return block


def column(items: list[dict], width: str = "stretch") -> dict[str, Any]:
    return {"type": "Column", "width": width, "items": items}


def column_set(columns: list[dict], spacing: str = "Medium") -> dict[str, Any]:
    return {"type": "ColumnSet", "columns": columns, "spacing": spacing}


def container(
    items: list[dict],
    *,
    style: str = "default",
    bleed: bool = False,
    spacing: str = "None",
) -> dict[str, Any]:
    c: dict[str, Any] = {
        "type": "Container",
        "items": items,
        "style": style,
        "spacing": spacing,
    }
    if bleed:
        c["bleed"] = True
    return c


def fact_set(facts: list[tuple[str, str]], spacing: str = "Medium") -> dict[str, Any]:
    return {
        "type": "FactSet",
        "facts": [{"title": t, "value": v} for t, v in facts],
        "spacing": spacing,
    }


def action_submit(title: str, data: dict | None = None) -> dict[str, Any]:
    a: dict[str, Any] = {"type": "Action.Submit", "title": title}
    if data:
        a["data"] = data
    return a


def action_openurl(title: str, url: str) -> dict[str, Any]:
    return {"type": "Action.OpenUrl", "title": title, "url": url}


def image(url: str, *, size: str = "Medium", alt: str = "") -> dict[str, Any]:
    return {"type": "Image", "url": url, "size": size, "altText": alt}


# ── KPI indicator (reusable badge) ──────────────────────────────────────────

def kpi_badge(label: str, value: str, trend: str, color: str = "Good") -> dict:
    return column(
        [
            text_block(label, size="Small", is_subtle=True),
            text_block(value, size="ExtraLarge", weight="Bolder"),
            text_block(trend, size="Small", color=color),
        ],
        width="auto",
    )


# ── Template: KPI dashboard ─────────────────────────────────────────────────

def template_dashboard(tokens: dict) -> dict[str, Any]:
    header = container(
        [
            text_block(
                "Adaptive Design Dashboard",
                size="Large",
                weight="Bolder",
                color="Accent",
            ),
            text_block(
                "Real-time model performance metrics",
                size="Small",
                is_subtle=True,
                spacing="Small",
            ),
        ],
        style="emphasis",
        bleed=True,
    )

    kpis = column_set(
        [
            kpi_badge("Accuracy", "94.7%", "↑ 2.1%", "Good"),
            kpi_badge("Latency", "42 ms", "↓ 8 ms", "Good"),
            kpi_badge("Throughput", "1.2K rps", "↑ 15%", "Good"),
            kpi_badge("Error Rate", "0.3%", "↓ 0.1%", "Attention"),
        ],
        spacing="Large",
    )

    details = fact_set(
        [
            ("Model", "GPT-4.1-turbo"),
            ("Region", "East US 2"),
            ("Grid Size", tokens["grid"]["sizes"]["20"]["description"]),
            ("Tile Slot", tokens["tileSlots"]["medium"]["label"]),
            ("Viewport", tokens["viewports"]["vp16"]["description"]),
        ],
    )

    actions = [
        action_openurl("View Dashboard", "https://dashboard.example.com"),
        action_submit("Refresh", {"action": "refresh"}),
    ]

    return _wrap_card([header, kpis, details], actions=actions)


# ── Template: Hero banner ───────────────────────────────────────────────────

def template_hero(tokens: dict) -> dict[str, Any]:
    body = [
        image(
            "https://adaptivecards.io/content/cats/3.png",
            size="Stretch",
            alt="Hero banner",
        ),
        text_block(
            "Fluent 2 Adaptive Cards",
            size="ExtraLarge",
            weight="Bolder",
            color="Accent",
            spacing="Medium",
        ),
        text_block(
            "Build beautiful, accessible card experiences with Microsoft's "
            "Fluent 2 design language. Leveraging semantic color tokens, a "
            "4 px spacing grid, and Segoe UI Variable typography.",
            spacing="Small",
        ),
        column_set(
            [
                column(
                    [
                        text_block("Design Tokens", weight="Bolder", size="Small"),
                        text_block(
                            f"{len(tokens['colors'])} color groups · "
                            f"{len(tokens['tileSlots'])} tile sizes",
                            size="Small",
                            is_subtle=True,
                        ),
                    ]
                ),
                column(
                    [
                        text_block("Typography", weight="Bolder", size="Small"),
                        text_block(
                            _font(tokens, "sans").split(",")[0].strip("'"),
                            size="Small",
                            is_subtle=True,
                        ),
                    ]
                ),
            ],
            spacing="Large",
        ),
    ]

    actions = [
        action_openurl("Learn More", "https://fluent2.microsoft.design"),
        action_submit("Get Started", {"action": "start"}),
    ]

    return _wrap_card(body, actions=actions)


# ── Template: Notification ──────────────────────────────────────────────────

def template_notification(tokens: dict) -> dict[str, Any]:
    body = [
        column_set(
            [
                column(
                    [
                        text_block("⚠️", size="Large"),
                    ],
                    width="auto",
                ),
                column(
                    [
                        text_block(
                            "Anomaly Detected",
                            weight="Bolder",
                            color="Warning",
                        ),
                        text_block(
                            "Latency spike observed in inference pipeline. "
                            "P99 crossed the 200 ms threshold at 14:32 UTC.",
                            size="Small",
                            spacing="Small",
                        ),
                    ],
                ),
            ]
        ),
        fact_set(
            [
                ("Severity", "High"),
                ("Component", "Inference Gateway"),
                ("Region", "West US 3"),
                ("Tile", tokens["tileSlots"]["small"]["label"]),
            ],
        ),
    ]

    actions = [
        action_submit("Acknowledge", {"action": "ack", "alert_id": "A-20260428"}),
        action_openurl("View Runbook", "https://runbook.example.com/latency"),
    ]

    return _wrap_card(body, actions=actions)


# ── Card wrapper ─────────────────────────────────────────────────────────────

TEMPLATES = {
    "dashboard": template_dashboard,
    "hero": template_hero,
    "notification": template_notification,
}


def _wrap_card(
    body: list[dict],
    *,
    actions: list[dict] | None = None,
) -> dict[str, Any]:
    card: dict[str, Any] = {
        "$schema": SCHEMA,
        "type": "AdaptiveCard",
        "version": AC_VERSION,
        "body": body,
    }
    if actions:
        card["actions"] = actions
    return card


# ── CLI ──────────────────────────────────────────────────────────────────────

def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Generate Fluent 2-styled Adaptive Card JSON.",
    )
    p.add_argument(
        "--template", "-t",
        choices=list(TEMPLATES),
        default="dashboard",
        help="Card template to generate (default: dashboard)",
    )
    p.add_argument(
        "--output", "-o",
        type=pathlib.Path,
        default=None,
        help="Write JSON to file instead of stdout",
    )
    p.add_argument(
        "--host-config",
        action="store_true",
        help="Also emit a Fluent 2 HostConfig alongside the card",
    )
    p.add_argument(
        "--tokens",
        type=pathlib.Path,
        default=TOKENS_PATH,
        help="Path to design-tokens.json",
    )
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    tokens = load_tokens(args.tokens)
    builder = TEMPLATES[args.template]
    card = builder(tokens)

    output: dict[str, Any]
    if args.host_config:
        output = {
            "card": card,
            "hostConfig": fluent2_host_config(tokens),
        }
    else:
        output = card

    payload = json.dumps(output, indent=2)

    if args.output:
        args.output.write_text(payload, encoding="utf-8")
        print(f"✓ Wrote {args.template} card → {args.output}", file=sys.stderr)
    else:
        print(payload)


if __name__ == "__main__":
    main()
