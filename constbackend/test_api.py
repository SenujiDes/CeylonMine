import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:5000"

def test_api():
    # Test cases
    test_cases = [
        {
            "name": "Test 1: Valid precious metals calculation",
            "data": {
                "mineral_type": "precious_metals",
                "market_value": 1000000,
                "due_date": (datetime.now() - timedelta(days=10)).strftime("%Y-%m-%d")
            }
        },
        {
            "name": "Test 2: Building materials without penalty",
            "data": {
                "mineral_type": "building_materials",
                "market_value": 500000,
                "due_date": (datetime.now() + timedelta(days=10)).strftime("%Y-%m-%d")
            }
        },
        {
            "name": "Test 3: Invalid mineral type",
            "data": {
                "mineral_type": "invalid_type",
                "market_value": 1000000
            }
        },
        {
            "name": "Test 4: Invalid market value",
            "data": {
                "mineral_type": "precious_metals",
                "market_value": -1000
            }
        }
    ]

    print("Starting API tests...\n")

    # Test health check endpoint
    try:
        response = requests.get(f"{BASE_URL}/")
        print("Health Check:", response.json())
        print("-" * 50)
    except Exception as e:
        print(f"Error in health check: {str(e)}")

    # Run test cases
    for test in test_cases:
        print(f"\nRunning {test['name']}")
        try:
            response = requests.post(
                f"{BASE_URL}/api/calculate-royalty",
                json=test['data']
            )
            print(f"Status Code: {response.status_code}")
            print("Response:", json.dumps(response.json(), indent=2))
        except Exception as e:
            print(f"Error: {str(e)}")
        print("-" * 50)

if __name__ == "__main__":
    test_api() 