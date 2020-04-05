# git rebase 与 git merge 取舍

&emsp;&emsp;在工作中，肯定会与git打交道。其中，最常用的命令有 `git add`、`git commit`、`git push`、`git pull`、`git merge`。也许你会说你没有用到过`git merge`，但是你肯定用过`git pull`，这个命令其实包含了`git merge`。`git pull`是`git fetch` + `git merge`的组合。
&emsp;&emsp;`git merge`是将两个或多个开发历史连接起来。其实，还有一个命令也可完成类型的工作，它就是`git rebase`。那么这两个命令有什么区别呢？我们来看一下`git rebase`在git文档上的定义：“git-rebase - Reapply commits on top of another base tip”。所以，它完成的任务是将当前分支的提交在另个基点上重新提交（<span style="color:red;">注意：reapply commit</span>）。
&emsp;&emsp;`git rebase A`会把你当前分支的commit放到A分支的最后面，即它会给你当前分支重新设置新的开始点，所以也叫变基。就好像从A分支又重新拉出来的这个分支一样。

## rebase 与 merge 区别
&emsp;&emsp;下面来举个🌰来说明这两个命令的区别。
<b>场景一：</b>master分支有两个提交，分别是commit1、commit2。此时，以commit2为基点拉一个新分支为develop分支。在develop分支进行两次提交，分别为commit3、commit4。（是不是有点😳，不用怕，上图）。

![场景：初始状态]()

&emsp;&emsp;此时，来了一个紧急需求，是对master分支进行修改。修改后进了两次提交，分别是commit5、commit6。

![场景：master分支提交了两次]()

&emsp;&emsp;要想在develop分支上体现master分支的commit5、commit6提交就可以是用`git merge`或者`git rebase`。（拒绝杠精说还有其他方法。此处就是比较这两个命令，所以拒绝其他命令）

### git merge

&emsp;&emsp;在develop分支上执行：`git merge master`，你将会得到如下的提交曲线。

![场景：git merge提交曲线]()

### git rebase

&emsp;&emsp;而在develop分支上执行：`git rebase master`，你将得到如下提交曲线。

![场景：git rebase提交曲线]()

通过上面两个提交曲线我们可以发现这两个的区别。
<b>merge：</b>会把master分支和你develop分支的commit合并在一起，形成一个新的commit提交。
<b>rebase：</b>会把develop分支的commit放到master分支最新提交后。其实，`git rebase`有点像 git cherry-pick一样，执行rebase后依次将当前的提交cherry-pick到目标分支上，然后将在原始分支上的已提取的commit删除。 
&emsp;&emsp;从图上我们可以看到，rebase后，develop分支上的提交被提到了commit6之后了。所以<b>rebase会打乱时间线</b>

## rebase 和 merge 区别（多人同时开发一个分支）

&emsp;&emsp;上面我们说的是一个人开发的时候，看着rebase在提交曲线上要比merge看起来简洁。万事就怕一个“但是”。可是偏偏在实际开发的时候就有但是。比如develop分支，同时有两个人在开发（同事A、同事B）。所以我们下面来说说这个“但是”的场景。

<b>场景二：</b>与场景一的初始场景一样。此处就不赘述了，直接上图。

![场景：初始状态]()

&emsp;&emsp;此时，同事A和同事B本地的提交记录相同，都是初始状态。而同事A依旧接到了紧急需求，对master分支进行修改。修改后进了两次提交，分别是commit5、commit6。

![场景：同事A在master分支提交了两次]()

&emsp;&emsp;同事A为了提交记录好看，于是在develop分支使用了`git rebase master`并将develop分支提交到了远程库。并对同事B说我提交了代码你拉一下。同事B此时并未对develop分支做任何修改。在执行`git pull origin develop`分支时莫名其妙的被<b>conflict</b>。也许你幸运但是可定会产生一个新的commit，为merge的结果。是的，会有一条merge。这是为什么呢，我们来看一下同事A提交后远程库的提交曲线变成了什么样。

![场景：同事A rebase后并使用 -f 强制推到远程库]()

而此时同事B的本地库的提交记录如下：

![场景：同事B的本地库提交记录]()

是不是看出来了区别，同事A在rebase后commit3和commit4不见了，并生成了commit7、commit8。是的，这就是git官方给rebase定义中说的<b>reapply commit</b>，但是需要注意的是。它只是<b>重新生成了commit ID，并没有修改提交时间。</b>
&emsp;&emsp;所以同事B在pull代码的时候，由于commit ID不同，所以会产生merge，也就有可能产生conflict。所以对于同事B拉完代码后本地库的提交记录就变成了下图。

![场景：同事B的pull完本地库提交记录]()

同事B将merge结果再push到远程库，远程库就又可以看见commit3、commit4与commit7、commit8提交的内容相同，时间相同，不同的是commit ID不同。并且同事A还得要拉取一次代码。

## 总结

- 1、rebase后提交曲线简洁，merge相对较乱。
- 2、merge结果能真实体现提交时间线，而rebase会打乱时间线。
- 3、merge后会新成一个新的commit提交，而rebase只是修改commit提交并不会形成新的。

### 建议

&emsp;&emsp;当如果能确定该分支只有你自己一个人使用时，可以使用rebase保持提交曲线的简洁。但是当该分支有别人也使用时，还是老老实实使用merge，这样利己利人。

### 注意

&emsp;&emsp;rebase是依次提取修改，并应用到最新的提交后面。所以可能会在执行时发生多次conflict。修改后执行`git add .`、`git rebase --continue`。
&emsp;&emsp;`git pull`相当于是`git fetch` + `git merge`。如果想把merge改成rebase可以使用`git pull --rebase`或者`git pull -r`。

如有错漏之处，敬请指正。

传送门：
https://git-scm.com/docs/git-merge
https://git-scm.com/docs/git-rebase
https://git-scm.com/docs/git-pull