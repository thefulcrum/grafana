## Branch Syncing
- We sync our master branch "**n3hub-master**" with "**grafana's latest tag**" so we have track which hub release maps to which orignal grafana release.
- **We should only maintain 1 commit from hub side to keep things clean and easy to manage**

## Get latest changes from grafana:
- Commands:
```
- git clone git@github.com:thefulcrum/grafana.git
- git remote add upstream https://github.com/grafana/grafana
- git remove -v             (to verify if "upstream is pointing to original grafana repo"
- git fetch upstream        (to get all upstream's changes)
- git checkout n3hub-master (switch to our local master branch)
- git reset HEAD~1          (reset to uncommit our hub changes)
- git status                (make sure only the following files under "Hub Grafana Changes" are changed/untracked)
- git add .                 (add hub files and changes to be ready for commit)
- git stash                 (stash our changes first)
- git status                (make sure no changes/untracked file)
- git merge <grafana tag>   (merge original grafana's released tag with our n3hub branch)
- git diff                  (identify conflict and fix if there are)
- git add .                 (add all files)
- git merge --continue      (continue the merge)
    - Once done, you'll see the latest <grafana tag> on most top of n3hub-master branch
- git stash pop             (bring back our changes)
- git add .                 (add our changes)
    - NOTE: Make sure the circleci image node version is same as the on on the grafana Dockerfile root image
- git commit -m "init hub configs" (commit our changes)
- (do a local build first and ensure it build success before commiting to remote. Refer to Local Development below)

- git push origin n3hub-master -f      (force push our changes to remote n3hub-master branch)
- git tag -a hub-<grafana-tag>-v1.x.x -m "Upgrade hub grafana to hub-<grafana-tag>-v1.x.x"
- git push origin hub-<grafana-tag>-v1.x.x (push tag to remote repo)
- Go to the https://github.com/thefulcrum/grafana/releases, draft a new release
    - make sure tag matches the tag you created on top
```

## Hub Grafana Changes
- `.circleci/config.yml`
    - changed to work with our own CircleCI for deployment
- `public/app/core/components/Branding/Branding.tsx`
    - include hub logo
- `public/app/core/components/sidemenu/SideMenu.tsx`
    - include hub logo
- `n3hub/README.md`
    - include a README for hub use
- `public/img/n3-logo.png`
    - include hub logo

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

