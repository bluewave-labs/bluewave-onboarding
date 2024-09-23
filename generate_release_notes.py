import os
import requests

def generate_release_notes():
    GITHUB_TOKEN = os.getenv('GH_TOKEN')
    REPO_OWNER, REPO_NAME = os.getenv('GITHUB_REPOSITORY').split('/')

    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues"
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json',
    }
    params = {
        'state': 'closed',
        'filter': 'all',
        'per_page': 100
    }

    response = requests.get(url, headers=headers, params=params)
    issues = response.json()

    release_notes = "# Release Notes\n\n"

    for issue in issues:
        if 'pull_request' in issue:
            release_notes += f"## {issue['title']}\n"
            release_notes += f"{issue['body']}\n\n"

    with open('release_notes.md', 'w') as f:
        f.write(release_notes)

if __name__ == "__main__":
    generate_release_notes()
