import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1, KotlinCode } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>A functional iterate for Kotlin</PostTitleH1>
            <div>
                <p>
                    The Kotlin iterate() method provides a really tidy way to create iterators, for example
                </p>
                <KotlinCode>{`
var i = 0;
var iterator = iterate { i++ }
`.trim()}</KotlinCode>
                <p>
                    creates an iterator over the set of positive integers*. The stdlib comes with an example of providing Fibonacci numbers using the iterate method:
                </p>
                <KotlinCode>{`
var index = 0; var a = 0; var b = 1 
iterate<Int> { 
    when (index++) { 
        0 -> a; 
        1 -> b; 
        else -> { val result = a + b; a = b; b = result; result } } 
}
`.trim()}</KotlinCode>
                <p>
                    There's much to like about the iterate method but I wanted to see if I could create a more functional iterate i.e. one that doesn't require that the state to be declared outside of the closure. The idea being that the new iterate method takes care of keeping track of the state and handing it into the closure. The result of trying this out was the following method:
                    </p>
                <KotlinCode>{`
/**
 * Returns an iterator. Runs the iterate2 method and then 
 * transforms the output with the converter.
 */
fun <T, R> iterate2(
    initial: T?, 
    closure: (T) -> T?, 
    converter: (T) -> R): Iterator<R> {
    return iterate2(initial, closure) map converter
}

/**
 * Returns an iterator. This method will keep calling closure with the current state and then
 * updating the current state with the result, starting with the initial state. If the closure
 * returns null, close the iterator.
 */
fun <T> iterate2(initial: T?, closure: (T) -> T?): Iterator<T> {
    var current = initial
    return iterate {
        if(current != null) {
            val result: T = current as T;
            current = closure(result);
            if(current != null) {
                result
            } else {
                null;
            }
        } else {
            null;
        }
    }
}
`.trim()}</KotlinCode>
                <p>
                    which can be used as follows:
                    </p>
                <KotlinCode>{`
// iterate from 0, adding 1 and returning the current number
var iterator = iterate2(0) { it + 1 }

// create a data class for the Fib state, this could be a labeled 
// tuple in future
data class Fib(
    val index: Int, 
    val lastMinus2: Int, 
    val lastMinus1: Int)

// iterate through the fibonnacci series
listOf(0, 1).iterator() 
    plus iterate2(
        Fib(2, 1, 2), 
        { Fib(it.index + 1, it.lastMinus1, it.lastMinus1 + it.lastMinus2) },
        { it.lastMinus2 }
    )
`.trim()}</KotlinCode>
                <p>
                    While the new definition of iterate works very well for Fibonacci, there are cases where a method is already stateful e.g. readLine() in which case the standard iterate function is perfect e.g.
                </p>
                <KotlinCode>{`
iterate { readLine() }
`.trim()}</KotlinCode>
                <p>
                    * Well, not quite, because when it hits Integer.MAX_VALUE, it will cycle back around, starting at Integer.MIN_VALUE.
                </p>
            </div>
        </PostArticle>
    </PostDiv>
))
