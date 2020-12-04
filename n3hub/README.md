## Branch Syncing
- We sync our master branch "**n3hub-master**" with "**grafana's latest tag**" so we have track which hub release maps to which orignal grafana release.


## Get latest changes from grafana:
- Commands:
```
- git clone git@github.com:thefulcrum/grafana.git
- git remote add upstream https://github.com/grafana/grafana
- git remove -v             (to verify if "upstream is pointing to original grafana repo"
- git fetch upstream        (to get all upstream's changes)
- git checkout n3hub-master (switch to our local master branch)
- git merge <grafana tag> ( merge original grafana's released tag with our n3hub branch)
```

## Deploying hub grafana version
- Make a new git release from **n3hub-master** branch
- Git Tag format:
    ```
    hub-<grafana-latest-tag>-<hub-custom-version>
    
    Example:
    hub-v7.4.4-v1.0.0
    ```
- This will trigger the CircleCI to build only tags that starts with `hub-*`

## Local Development
- `docker build -t hub-grafana -f Dockerfile . `
- `docker run -d -p 3000:3000 --name=grafana hub-grafana`

## Guides:
- https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork
- https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork


