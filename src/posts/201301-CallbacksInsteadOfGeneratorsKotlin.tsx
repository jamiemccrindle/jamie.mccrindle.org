import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1, KotlinCode } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>Callbacks in place of generators in Kotlin</PostTitleH1>
            <div>
                <p>
                    Generators are reasonably mainstream, appearing in Python, C# and Ruby and 
                    scheduled for the next version of Javascript (ES6). Generators provide an 
                    elegant way to return an iterator. For example, Fibonnacci could be written 
                    as follows using a generator in Python:
                </p>
                <KotlinCode>{`
def fib():
x = 0
y = 1
while True:
    yield x
    x, y = y, x + y
`.trim()}</KotlinCode>
                <p>
                    In languages without yield, I usually try create an iterator. This is especially 
                    true in Kotlin because as soon as you have an iterator, you can apply further 
                    functional methods to it e.g. map, fold, count, contains, any etc. The iterate 
                    method comes in handy here 
                    (<a href="http://jamie.mccrindle.org/2013/01/a-functional-iterate-for-kotlin.html">see my previous post on iterate</a>):
                </p>
                <KotlinCode>{`
var index = 0; var a = 0; var b = 1 
iterate<Int> { when (index++) { 0 -> a; 1 -> b; else -> { val result = a + b; a = b; b = result; result } } }
`.trim()}</KotlinCode>
                <p>
                    There are, however, times where writing an iterator without generators is torturous, for example 
                    rewriting the extension method File.recurse as an iterator would be painful. File.recurse recurses 
                    through all the directories starting at a file and calls back for each file that is found. In those 
                    cases I've found that using an 'iterating' callback is convenient. The 'iterating' part of the 
                    callback is that it returns whether processing should continue after each call. For example for 
                    Fibonnacci, it would be:
                    </p>
                <KotlinCode>{`
fun fib(callback : (Int) -> Boolean) {
    var x = 0;
    var y = 1;
    var shouldContinue = true
    while(shouldContinue) {
        shouldContinue = callback(x)
        val value = y + x
        x = y
        y = value
    }
}
`.trim()}</KotlinCode>
                <p>
                    This looks pretty similar to the Python example. Using this fib to add all the odd Fibonnacci 
                    numbers between 0 and 10000 would look as follows:
                    </p>
                <KotlinCode>{`
var value = 0;
fib{ if(it % 2 == 1) { value += it}; value < 100000 }
println(value)
`.trim()}</KotlinCode>
                <p>
                    For a more complex example, we could rewrite the File.recurse extension method to take an 
                    'iterating' callback so that the caller code could stop the recursion once some condition 
                    is met:
                </p>
                <KotlinCode>{`
/**
 * Recursively process this file and all children with the given block
 */
public fun File.recurse2(block: (File) -> Boolean): Boolean {
    if(!block(this)) {
        return false
    }
    if (this.isDirectory()) {
        val children = this.listFiles()
        if(children != null) {
            for (child in children) {
                if(!child.recurse2(block)) {
                    return false
                }
            }
        }
    }
    return true
}
`.trim()}</KotlinCode>
                <p>
                    Interestingly, the new java.nio.file classes use a similar mechanism to allow you to 'visit' 
                    a directory tree recursively, where the FileVisitor can return whether to continue processing
                    or not based on whether you return FileVisitResult.CONTINUE or FileVisitResult.TERMINATE. 
                    An example of implementing the same recurse2 method over the new NIO File API would look 
                    as follows:
                </p>
                <KotlinCode>{`
fun Path.recurse2(options: Array<LinkOption?> = array(), closure: (Path) -> Boolean) {
    var fileVisitor = object : SimpleFileVisitor<Path?>() {
        override  fun visitFile(file: Path?, attrs: BasicFileAttributes): FileVisitResult {
            if(closure(file!!)) {
                return FileVisitResult.CONTINUE
            } else {
                return FileVisitResult.TERMINATE
            }
        }
    }
    Files.walkFileTree(this, fileVisitor);
}
`.trim()}</KotlinCode>
                <p>
                    There is some hope that kotlin will get a yield keyword, as it is mentioned in 
                    the{' '}<a href="http://confluence.jetbrains.net/display/Kotlin/Comparison+to+Scala">
                    comparison to Scala</a> page on the Kotlin wiki but the Scala 'yield' 
                    sn't quite the same as a generator. In fact, Scala's delimited continuations 
                    would probably be closer but also a lot more powerful. 
                    {' '}<a href="http://devnet.jetbrains.net/thread/440239;jsessionid=7631192B85A76D05D7D96B98E413BCBA?decorator=print&displayFullThread=true">
                    This post on the forums</a> suggests that full blown continuations are unlikely. 
                    I do hope that in the future Kotlin gets a few of the more 'limited' versions 
                    of continuations, like generators or golang's coroutines, as they elegantly 
                    solve a particular set of problems.
                </p>
            </div>
        </PostArticle>
    </PostDiv>
))
