# ARISTA website

## Notes and Resources

#### Members: Please do not hesistate to click on the links and read the documentation and guides for each of the technologies in use in this project. 

This website is developed in [SvelteKit](https://kit.svelte.dev/) with [Typescript](https://www.typescriptlang.org/).

[Pocketbase](https://pocketbase.io/) is used for the database, along with [Skeleton](https://skeleton.dev) as the UI library and [TailwindCSS](https://tailwindcss.com/) as the CSS preproccessor.

## Setup

Make sure you have [nodejs](https://nodejs.org/en) and [git](https://git-scm.org/download) installed. 

For new members, installing and using [VScode](https://code.visualstudio.com/download) with the "Svelte for VS Code" and "Tailwind CSS IntelliSense" extensions is highly reccomended.

### Forking the Project

#### Setting Up Your System

1. Install [Git](https://git-scm.com/) (and/or your favorite Git client.)
2. (Optional) [Set Up an SSH Key](https://help.github.com/articles/generating-an-ssh-key/) for GitHub.

#### Forking the Repo

1. Go to the top level arista-rewrite repository: <https://github.com/leomet07/arista-rewrite>
2. Click the "Fork" Button in the upper right hand corner of the interface ([More Details Here](https://help.github.com/articles/fork-a-repo/))
3. After the repository (repo) has been forked, you will be taken to your copy of the arista-rewrite repo at <https://github.com/YOUR_USERNAME/arista-rewrite>

#### Cloning Your Fork

1. Open a Terminal / Command Line / Bash Shell in your projects directory (_i.e.: `~/yourprojectdirectory/`_)
2. Clone your fork of arista-rewrite

```shell
$ git clone https://github.com/YOUR_USERNAME/arista-rewrite.git
```

This will download the entire arista-rewrite repo to your projects directory.

#### Set Up Your Upstream

1. Change directory to the new arista-rewrite directory (`cd arista-rewrite`)
2. Add a remote to the official arista-rewrite repo:

```shell
$ git remote add upstream https://github.com/leomet07/arista-rewrite.git
```

Congratulations, you now have a local copy of the arista-rewrite repo!

## Set Up your Repo

1. Once you have arista-rewrite cloned, before you start the application, you first need to install all of the dependencies:

```bash
npm install
```

2.  Set up the `.env`
   Create a `.env` file. Contact Lenny for the contents of this file.

3.  Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the (home) page by modifying `src/routes/+page.svelte`. Any page you edit will hot reload as you edit the file.

### Create a Branch

Before you start working, you will need to create a separate branch specific to the issue / feature you're working on. You will push your work to this branch.

#### Naming Your Branch

Name the branch something like `fix/xxx` or `feature/xxx` where `xxx` is a short description of the changes or feature 
you are attempting to add. For example `fix/email-login` would be a branch where you fix something specific to email login.

#### Adding Your Branch

To create a branch on your local machine (and switch to this branch):

```shell
$ git checkout -b [name_of_your_new_branch]
```

and to push to GitHub:

```shell
$ git push origin [name_of_your_new_branch]
```

**If you need more help with branching, take a look at [this](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches).**

### Make Changes

This bit is up to you! Remember, you already submitted a pasteup, so now make it come to fruition!

When you're ready to share your code, create a pull request.

### Creating a Pull Request (aka submitting your "D1")

A pull request (PR) is a method of submitting proposed changes to the arista-rewrite
repo (or any repo, for that matter). You will make changes to copies of the
files which make up arista-rewrite in a personal fork, then apply to have them
accepted by a arista-rewrite maintainer.

1.  Perform the maintenance step of rebasing `main`.
2.  Ensure you are on the `main` branch using `git status`:

```bash
$ git status
On branch main
Your branch is up-to-date with 'origin/main'.

nothing to commit, working directory clean
```

1.  If you are not on main or your working directory is not clean, resolve
    any outstanding files/commits and checkout main `git checkout main`

2.  Create a branch off of `main` with git: `git checkout -B
    branch/name-here` **Note:** Branch naming is important. Use a name like
    `fix/short-fix-description` or `feature/short-feature-description`.

3.  Edit your file(s) locally with the editor of your choice.

4.  Check your `git status` to see unstaged files.

5.  Add your edited files: `git add path/to/filename.ext` You can also do: `git
    add .` to add all unstaged files. Take care, though, because you can
    accidentally add files you don't want added. Review your `git status` first.

6.  Commit your edits. Refer to [Writing good commit messages](https://github.com/erlang/otp/wiki/writing-good-commit-messages).

7.  Push your commits to your GitHub Fork: `git push origin branch/name-here`

In your web browser go to your repository fork's GitHub Page.

1.  Once the edits have been committed, you will be prompted to create a pull
    request on that page.

2.  By default, all pull requests should be against the arista-rewrite main repo, `main`
    branch.

3.  Submit a pull request to arista-rewrite's `main` branch.

4.  The title (also called the subject) of your PR should be descriptive of your
    changes and succinctly indicates what is being fixed.

    -   Examples: `Add Test Cases to Bonfire Drop It` `Correct typo in Waypoint
        Size Your Images`

5.  In the body of your PR include a more detailed summary of the changes you
    made and why.

    -   If the PR is meant to fix an existing bug/issue then, at the end of
        your PR's description, append the keyword `closes` and #xxxx (where xxxx
        is the issue number). Example: `closes #1337`. This tells GitHub to
        close the existing issue, if the PR is merged.

### Next Steps

#### Maintaining Your Fork

Now that you have a copy of your fork, there is work you will need to do to keep it current.

#### Rebasing from Upstream

Do this prior to every time you create a branch for a pull request (PR):

1. Make sure you are on the `main` branch

```shell
$ git status
On branch main
Your branch is up-to-date with 'origin/main'.
```
If your aren't on `main`, resolve outstanding files / commits and checkout the `main` branch

```shell
$ git checkout main
```

2. Do a pull with rebase against `upstream`

```shell
$ git pull --rebase upstream main
```

This will pull down all of the changes to the official develop branch, without making an additional commit in your local repo.

3. Reinstall dependencies

Over the past few weeks, many breaking changes have occurred involving this site's javascript dependencies. Make sure to re-run npm install. 
```shell
$ npm install
```

#### If your PR is accepted

Once your PR is accepted, you may delete the branch you created to submit it.
This keeps your working fork clean.

You can do this with a press of a button on the GitHub PR interface. You can
delete the local copy of the branch with: `git branch -D branch/to-delete-name`
