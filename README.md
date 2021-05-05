## Motivation
It is a very common case to use an agreement for git branch naming. I'm pretty sure everyone has used it.
As well, it is quite common case to have a ticket id in the git branch name. For example, it could be something like:
`feature/PROJECT-123`. One more common case is the necessity to have a ticket id in the commit message. This job is often done by hands, but it could be automated.

This package adds ticket id to the start of a commit message. Let's imagine you develop in branch `feature/PROJECT-123`.
At some moment, you want to make a commit with the message `made cool things`. But you need to have results commit
messages like `PROJECT-123 made cool things`. It is what this package exactly does.

## Install

  ```bash
   $ yarn add commit-ticket -D
   ```
       
## Usage
       
1. Create `commit-ticket-config.js` file in the root of your project by
   ```bash
   $ yarn commit-ticket generate-config
   ```   
   Once command above called you'll see `commit-ticket-config.js` in the root of your project. If you looked into that file you will see that config should 
   export default one function that gives two parameters: git branch name and commit message. Function must return string and returned string will be used as commit message
    
2.  Adjust hook with [Husky](https://github.com/typicode/husky).
    It is required to use that hook at `commit-msg` stage because only there we have a path to entered commit message:
    ```yaml
      hooks:
        commit-msg: commit-ticket prepare-msg $HUSKY_GIT_PARAMS
    ```



