import os
import requests
from datetime import datetime
import re

GITHUB_API_BASE_URL = "https://api.github.com"
REPO_OWNER = "bluewave-labs"
REPO_NAME = "bluewave-onboarding"
GITHUB_TOKEN = os.getenv('GH_TOKEN')

def get_merged_pull_requests(branch="develop"):
    url = f"{GITHUB_API_BASE_URL}/repos/{REPO_OWNER}/{REPO_NAME}/pulls"
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json',
    }
    params = {
        'state': 'closed',
        'base': branch,
        'per_page': 100
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code != 200:
        raise Exception(f"Error fetching pull requests: {response.status_code} {response.text}")

    return response.json()

def get_last_merge_to_branch(branch="staging", pr_from=None):
    url = f"{GITHUB_API_BASE_URL}/repos/{REPO_OWNER}/{REPO_NAME}/commits"
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json',
    }
    params = {
        'sha': branch,
        'per_page': 100,  # Fetch more commits to ensure we find a merge commit
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code != 200:
        raise Exception(f"Error fetching commits: {response.status_code} {response.text}")

    commits = response.json()
    if not commits:
        raise Exception(f"No commits found on branch: {branch}")

    # If pr_from is provided, find the last merge commit from that branch
    if pr_from:
        for commit in commits:
            if 'Merge pull request' in commit['commit']['message'] and pr_from in commit['commit']['message']:
                return commit['commit']['committer']['date']
        raise Exception(f"No merge commit found from branch: {pr_from}")
    else:
        return commits[0]['commit']['committer']['date']

def extract_linked_issues(pr_body, pr_title):
    """Extract linked issues from the PR description and title using regex."""
    issue_pattern = r'#(\d+)'  # Matches issue references like #123
    pr_body = pr_body or ""  
    pr_title = pr_title or ""  
    issues_from_body = re.findall(issue_pattern, pr_body)
    issues_from_title = re.findall(issue_pattern, pr_title)
    all_issues = list(set(issues_from_body + issues_from_title))  # Deduplicate issues
    return all_issues

def get_issue_title(issue_number):
    """Fetch the title of a GitHub issue using its number."""
    url = f"{GITHUB_API_BASE_URL}/repos/{REPO_OWNER}/{REPO_NAME}/issues/{issue_number}"
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json',
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        raise Exception(f"Error fetching issue {issue_number}: {response.status_code} {response.text}")
    
    issue_data = response.json()
    return issue_data.get('title', 'No title found')

def generate_release_notes():
    # Get the last merge date to the 'staging' branch
    last_merge_to_staging = get_last_merge_to_branch("staging", 'develop')
    last_merge_to_staging_date = datetime.strptime(last_merge_to_staging, "%Y-%m-%dT%H:%M:%SZ")

    # Get all merged PRs on 'develop'
    pull_requests = get_merged_pull_requests("develop")
    release_notes = "# Release Notes\n\n"

    for pr in pull_requests:
        if pr.get('merged_at') is not None:  # Check if the PR was merged
            merged_at_date = datetime.strptime(pr['merged_at'], "%Y-%m-%dT%H:%M:%SZ")
            # Only include PRs merged after the last merge to 'staging'
            if merged_at_date > last_merge_to_staging_date:
                release_notes += f"## {pr['title']}\n"
                release_notes += f" - Created by: {pr['user']['login']}\n"
                release_notes += f" - PR Link: {pr['html_url']}\n"
                release_notes += f" - Merged on: {merged_at_date.strftime('%Y-%m-%d')}\n"

                linked_issues = extract_linked_issues(pr['body'], pr['title'])
                if linked_issues:
                    release_notes += " - Linked Issues:\n"
                    for issue_number in linked_issues:
                        issue_title = get_issue_title(issue_number)
                        issue_link = f"https://github.com/{REPO_OWNER}/{REPO_NAME}/issues/{issue_number}"
                        release_notes += f"   - {issue_title}: {issue_link}\n"

                release_notes += "\n"

    if release_notes == "# Release Notes\n\n":
        release_notes += "No merged pull requests found after the last merge to 'staging'.\n"

    with open('release_notes.md', 'w') as f:
        f.write(release_notes)

if __name__ == "__main__":
    if GITHUB_TOKEN is None:
        print("Error: GH_TOKEN environment variable is not set.")
    else:
        generate_release_notes()
