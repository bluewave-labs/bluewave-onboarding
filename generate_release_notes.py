import os
import requests
import re

# Constants
GITHUB_API_BASE_URL = "https://api.github.com"
REPO_OWNER = "bluewave-labs"
REPO_NAME = "bluewave-onboarding"
GITHUB_TOKEN = os.getenv('GH_TOKEN')

def get_merged_pull_requests():
    url = f"{GITHUB_API_BASE_URL}/repos/{REPO_OWNER}/{REPO_NAME}/pulls"
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json',
    }
    params = {
        'state': 'closed',
        'base': 'staging',  # Ensure we're only getting PRs targeting the staging branch
        'per_page': 100
    }

    response = requests.get(url, headers=headers, params=params)

    # Check for request errors
    if response.status_code != 200:
        raise Exception(f"Error fetching pull requests: {response.status_code} {response.text}")

    return response.json()

def extract_issues_from_body(body):
    # Regex to find issue numbers in the format #123
    return re.findall(r'#(\d+)', body)

def generate_release_notes():
    pull_requests = get_merged_pull_requests()

    release_notes = "# Release Notes\n\n"

    for pr in pull_requests:
        if pr.get('merged_at'):  # Check if the pull request was merged
            # Get the title and body of the pull request
            release_notes += f"## {pr['title']}\n"
            release_notes += f"{pr['body']}\n"

            # Extract issue numbers mentioned in the pull request body
            issues = extract_issues_from_body(pr['body'])
            if issues:
                release_notes += "### Related Issues:\n"
                for issue in issues:
                    release_notes += f"- Issue #{issue}\n"
                release_notes += "\n"

    with open('release_notes.md', 'w') as f:
        f.write(release_notes)

if __name__ == "__main__":
    generate_release_notes()
