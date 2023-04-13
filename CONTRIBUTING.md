# Contributing

When contributing to this repository, please first discuss the change you wish to make via, [issue](https://github.com/padupe/action-content-change-validation/issues), email, or any other method with the owners of this
repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Usefull Commands

Some scripts that can enhance your collaboration in this project:

What? | Description
:--: | :--
`yarn install` |  Install Project dependencies at your environment.
`yarn check-lint` | Validates code formatting and styling.
`yarn package` | Performs the build and compilation of code from Typescript to Javascript.

## Branches Pattern

To carry out the development of a feature or even a fix, we recommend that the branches created follow the following pattern:

- English language;
- Type:
    -  **build**: Changes that affect the project's build system;
    - **ci**: Changes to CI configuration scripts;
    - **docs**: Updates or additions will only be made in the context of documentations;
    - **feat**: A new feature or functionality will be developed;
    - **fix**: A fix will be performed;
    - **perf**: Code changes that improve project performance;
    - **refactor**: Changes to the code that change its structure, but are not related to bug fixes or new features;
    - **style**: Changes that do not affect the project's programming logic, such as removing whitespace, etc;
    - **test**: Addition of new tests or missing tests.
- Issue id;
- Brief summary of what will be developed/fixed in the branch.

**Example**: docs/100_contributing

## Commit Pattern

We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), which in summary follow the same principles highlighted in the [previous section](#branches-pattern). The addition is that we must inform the context in which the commit was performed. Below, more details about the basic structure for commits:

- English language;
- Type (build, ci, docs, feat, fix, perf, refactor, style or test);
- Context;
    - Indicating the path of the added or updated file;
- Commit message.

**Example**: `"docs(README.md): project documentation update."`

## Pull Request Process

1. We created a Pull Request template to direct the filling in of information, fill it in correctly to speed up the process.

2. Update the CHANGELOG.md with details of changes to the project, this includes new environment variables, documentation change, new functionality and usefull information to identify any possible breaking change.

3. Increase the version numbers of the package the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).

4. Your Pull Request will be evaluated by the Project owner, pay attention to possible indications of corrections and/or adaptations in your code.
