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
       
1. Create `commit-ticket-config.json` file in the root of your project
2. Config should contain only one parameter `branchPattern` which is a regexp.
    ```json
            {
              "branchPattern": "^feature/(\\w+-[0-9]{1,6})"
            }     
    ```
    
    Regexp MUST satisfy two conditions:
    * Whole regexp should match required part of branch name. For example, you could have branch `feature/PROJECT-123-cool-things`
    where `feature/PROJECT-123` is required part. Only `feature/PROJECT-123` should be matched by regexp.
    * Ticket id should be only parentheses group.
    
    You can test your regexp:
    
    ```javascript
       "feature/PROJECT-123-cool-things".match(new RegExp(branchPattern)) // should return
       //  ["feature/PROJECT-123", "PROJECT-123", index: 0, input: "feature/PROJECT-123-cool-things", groups: undefined]
    ```
         
    ```json
        {
          "branchPattern": "^feature/(\\w+-[0-9]{1,6})"
        }     
    ```
3.  Adjust hook, for instance with [Husky](https://github.com/typicode/husky). 
    It is required to use that hook at `commit-msg` stage because only there we have a path 
    to entered commit message:
    ```yaml
      hooks:
        commit-msg: commit-ticket $HUSKY_GIT_PARAMS
    ```



