git是一个基于内容寻址的存储系统，其记录的是内容而不是文件。

###1、基本操作

	git status： 查看状态。

	git add：添加文件内容到暂存区（同时文件被跟踪）。
	
	git commit -m "XX"：根据暂存区内容创建一个提交记录。
	
	git commit -a -m "xx"：直接将工作区的内容提交到提交区。
	
	
	git log：显示提交记录。
	
	git log --onlien
	
	git log --color --graph --pretty==format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %c(bold blue)<%an>%Creset' --abbrev-commit
	
	
	git中的alias命令用来设置命令别名：
	git config alias.shortname <fullcommand>
	
	git config --global alias.lg "log --color --graph --pretty==format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %c(bold blue)<%an>%Creset' --abbrev-commit"
	
	这样 lg 就是上面长命令的别名。
	
	
	git diff：工作目录与暂存区的差异。
	
	git diff -cached [<reference>]：暂存区与某次提交的差异，第二个参数不传默认为HEAD。
	
	git diff <reference>：工作目录与某次提交的差异。
	
	git rm --cached: 仅从暂存区删除。   
	 
	git rm: 从暂存区与工作目录中删除。
	
	git rm $(git ls-files --deleted): 删除所有被跟踪，但是在工作目录中被删除的文件。
	
	撤销工作目录修改
	git checkout -- <file>：将文件内容从暂存区复制到工作目录，即撤销本地修改。
	
	撤销暂存区内容
	git reset HEAD <file>：将文件内容从上次提交复制到暂存区，即撤销暂存区内容，但这将导致暂存区与工作目录不一致，提示工作目录有修改。
	
	git checkout HEAD -- <file>：将内容从上次提交复制到工作目录。

###2、分支操作

	git branch <branchName>：增加一个分支。
	
	git branch -d <branchName>：删除一个分支。
	
	git branch -v：查看已有的分支。
	
	git checkout：通过移动HEAD检出版本，可用于分支切换。
	
	git checkout <branchName>：切换到<branchName>分支。
	
	git checkout -b <branchName>：新建分支并切换到该分支。
	
	git checkout <reference>：将指针移动到引用上，reference比如commit ID。
	
	git reset：将分支回退到历史某个版本。
	
	git reset --mixed <commit ID> (默认)：将HEAD与分支回退到<commit ID>，并将<commit ID>内容复制到暂存区，不会复制到工作目录。
	
	git reset --soft <commit ID>：将HEAD与分支回退到<commit ID>，并将<commit ID>内容复制到暂存区，并且复制到工作目录。
	
	git reset --hard <commit ID>
	
	git reflog：查看没有被引用的commit ID
	
	git stash save 'xx'：将工作目录和暂存区的内容暂存在stash区。
	
	git stash list：查看stash区内容。
	
	git stash apply <stash@{i}>：将内容恢复到工作目录。
	
	git stash drop <stash@{i}>：删除stash区中相应的内容。
	
	git stash pop <stash@{i}> = git stash apply <stash@{i}> + git stash drop <stash@{i}>

###3、分支合并 

	git merge
	
	git merge next master：master可以省略。
	
	解决merge冲突
	
	使用 git status 查看冲突文件。修改冲突文件，然后使用 add commit 既可。
	
	git rebase：修剪提交历史基线，俗称“变基”。
	
	git rebase master：将所有的提交在master分支上进行重演，使得提交历史变成线性的。
	
	git rebase --onto master <commit ID>：将 commit ID后面的提交在master分支上进行重演，而不是所有的提交。
	
	git tag v1.0 <commit Id> ：对某个提交设置一个不变的别名。

###4、远程分支

	git push: 提交本地历史到远程。
	
	git remote：远程仓库相关配置操作。
	
	git fetch：获取远程仓库的提交历史。
	
	git fetch origin master：将本地远程master分支与远程master分支同步。然后merge本地master分支与远程master分支，最后push到远程master分支，并将本地的提交历史复制到远程库（有两个提交线）。可以解决在提交代码到远程库时，有人先于你提交了。
	
	git pull可以将提交线合二为一。
	
	git pull 相当于git fetch + git merge。
	
	git clone：克隆一个远程仓库为本地仓库。

开始 clone，如果觉得仓库太大，可以在 git clone 中加入参数 --depth=1，只拉取最近的一个 revision

	git clone --depth=1 https://github.com/xxx/xxxx.git
如果后面想看历史版本，可以使用 `git fetch`

	git fetch --unshallow  更新获取完整历史版本
	
