#!/usr/bin/env python3
"""
Laya Decision Engine Runner
Open-source System 1 decision engine alternative to Jev.
Provides non-autoregressive, fast, typed decisions (choice, boolean, score, route).
"""

import argparse
import json
import os
import sys
import urllib.request
import urllib.error

def evaluate_decision_via_api(endpoint: str, api_key: str, payload: dict) -> dict:
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Laya-Decision-Engine/1.0"
    }
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(endpoint, data=data, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read().decode("utf-8"))

def evaluate_locally(mode: str, state: str, choices=None, question=None, criterion=None) -> dict:
    state_lower = state.lower()

    if mode == "boolean":
        destructive_keywords = [
            "rm -rf", "delete", "drop table", "truncate", "--force", 
            "hard reset", "kill -9", "ai slop", "purple-to-blue gradient"
        ]
        is_destructive = any(kw in state_lower for kw in destructive_keywords)
        
        if question and any(term in question.lower() for term in ["safe", "permissible", "allow", "conform"]):
            decision = not is_destructive
            confidence = 0.95 if not is_destructive else 0.10
        else:
            decision = is_destructive
            confidence = 0.92

        return {
            "mode": "boolean",
            "decision": decision,
            "confidence": confidence,
            "evaluated_by": "laya-engine-local"
        }

    elif mode == "choice":
        choices = choices or []
        if not choices:
            return {"error": "No choices provided for choice mode"}
        
        scores = {}
        for c in choices:
            token_matches = sum(1 for word in c.lower().split() if word in state_lower)
            scores[c] = max(0.1, token_matches * 1.5 + 0.2)

        total = sum(scores.values())
        probabilities = {c: round(score / total, 4) for c, score in scores.items()}
        selected = max(probabilities, key=probabilities.get)

        return {
            "mode": "choice",
            "selected": selected,
            "probabilities": probabilities,
            "evaluated_by": "laya-engine-local"
        }

    elif mode == "score":
        slop_indicators = ["particle", "glow", "gradient", "duration-300", "linear", "torus", "blob"]
        penalties = sum(0.20 for ind in slop_indicators if ind in state_lower)
        score = max(0.0, min(1.0, 1.0 - penalties))

        return {
            "mode": "score",
            "score": round(score, 2),
            "confidence": 0.91,
            "criterion": criterion or "Anti-AI Slop & Craft Guidelines",
            "evaluated_by": "laya-engine-local"
        }

    elif mode == "route":
        routes = {
            "research": ["pesquise", "documentação", "buscar", "explore"],
            "ui_design": ["css", "layout", "motion", "framer", "estilo", "tailwind", "design"],
            "core_domain": ["entidade", "value object", "usecase", "regra de negócio", "ddd"],
            "infra": ["database", "api", "next.js", "docker", "deploy", "build"]
        }
        
        route_scores = {}
        for route_name, kws in routes.items():
            matches = sum(1 for kw in kws if kw in state_lower)
            route_scores[route_name] = matches + 0.1
        
        selected_route = max(route_scores, key=route_scores.get)
        return {
            "mode": "route",
            "route": selected_route,
            "scores": route_scores,
            "evaluated_by": "laya-engine-local"
        }

    return {"error": f"Unsupported mode '{mode}'"}

def main():
    parser = argparse.ArgumentParser(description="Laya Decision Engine CLI")
    parser.add_argument("--mode", required=True, choices=["choice", "boolean", "score", "route"])
    parser.add_argument("--state", required=True, help="Input context or state description")
    parser.add_argument("--choices", nargs="*", help="Candidate options for choice mode")
    parser.add_argument("--question", help="Question for boolean mode")
    parser.add_argument("--criterion", help="Criterion for score mode")

    args = parser.parse_args()

    endpoint = os.environ.get("LAYA_ENDPOINT")
    api_key = os.environ.get("LAYA_API_KEY", "")

    if endpoint:
        try:
            payload = {
                "mode": args.mode,
                "state": args.state,
                "choices": args.choices,
                "question": args.question,
                "criterion": args.criterion
            }
            result = evaluate_decision_via_api(endpoint, api_key, payload)
        except Exception as e:
            sys.stderr.write(f"Warning: Failed to reach remote Laya endpoint ({e}), falling back to local engine.\n")
            result = evaluate_locally(args.mode, args.state, args.choices, args.question, args.criterion)
    else:
        result = evaluate_locally(args.mode, args.state, args.choices, args.question, args.criterion)

    print(json.dumps(result, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
