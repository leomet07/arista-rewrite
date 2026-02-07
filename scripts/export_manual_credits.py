#!/usr/bin/env python3

#after downloading the csv of active users from the website, run this script in python on it.
#the result should then be uploaded to the mass creditor after deleting all creds in pocketbase
#if the mass creditor fails, its the string buffer overflow, just do 200 lines at a time

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path


def parse_number(value: str) -> float | None:
    if value is None:
        return None
    cleaned = value.strip().replace(",", "")
    if cleaned == "":
        return 0.0
    try:
        return float(cleaned)
    except ValueError:
        return None


def format_number(value: float) -> str:
    if value.is_integer():
        return str(int(value))
    return f"{value:.10f}".rstrip("0").rstrip(".")


def build_rows(input_path: Path):
    with input_path.open("r", newline="", encoding="utf-8-sig") as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            email = (row.get("Email") or "").strip()
            if not email:
                continue

            events_credits = parse_number(row.get("Events Credits", "")) or 0.0
            required_events = parse_number(row.get("Required Events Credits", ""))
            tutor_credits = parse_number(row.get("Tutoring Credits", "")) or 0.0
            required_tutor = parse_number(row.get("Required Tutoring Credits", ""))
            other_credits = parse_number(row.get("Other Credits", "")) or 0.0
            required_other = parse_number(row.get("Required Other Credits", ""))

            if required_events is None:
                events_rollover = 0.0
                events_explanation = "rollover"
            elif required_events <= 0:
                events_rollover = 0.0
                events_explanation = "rollover"
            else:
                events_rollover = max(events_credits - required_events, 0.0)
                events_explanation = "rollover"

            if required_tutor is None:
                tutor_rollover = 0.0
                tutor_explanation = "rollover"
            elif required_tutor <= 0:
                tutor_rollover = 0.0
                tutor_explanation = "rollover"
            else:
                tutor_rollover = max(tutor_credits - required_tutor, 0.0)
                tutor_explanation = "rollover"

            if required_other is None:
                other_rollover = 0.0
                other_explanation = "rollover"
            elif required_other <= 0:
                other_rollover = 0.0
                other_explanation = "rollover"
            else:
                other_rollover = max(other_credits - required_other, 0.0)
                other_explanation = "rollover"

            yield {
                "email": email,
                "credit_num": format_number(events_rollover),
                "credit_type": "event",
                "manual_explanation": events_explanation,
            }
            yield {
                "email": email,
                "credit_num": format_number(tutor_rollover),
                "credit_type": "tutoring",
                "manual_explanation": tutor_explanation,
            }
            yield {
                "email": email,
                "credit_num": format_number(other_rollover),
                "credit_type": "other",
                "manual_explanation": other_explanation,
            }


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Convert ARISTA admin export CSV into rollover-only rows shaped as: "
            "email,credit_num,credit_type,manual_explanation"
        )
    )
    parser.add_argument("input_csv", type=Path, help="Path to admin export CSV")
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Optional output CSV path. Defaults to stdout.",
    )
    args = parser.parse_args()

    output_handle = args.output.open("w", newline="", encoding="utf-8") if args.output else sys.stdout
    close_output = args.output is not None

    try:
        writer = csv.DictWriter(
            output_handle,
            fieldnames=["email", "credit_num", "credit_type", "manual_explanation"],
        )
        writer.writeheader()
        for result_row in build_rows(args.input_csv):
            writer.writerow(result_row)
    finally:
        if close_output:
            output_handle.close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
