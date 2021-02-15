load(
    'scripts/release.star',
    'release_pipelines',
)

<<<<<<< HEAD
ver_mode = 'version-branch'
=======
ver_mode = 'release-branch'
>>>>>>> v7.4.1

def version_branch_pipelines():
    return release_pipelines(ver_mode=ver_mode, trigger={
        'ref': ['refs/heads/v*',],
    })
